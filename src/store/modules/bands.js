/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import firebase from "./../../firebase/firebaseInit";

const state = {
  bands: [],
  user: null,
  notification: "",
  band: {},
  notificationOfLoginOrPassword: ""
};

const getters = {
  allBands: state => state.bands,
  user: state => state.user,
  notification: state => state.notification,
  band: state => state.band,
  notificationOfLoginOrPassword: state => state.notificationOfLoginOrPassword
};

const actions = {
  registerUser({ commit }, credentials) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        const newUser = {
          id: data.user.uid
        };
        commit("setUser", newUser);
        commit("notificationOfLoginOrPassword", "Wellcome, You are in!")
      })
      .catch(error => {
        commit("notificationOfLoginOrPassword", error.message)
      });
  },

  signInUser({ commit }, credentials) {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        const newUser = {
          id: data.user.uid
        };
        commit("setUser", newUser);
        commit("notificationOfLoginOrPassword", "Wellcome, wellcome!");
      })
      .catch(error => {
        commit("notificationOfLoginOrPassword", error.message);
      });
  },

  signOutUser({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
  },

  addBand({ commit }, band) {
    let key;
    firebase
      .database()
      .ref("bands")
      .push(band)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const file = band.rawImage;
        const fileName = file.name;
        return firebase
          .storage()
          .ref("bands/" + key + ".jpg")
          .put(file);
      })
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadUrl => {
          firebase
            .database()
            .ref("bands")
            .child(key)
            .update({ imageUrl: downloadUrl })
            .then(() => {
              commit("newBand", { ...band, id: key, imageUrl: downloadUrl });
            });
        });
      });
  },

  fetchBands({ commit }) {
    // const response = await axios.get(
    //   "https://vue-blog236.firebaseio.com/bands.json"
    // );
    // const bands = [];
    // Object.keys(response.data).forEach(key => {
    //   let value = response.data[key];
    //   bands.push(value);
    // });
    // const bands = [];
    // db.collection("bands")
    //   .get()
    //   .then(response =>
    //     response.forEach(doc => {
    //       bands.push({ ...doc.data(), id: doc.id });
    //     })
    //   );
    const bands = [];
    firebase
      .database()
      .ref("bands")
      .once("value")
      .then(res =>
        res.forEach(doc => {
          bands.push({ ...doc.val(), id: doc.key });
        })
      );

    commit("setBands", bands);
  },

  deleteBand({ commit }, id) {
    firebase
      .database()
      .ref("bands/" + id)
      .remove()
      .then(function() {
        console.log("Document successfully deleted!");
        commit("notification", "Puff! ... Gone!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
        commit("notification", "Bad: " + error);
      });
    firebase
      .storage()
      .ref("bands/" + id + ".jpg")
      .delete()
      .then(function() {
        // console.log("Picture deleted");
      })
      .catch(function(error) {
        // console.error("Error removing document: ", error);
      });
  },
  getBandById({ commit }, id) {
    let band = {};
    firebase
      .database()
      .ref("bands")
      .child(id)
      .once("value")
      .then(res => {
        if (res.val()) {
          band = { ...res.val(), id: res.key };
          commit("setBand", band);
        } else
          commit(
            "notification",
            "Gods know we tried... but  didnt find this band"
          );
      });
  },

  editBand({ commit }, payload) {
    firebase
      .database()
      .ref("bands")
      .child(payload.id)
      .update(payload.editedBand)
      .then(error => {
        if (error) {
          commit("notification", "Sorry.. .failed ");
        } else {
          {
            commit("notification", "New description on the way to the db");
          }
          if (payload.imageFile != null) {
            firebase
              .storage()
              .ref("bands/" + payload.id + ".jpg")
              .put(payload.imageFile)
              .then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadUrl => {
                  if (payload.editedBand.imageUrl != downloadUrl)
                    firebase
                      .database()
                      .ref("bands")
                      .child(payload.id)
                      .update({ imageUrl: downloadUrl })
                      .then(() => {
                        commit(
                          "notification",
                          "New Picture and description on the way to db"
                        );
                      });
                });
              });
          }
        }
      });
  },
  clearNotification({ commit }) {
    commit("notification", "");
  },

  clearNotificationOfLoginOrPassword({ commit }, payload) {
    commit("notificationOfLoginOrPassword", payload);
  }
};

const mutations = {
  newBand: (state, band) => state.bands.shift(band),
  setBands: (state, bands) => (state.bands = bands),
  setUser: (state, newUser) => (state.user = newUser),
  setBand: (state, band) => (state.band = band),
  notification: (state, notification) => (state.notification = notification),
  notificationOfLoginOrPassword: (state, notification) =>
    (state.notificationOfLoginOrPassword = notification)
};

export default {
  state,
  getters,
  actions,
  mutations
};

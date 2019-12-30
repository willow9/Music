/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from "./../../firebase/firebaseInit";

const state = {
  bands: [],
  user: null,
  notification: "",
  band: {}
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
        commit("notification", "Wellcome, You are in!");
      })
      .catch(error => {
        commit("notification", error.message);
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
        commit("notification", "Wellcome, wellcome!");
      })
      .catch(error => {
        commit("notification", error.message);
      });
  },

  signOutUser({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      });
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
        commit("notification", "Puff! ... Gone!");
      })
      .catch(function(error) {
        commit("notification", "Bad: " + error.message);
      });
    firebase
      .storage()
      .ref("bands/" + id + ".jpg")
      .delete()
      .then(function() {})
      .catch(function(error) {});
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
            "Gods know we tried... but  did not find this band"
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
          commit("notification", "Sorry... failed ");
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
                        commit("notification", "...and new picture too");
                      });
                });
              });
          }
        }
      });
  },
  clearNotification({ commit }) {
    commit("notification", "");
  }
};

const mutations = {
  newBand: (state, band) => state.bands.shift(band),
  setBands: (state, bands) => (state.bands = bands),
  setUser: (state, newUser) => (state.user = newUser),
  setBand: (state, band) => (state.band = band),
  notification: (state, notification) => (state.notification = notification)
};

export default {
  state,
  getters,
  actions,
  mutations
};

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import firebase from "./../../firebase/firebaseInit";

const state = {
  bands: [],
  user: null,
  notification: ""
};

const getters = {
  allBands: state => state.bands,
  user: state => state.user,
  notification: state =>state.notification
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
        console.log(data.user.uid);
        commit("setUser", newUser);
      })
      .catch(error => {
        console.log(error);
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
        console.log(data.user.uid);
        commit("setUser", newUser);
      })
      .catch(error => {
        console.log(error.message);
      });
  },

  signOutUser({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user is signed out");
        commit("setUser", null);
      })
      .catch(error => {
        console.log(error.message);
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
        const extension = fileName.slice(fileName.lastIndexOf("."));
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
        // console.log("Document successfully deleted!");
        commit("notification", "Document successfully deleted!")
      })
      .catch(function(error) {
        // console.error("Error removing document: ", error);
        commit("notification", "Error removing document: "+ error)
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
  }
};

const mutations = {
  newBand: (state, band) => state.bands.shift(band),
  setBands: (state, bands) => (state.bands = bands),
  setUser: (state, newUser) => (state.user = newUser),
  notification: (state, notification) => (state.notification = notification)
};

export default {
  state,
  getters,
  actions,
  mutations
};

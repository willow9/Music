/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import firebase from "./../../firebase/firebaseInit";

const state = {
  bands: [],
  user: null
};

const getters = {
  allBands: state => state.bands,
  user: state => state.user
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
          .ref("bands/" + key + "." + extension)
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
  }
};

const mutations = {
  newBand: (state, band) => state.bands.shift(band),
  setBands: (state, bands) => (state.bands = bands),
  setUser: (state, newUser) => (state.user = newUser)
};

export default {
  state,
  getters,
  actions,
  mutations
};

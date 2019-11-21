/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import firebase from "./../../firebase/firebaseInit";

const state = {
  bands: []
};

const getters = {
  allBands: state => state.bands
};

const actions = {
  addBand({ commit }, band) {
    // const response = await axios.post(
    //   "https://vue-blog236.firebaseio.com/bands.json",
    //   band
    // );
    // db.collection("bands")
    //   .doc()
    //   .set(band)
    //   .then(commit("newBand", band))
    //   .catch(error => console.log(error));

    firebase
      .database()
      .ref("bands")
      .push(band)
      .then(commit("newBand", band))
      .catch(error => console.log(error));
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
  setBands: (state, bands) => (state.bands = bands)
};

export default {
  state,
  getters,
  actions,
  mutations
};

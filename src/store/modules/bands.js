/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";

const state = {
  bands: []
};

const getters = {
  allBands: state => state.bands
};

const actions = {
  async addBand({ commit }, band) {
    const response = await axios.post(
      "https://vue-blog236.firebaseio.com/bands.json",

      JSON.stringify(band)
    );

    commit("newBand", response.data);
  },

  async fetchBands({ commit }) {
    const response = await axios.get(
        "https://vue-blog236.firebaseio.com/bands.json"
    );
    console.log(response.data)

    commit("setBands", response.data);
  },
};

const mutations = {
  newBand: (state, band) => state.bands.unshift(band),
  setBands: (state, bands) => (state.bands = bands),
};

export default {
  state,
  getters,
  actions,
  mutations
};

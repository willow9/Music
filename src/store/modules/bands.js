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
      band
    );
    console.log(response.data);
    commit("newBand", response.data);
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
     const bands = [{
        name: "metalica",
        genre: 'rock', 
        description:' very good'
    },
    {
        name: "metalica",
        genre: 'rock', 
        description:' Lorem ipsum dolor sit amet, '
    },
    {
        name: "metalica",
        genre: 'rock', 
        description:' very good'
    },
    {
        name: "metalica",
        genre: 'rock', 
        description:' very good'
    },
    {
        name: "metalica",
        genre: 'rock', 
        description:' very good'
    },
]

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

// import HomeSliders from "../../data/homeSliders.json";
import axios from "axios";
const axiosData = [];

(async function () {
  await axios
    .get("data/homeSliders.json")
    .then((res) => {
      axiosData.push(...res.data.data);
    })
    .catch((err) => console.log("error in Fetching data.", err));
})();

const state = {
  data: axiosData,
};

// getters
const getters = {};

// mutations
const mutations = {};

// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

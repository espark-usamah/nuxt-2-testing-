// import Links from "../../data/footerLinks.json";
import axios from "axios";

const axiosData = [];

(async function () {
  await axios
    .get("data/footerLinks.json")
    .then((res) => {
      axiosData.push(...res.data.data);
    })
    .catch((err) => console.log("error in Fetching data.", err));
})();

assignValues();

async function assignValues() {
  let axiosData = await axios("data/footerLinks.json")
    .then((res) => res.data.data)
    .catch((err) => console.log("error in Fetching data.", err));
  state.data = axiosData;
}
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

// import Menu from "../../data/categoryMenu.json";
import axios from "axios";

const axiosData = [];

// (async function () {
//   await axios
//     .get("data/categoryMenu.json")
//     .then((res) => {
//       axiosData.push(...res.data.data);
//       // console.log(axiosData);
//     })
//     .catch((err) => console.log("error in Fetching data.", err));
// })();

const state = {
  data: "",
};

// getters
const getters = {};

// mutations
const mutations = {
  setdata(state, data) {
    state.data = "data";
  },
};

// actions
const actions = {
  // async nuxtServerInit({ commit }) {
  //   console.log("calling");
  //   await axios
  //     .get("data/categoryMenu.json")
  //     .then((res) => {
  //       // axiosData.push(...res.data.data);
  //       const { contactData } = res.data.data;
  //       commit("setdata", contactData);
  //       console.log(contactData);
  //     })
  //     .catch((err) => console.log("error in Fetching data.", err));
  // },
  // nuxtServerInit({ commit }) {
  //   return Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit("setdata", "contactData");
  //       resolve();
  //     }, 1000);
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

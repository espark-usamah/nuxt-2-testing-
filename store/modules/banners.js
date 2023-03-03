// import Banners from "../../data/banners.json";
import TabsBanners from "../../static/data/tabsBanners.json";
import axios from "axios";
const axiosData = [],
  axiosTabsBanner = [];

(function () {
  axiosTabsBanner.push(TabsBanners);
  // await axios
  //   .get("data/products.json")
  //   .then((res) => {
  //     axiosData.push(...res.data.data);
  //   })
  //   .catch((err) => console.log("error in Fetching data.", err));
  // state.lastAddedProduct = axiosData[0];
})();

const state = {
  data: axiosData,
  tabsBanners: axiosTabsBanner,
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

// import Products from "../../data/products.json";
import axios from "axios";
import * as layoutModule from "./layout";
const axiosData = [];
(async function () {
  await axios
    .get("data/products.json")
    .then((res) => {
      axiosData.push(...res.data.data);
    })
    .catch((err) => console.log("error in Fetching data.", err));
})();
const state = {
  originalProducts: axiosData,
  data: axiosData,
  axiosProducts: [],
  wishlist: [],
};

// getters
const getters = {
  wishlist(state) {
    state.wishlist = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    return state.wishlist;
  },
};

// mutations
const mutations = {
  setProductsData: (state, payload) => (state.axiosProducts = payload),
  addToWishlist: (state, payload) => {
    state.wishlist.push(payload);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
  },
  removeFromWishlist: (state, payload) => {
    state.wishlist.every((item, index) => {
      if (item.id === payload.id) {
        state.wishlist.splice(index, 1);
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
        return false;
      } else return true;
    });
  },
  currencyChanged(state) {
    let dataToSet = [];
    axiosData.forEach((item, index) => {
      dataToSet.push({
        ...axiosData[index],
      });
    });
    dataToSet.forEach((values) => {
      values.price = (
        values.price * layoutModule.default.state.currencyConversionMultiple
      ).toFixed(2);
    });

    state.data = dataToSet;
  },
};

// actions
const actions = {
  fetchProductsData({ commit }) {
    let data = async () => {
      return await axios("/data/products.json")
        .then((res) => res.data)
        .catch((err) => console.log("failed:", err));
    };
  },
  addToWishlist({ commit, state }, payload) {
    if (isPresentInWishlist(state.wishlist, payload)) return true;
    else {
      commit("addToWishlist", payload);
      return false;
    }
  },
  removeFromWishlist({ commit, state }, payload) {
    if (isPresentInWishlist(state.wishlist, payload)) {
      commit("removeFromWishlist", payload);
    } else {
      alert("Item not Present in wishlist");
    }
  },
  currencyChanged({ commit }) {
    commit("currencyChanged");
  },
};

function isPresentInWishlist(wishlist, productToAdd) {
  let flag = false;
  wishlist.every((item) => {
    if (item.id === productToAdd.id) {
      flag = true;
      return false;
    } else return true;
  });
  return flag;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

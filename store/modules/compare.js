// import Products from "../../data/products.json";
import axios from "axios";

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
  allProducts: axiosData,
  productsToCompare: [],
  currentType: "",
};

// getters
const getters = {
  compareItems(state) {
    return state.productsToCompare;
  },
};

// mutations
const mutations = {
  addToCompare(state, payload) {
    var productIndex = indexFound(state.productsToCompare, payload);
    if (productIndex !== false) {
      console.log("item already in Compare:");
    } else {
      var itemToAdd = {},
        itemFound = false;
      state.allProducts.every((item) => {
        if (item.id === payload) {
          itemToAdd = item;
          itemFound = true;
          return false;
        } else return true;
      });
      if (state.currentType === "" || state.currentType === itemToAdd.type)
        state.currentType = itemToAdd.type;
      else {
        state.productsToCompare = [];
        state.currentType = itemToAdd.type;
      }
      if (itemFound) state.productsToCompare.push(itemToAdd);
      else console.log("item not in JSON");

      if (state.productsToCompare.length === 1) {
        let similarProducts = state.allProducts.filter((item) => {
          if (item.type === itemToAdd.type) return true;
        });
        if (similarProducts[0].id === itemToAdd.id)
          state.productsToCompare.push(similarProducts[1]);
        else state.productsToCompare.push(similarProducts[0]);
      }
    }
  },
  removeAllFromCompare(state) {
    state.productsToCompare = [];
  },
  removeFromCompare(state, payload) {
    state.productsToCompare.splice(payload, 1);
  },
};
// actions
const actions = {
  addToCompare({ commit }, payload) {
    commit("addToCompare", payload);
  },
  removeAllFromCompare({ commit }) {
    commit("removeAllFromCompare");
  },
  removeFromCompare({ commit, state }, payload) {
    var index = indexFound(state.productsToCompare, payload.id);
    if (index !== false) commit("removeFromCompare", index);
    else alert("Item not Found in compare.");
  },
};

function indexFound(compareItems, itemToAdd) {
  let isPresent = false;
  compareItems.every((product, index) => {
    if (product.id === itemToAdd) {
      isPresent = index;
      return false;
    } else {
      return true;
    }
  });
  return isPresent;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

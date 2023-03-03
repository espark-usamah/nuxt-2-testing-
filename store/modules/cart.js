// import Cart from "../../data/cart.json";
// import Products from "../../data/products.json";
import * as eventsModules from "./clickEvents";
import * as layoutModule from "../modules/layout";
import axios from "axios";

const axiosData = [],
  axiosAllProucts = [];

(async function () {
  await axios
    .get("data/cart.json")
    .then((res) => {
      axiosData.push(...res.data.data);
    })
    .catch((err) => console.log("error in Fetching data.", err));
  await axios
    .get("data/products.json")
    .then((res) => {
      axiosAllProucts.push(...res.data.data);
    })
    .catch((err) => console.log("error in Fetching data.", err));
  state.cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
})();

const state = {
  allProducts: axiosAllProucts,
  data: axiosData,
  cartItems: [],
  order: [],
  lastAddedProduct: 0,
  userInfo: {},
  selectedSize: "none",
};
// getters
const getters = {
  cartTotal(state) {
    let total = 0;
    state.cartItems.forEach((item) => {
      let itemTotal =
        item.price *
        item.quantity *
        layoutModule.default.state.currencyConversionMultiple;
      total += itemTotal;
    });
    return Math.round(total, 2);
  },
  inCartProductIds(state) {
    let cartProductIds = [];
    state.cartItems.forEach((item) => {
      cartProductIds.push(item.id);
    });
    return cartProductIds;
  },
  cartItems(state) {
    let cartItemsToShow = JSON.parse(JSON.stringify(state.cartItems));
    cartItemsToShow.forEach((item) => {
      item.price = (
        item.price * layoutModule.default.state.currencyConversionMultiple
      ).toFixed(2);
    });
    return cartItemsToShow;
  },
  lastAddedProduct(state) {
    if (state.lastAddedProduct === 0) return state.allProducts[0];
    else return state.lastAddedProduct;
  },
  getOrder: (state) => {
    return state.order;
  },
};

// mutations
const mutations = {
  addToCart(state, payload) {
    var itemToAdd = {};
    var productIndex = indexFound(state.cartItems, payload);
    if (productIndex !== false) {
      state.cartItems[productIndex].quantity += payload.quantity;
      state.lastAddedProduct = state.cartItems[productIndex];
      eventsModules.default.actions.toggleCartModal;
    } else {
      var itemFound = false;
      state.allProducts.every((item) => {
        if (item.id === payload.product.id) {
          itemToAdd = payload.product;
          itemToAdd["quantity"] = payload.quantity;
          itemFound = true;
          return false;
        } else return true;
      });
      if (itemFound) {
        state.cartItems.push(itemToAdd);
        state.lastAddedProduct = itemToAdd;
        eventsModules.default.actions.toggleCartModal;
      } else alert("item not in JSON");
    }
  },
  changeQuantityTo(state, payload) {
    state.cartItems.every((item, index) => {
      if (item.id === payload.productId) {
        var objToReplace = JSON.parse(JSON.stringify(state.cartItems[index]));
        objToReplace.quantity = payload.quantity;
        state.cartItems.splice(index, 1, objToReplace);
        return false;
      } else return true;
    });
  },
  clearAllCartItems(state) {
    state.cartItems = [];
  },
  removeCartItem(state, payload) {
    state.cartItems.every((item, index) => {
      if (item.id === payload) {
        state.cartItems.splice(index, 1);
        return false;
      } else return true;
    });
  },
  createOrder: (state, payload) => {
    state.order.push(payload);
  },
  saveUserInfo: (state, payload) => {
    state.userInfo = payload;
  },
  setSelectedSize: (state, payload) => {
    state.selectedSize = payload.selectedSize;
  },
};

// actions
const actions = {
  addToCart({ commit }, payload) {
    commit("addToCart", payload);
  },
  changeQuantityTo({ commit }, payload) {
    commit("changeQuantityTo", payload);
  },
  clearAllCartItems({ commit }) {
    commit("clearAllCartItems");
  },
  removeCartItem({ commit }, payload) {
    commit("removeCartItem", payload);
  },
  saveUserInfo({ commit }, payload) {
    commit("saveUserInfo", payload);
  },
  createOrder: (context, payload) => {
    context.commit("createOrder", payload);
  },
  setSelectedSize: (context, payload) => {
    context.commit("setSelectedSize", payload);
  },
};

function indexFound(cartItems, itemToAdd) {
  let isPresent = false;
  cartItems.every((product, index) => {
    if (product.id === itemToAdd.product.id) {
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

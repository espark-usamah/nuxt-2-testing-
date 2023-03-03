import axios from "axios";
import Products from "../../static/data/products.json";
const axiosData = [];

(function () {
  axiosData.push(Products);
  // await axios
  //   .get("data/products.json")
  //   .then((res) => {
  //     axiosData.push(...res.data.data);
  //   })
  //   .catch((err) => console.log("error in Fetching data.", err));
  // state.lastAddedProduct = axiosData[0];
})();
const state = {
  allProducts: axiosData,
  categoryMobileMenu: false,
  cartModal: false,
  quickViewModal: false,
  overlay: false,
  productId: 1,
  copySettings: false,
  shopFilterBar: false,
  successfulModal: false,
  lastAddedProduct: {},
  successfulModalImage: "fashion/banner/2.jpg",
  successfulModalMessage: "Item Added ",
  successfulModalLink: "javascript:void(0)",
  dashboardLinks: false,
  showAddAddressModal: false,
  showPaymentModal: false,
  showDeleteAccountModal: false,
  showConfirmDeleteAccount: false,
  showSizeChart: false,
  showEditProfileModal: false,
  showVideoModal: false,
  showNewsLetterModal: false,
};

// getters
const getters = {
  productToShow(state) {
    let productToReturn = {};
    productToReturn = state.allProducts.filter((product) => {
      if (product.id === state.productId) return true;
    })[0];
    return productToReturn;
  },
  relatedProducts(state, getters) {
    let type = getters.productToShow.type;
    let productsToReturn = [];
    productsToReturn = state.allProducts.filter((product) => {
      if (product.type === type) return true;
    });
    if (productsToReturn.length === 0) return state.allProducts.slice(0, 6);
    return productsToReturn;
  },
};

// mutations
const mutations = {
  toggleCategoryMobileMenu(state) {
    state.categoryMobileMenu = !state.categoryMobileMenu;
    state.overlay = !state.overlay;
  },
  toggleCartModal(state) {
    state.cartModal = !state.cartModal;
    state.overlay = !state.overlay;
  },
  toggleQuickViewModal(state) {
    state.quickViewModal = !state.quickViewModal;
    state.overlay = !state.overlay;
  },
  closeOverlay(state) {
    state.overlay = false;
    state.categoryMobileMenu = false;
    state.cartModal = false;
    state.quickViewModal = false;
    state.shopFilterBar = false;
    state.copySettings = false;
    state.dashboardLinks = false;
    state.showAddAddressModal = false;
    state.showPaymentModal = false;
    state.showDeleteAccountModal = false;
    state.showConfirmDeleteAccount = false;
    state.showSizeChart = false;
    state.showEditProfileModal = false;
    state.showVideoModal = false;
    state.showNewsLetterModal = false;
  },
  changeProductId(state, payload) {
    if (payload != undefined || payload > 1) {
      state.allProducts.every((item) => {
        if (item.id === payload) {
          state.lastAddedProduct = item;
          return false;
        } else return true;
      });
      state.productId = payload;
    } else {
      state.lastAddedProduct = state.allProducts[0];
      state.productId = 1;
    }
  },
  toggleOverlay(state) {
    state.overlay = !state.overlay;
  },
  toggleShopFilterBar(state) {
    state.shopFilterBar = !state.shopFilterBar;
    state.overlay = !state.overlay;
  },
  toggleShopFilterBarNoOverlay(state) {
    state.shopFilterBar = !state.shopFilterBar;
  },
  toggleSuccessfulModal(state, payload) {
    //  payload = {
    //   image: image_src(without /_nuxt/assets/images/),
    //   message: "message_to_display",
    // link:'/link_to_page'
    // };
    if (payload != undefined) {
      state.successfulModalImage = payload.image;
      state.successfulModalMessage = payload.message;
      if (payload.link) {
        state.successfulModalLink = payload.link;
      } else {
        state.successfulModalLink = "#";
      }
    }
    state.successfulModal = !state.successfulModal;
  },
  toggleCopySettings(state) {
    if (state.copySettings) {
      state.copySettings = false;
      state.overlay = false;
    } else {
      state.overlay = true;
      state.copySettings = true;
    }
  },
  toggleDashboardLinks(state) {
    state.dashboardLinks = !state.dashboardLinks;
    state.overlay = !state.overlay;
  },
  toggleAddAddressModal() {
    state.showAddAddressModal = !state.showAddAddressModal;
    state.overlay = !state.overlay;
  },
  togglePaymentModal() {
    state.showPaymentModal = !state.showPaymentModal;
    state.overlay = !state.overlay;
  },
  toggleDeleteAccountModal() {
    state.showDeleteAccountModal = !state.showDeleteAccountModal;
    state.overlay = !state.overlay;
  },
  toggleConfirmDeleteAccount() {
    state.showConfirmDeleteAccount = !state.showConfirmDeleteAccount;
    state.overlay = !state.overlay;
  },
  toggleSizeChart() {
    state.showSizeChart = !state.showSizeChart;
    state.overlay = !state.overlay;
  },
  toggleEditProfileModal() {
    state.showEditProfileModal = !state.showEditProfileModal;
    state.overlay = !state.overlay;
  },
  toggleVideoModal() {
    state.showVideoModal = !state.showVideoModal;
    state.overlay = !state.overlay;
  },
  toggleNewsLetterModal() {
    setTimeout(() => {
      document.getElementById("newsletterToggleButton").click();
    }, 2000);
  },
};

// actions
const actions = {
  toggleCategoryMobileMenu({ commit }) {
    commit("toggleCategoryMobileMenu");
  },
  toggleCartModal({ commit }) {
    commit("toggleCartModal");
  },
  toggleOverlay({ commit }) {
    commit("toggleOverlay");
  },
  closeOverlay({ commit }) {
    commit("closeOverlay");
  },
  toggleQuickViewModal({ commit }) {
    commit("toggleQuickViewModal");
  },
  changeProductId({ commit }, payload) {
    commit("changeProductId", payload);
  },
  toggleShopFilterBar({ commit }) {
    commit("toggleShopFilterBar");
  },
  toggleShopFilterBarNoOverlay({ commit }) {
    commit("toggleShopFilterBarNoOverlay");
  },

  toggleSuccessfulModal({ commit }, payload) {
    commit("toggleSuccessfulModal", payload);
  },
  toggleCopySettings({ commit }) {
    commit("toggleCopySettings");
  },
  toggleDashboardLinks({ commit }) {
    commit("toggleDashboardLinks");
  },
  toggleAddAddressModal({ commit }) {
    commit("toggleAddAddressModal");
  },
  togglePaymentModal({ commit }) {
    commit("togglePaymentModal");
  },
  toggleDeleteAccountModal({ commit }) {
    commit("toggleDeleteAccountModal");
  },

  toggleConfirmDeleteAccount({ commit }) {
    commit("toggleConfirmDeleteAccount");
  },
  toggleSizeChart({ commit }) {
    commit("toggleSizeChart");
  },
  toggleEditProfileModal({ commit }) {
    commit("toggleEditProfileModal");
  },
  toggleVideoModal({ commit }) {
    commit("toggleVideoModal");
  },
  toggleNewsLetterModal({ commit }) {
    commit("toggleNewsLetterModal");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

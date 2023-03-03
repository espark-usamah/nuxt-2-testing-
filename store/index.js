import Vuex from 'vuex'
// import information from "../static/data/information.json";
// import Banner from "../static/data/banners.json";
// import Menu from "../static/data/menu.json";
// import Products from "../static/data/products.json";
// import TabsBanners from "../static/data/tabsBanners.json";
// import SliderData from "../static/data/homeSliders.json";
// import FootersData from "../static/data/footerLinks.json";
// import CategoryMenu from "../static/data/categoryMenu.json";
// import Cart from "../static/data/cart.json";

// import clickEvents from "./modules/clickEvents";
// import layout from "./modules/layout";
// import firebase from "./modules/firebase";
// import banners from "./modules/banners";
const createStore = () => {
  return new Vuex.Store({
    modules: {
      // clickEvents,
      // layout,
      // firebase,
      // banners,
    },
    state: {
      // drawer: false,
      // dropdown: true,
      // customerServices: [],
      // banners: [],
      // products: [],
      // tabsBanners: [],
      // slider: [],
      // footerlinks: [],
      // menu: [],
      // categoryMenu: [],
      // cartItems: [],
    },
    mutations: {
      // toggle(state) {
      //   state.drawer = !state.drawer
      // },
      // dropdown(state) {
      //   state.dropdown = !state.dropdown
      // },
      // setService(state, data) {
      //   state.customerServices = data
      // },
      // setBanner(state, data) {
      //   state.banners = data
      // },
      // setProducts(state, data) {
      //   state.products = data
      // },
      // setTabBanner(state, data) {
      //   state.tabsBanners = data
      // },
      // setSlide(state, data) {
      //   state.slider = data
      // },
      // setFooters(state, data) {
      //   state.footerlinks = data
      // },
      // setMenu(state, data) {
      //   state.menu = data
      // },
      // setCategoryMenu(state, data) {
      //   state.categoryMenu = data
      // },
      // setCart(state, data) {
      //   state.cartItems = data
      // },
    },
    actions: {
      // nuxtServerInit({ commit }) {
      //   // axiosData.push(...categoryM.data);
      //   // commit('setService', information)
      //   // commit('setBanner', Banner)
      //   // commit('setProducts', Products)
      //   // commit('setTabBanner', TabsBanners)
      //   // commit('setSlide', SliderData)
      //   // commit('setFooters', FootersData)
      //   // commit('setMenu', Menu)
      //   // commit('setCategoryMenu', CategoryMenu)
      //   // commit('setCart', Cart)
      // },
    },
    getters: {
      // getDrawerState(state) {
      //   return state.drawer
      // },
      // getDropdownState(state) {
      //   return state.dropdown
      // },
    },
  })
}

export default createStore

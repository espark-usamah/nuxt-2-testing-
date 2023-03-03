import themeSettings from "../../static/data/themeSettings.json";

import axios from "axios";
const axiosData = [];
let localPrimaryColor = "";
// (async function () {
//   await axios
//     .get("data/themeSettings.json")
//     .then((res) => {
//       axiosData.push(...res.data.data);
//     })
//     .catch((err) => console.log("error in Fetching data.", err));
//   if (process.client) {
//     localPrimaryColor = localStorage.getItem("primaryColor") || "#e22454";
//     state.selectedCurrency =
//       localStorage.getItem("selectedCurrency") || "dollar";

//     state.currencyConversionMultiple =
//       +localStorage.getItem("currencyConversionMultiple") || 1;

//     state.selectedCurrencySymbol =
//       localStorage.getItem("selectedCurrencySymbol") || "$";
//   }
// })();

const state = {
  currencyList: [
    {
      currency: "Dollar",
      currencySymbol: "$",
      currencyConversionMultiple: 1,
    },
    {
      currency: "Rupee",
      currencySymbol: "₹",
      currencyConversionMultiple: 78.6,
    },
    {
      currency: "Euro",
      currencySymbol: "€",
      currencyConversionMultiple: 0.98,
    },
  ],
  currencyConversionMultiple: 50,
  selectedCurrency: "Dollar",
  selectedCurrencySymbol: "$",
  layoutType: "ltr",
  themeConfig: axiosData,
  layoutMode: "demo2_dark.css",
  layoutFile: "demo2_dark.css",
  primaryColor: localPrimaryColor,
  selectedLanguage: "en",
};

// getters
const getters = {};

// mutations
const mutations = {
  setLayoutType: (state, payload) => {
    if (process.client) {
      if (payload === "rtl") {
        state.layoutType = "rtl";
        document
          .getElementById("bootstrap-link")
          .setAttribute("href", "/voxo/css/bootstrap.rtl.min.css");
        localStorage.setItem("layoutType", "rtl");
        document.documentElement.dir = "rtl";
        document.body.classList.remove("ltr");
        document.body.classList.add("rtl");
      } else {
        state.layoutType = "ltr";
        document
          .getElementById("bootstrap-link")
          .setAttribute("href", "/voxo/css/bootstrap.min.css");
        localStorage.setItem("layoutType", "ltr");
        document.documentElement.dir = "ltr";
        document.body.classList.remove("rtl");
        document.body.classList.add("ltr");
      }
    }
  },
  setLayoutMode: (state, payload) => {
    state.layoutMode = payload;
  },
  setCurrency(state, payload) {
    state.currencyList.every((currency) => {
      if (currency.currency === payload.currency) {
        state.selectedCurrency = currency.currency;
        state.selectedCurrencySymbol = currency.currencySymbol;
        state.currencyConversionMultiple = currency.currencyConversionMultiple;
        return false;
      } else return true;
    });
  },
  setPrimaryColor(state, payload) {
    state.primaryColor = payload.primaryColor;
    if (process.client) {
      localStorage.setItem("primaryColor", payload.primaryColor);
    }
  },
  setLanguage(state, payload) {
    state.selectedLanguage = payload.languageCode;
  },
};

// actions
const actions = {
  setLayoutType: ({ commit }, payload) => {
    commit("setLayoutType", payload);
  },
  setLayoutMode: ({ commit }, payload) => {
    // localStorage.setItem("layoutMode", payload);
    commit("setLayoutMode", payload);
  },
  setCurrency: ({ commit }, payload) => {
    commit("setCurrency", payload);
  },
  setPrimaryColor({ commit }, payload) {
    commit("setPrimaryColor", payload);
  },
  setLanguage({ commit }, payload) {
    commit("setLanguage", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

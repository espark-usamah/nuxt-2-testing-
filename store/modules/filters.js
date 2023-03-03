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
  showFilters: false,
  allCards: axiosData,
  cards: axiosData.filter((item) => item.type === "fashion"),
  filteredCards: [],
  maxPrice: 0,
  colorFilter: "",
  priceRange: [],
  selectedColorsList: "all",
  filtersList: [],
  category: "all",
  discount: 0,
  sortingCriteria: "byPopularity",
  selectedRatingStars: [],
  selectedSize: "",
};

// getters
const getters = {
  cardsToReturn(state) {
    var cardsToReturn = [];
    if (state.filtersList.length === 0) cardsToReturn = state.allCards;
    else cardsToReturn = state.filteredCards;

    cardsToReturn = cardsToReturn.filter((products) => {
      if (
        products.type === state.category &&
        products.discount >= state.discount
      )
        return true;
      if (
        (state.category === "all" || state.category === undefined) &&
        products.discount >= state.discount
      )
        return true;
    });

    if (state.priceRange.length != 0) {
      cardsToReturn = cardsToReturn.filter((product) => {
        if (
          product.price >= state.priceRange[0] &&
          product.price <= state.priceRange[1]
        )
          return true;
      });
    }
    if (state.selectedColorsList != "all") {
      var filterByColor = [];
      if (typeof state.selectedColorsList === "string") {
        cardsToReturn = filterByColor.filter((product) =>
          product.colors.includes(state.selectedColorsList)
        );
      } else {
        state.selectedColorsList.forEach((color) => {
          filterByColor.push(
            ...cardsToReturn.filter((product) => {
              if (product.colors.includes(color)) return true;
              else false;
            })
          );
        });
      }
      cardsToReturn = filterByColor;
    }
    if (state.selectedRatingStars.length > 0) {
      cardsToReturn = cardsToReturn.filter((card) =>
        state.selectedRatingStars.includes(card.ratingStars)
      );
    }
    if (state.selectedSize.length > 0) {
      cardsToReturn = cardsToReturn.filter((card) =>
        card.sizeoption.includes(state.selectedSize)
      );
    }

    cardsToReturn = [...new Set(cardsToReturn)];
    if (state.sortingCriteria != "default") {
      if (state.sortingCriteria === "byPrice")
        cardsToReturn.sort((a, b) => {
          return a.price - b.price;
        });
      else if (state.sortingCriteria === "byPriceHTL")
        cardsToReturn.sort((a, b) => {
          return b.price - a.price;
        });
      else if (state.sortingCriteria === "byName")
        cardsToReturn.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa < fb) return -1;
          if (fa > fb) return 1;
          return 0;
        });
      else if (state.sortingCriteria === "byRating")
        cardsToReturn.sort((a, b) => {
          return b.ratingStars - a.ratingStars;
        });
      else if (state.sortingCriteria === "byPopularity")
        cardsToReturn.sort((a, b) => {
          return b.totalPurchases - a.totalPurchases;
        });
    }
    return cardsToReturn;
  },

  maxPrice(state, getters) {
    var allUniquePrices = [];
    if (state.category === "all" || state.category === undefined) {
      allUniquePrices = [
        ...new Set(
          state.allCards.map((product) => (product.price ? product.price : 0))
        ),
      ];
    } else {
      allUniquePrices = [
        ...new Set(
          state.allCards
            .filter((product) =>
              product.type === state.category ? true : false
            )
            .map((item) => (item.price ? item.price : 0))
        ),
      ];
    }
    if (allUniquePrices.length === 0) allUniquePrices = [100];
    return Math.ceil(Math.max(...allUniquePrices) / 100) * 100;
  },
  unroundedMaxPrice(state, getters) {
    var allUniquePrices = [];
    if (state.category === "all" || state.category === undefined) {
      allUniquePrices = [
        state.allCards.map((product) => (product.price ? product.price : 0)),
      ];
    } else {
      allUniquePrices = [
        state.allCards
          .filter((product) => (product.type === state.category ? true : false))
          .map((item) => (item.price ? item.price : 0)),
      ];
    }
    if (allUniquePrices.length === 0) allUniquePrices = [100];
    return Math.max(...allUniquePrices);
  },
  brandFilters: (state) => {
    const brands = [
      ...new Set(
        state.allCards
          .filter((product) => {
            if (state.category === "all" || state.category === undefined)
              return true;
            else if (state.category === product.type) return true;
          })
          .map((item) => item.brand)
      ),
    ];
    brands.splice(brands.indexOf("none"), 1);
    return brands;
  },
  categories: (state) => {
    const categories = [
      ...new Set(state.allCards.map((product) => product.type)),
    ];
    return categories;
  },
  sortingCriterias: () => {
    var criterias = [
      { criteria: "default", displayName: "Default" },
      { criteria: "byPrice", displayName: "Sort By Price" },
      { criteria: "byName", displayName: "Sort By Name" },
      { criteria: "byPopularity", displayName: "Sort By Popularity" },
      { criteria: "byRating", displayName: "Sort By Rating" },
      { criteria: "byPriceHTL", displayName: "Sort By Price High To Low" },
    ];
    return criterias;
  },
};

// mutations
const mutations = {
  setFiltersList: (state, payload) => {
    state.filtersList = payload;
    state.filteredCards = setFilteredProducts(
      state.filtersList,
      state.allCards
    );
  },
  setCategory: (state, payload) => {
    state.category = payload;
  },
  toggleFilterBar: (state) => (state.showFilters = !state.showFilters),

  clearAllFilters(state) {
    state.filtersList = [];
  },
  setDiscountFilter(state, payload) {
    state.discount = payload;
  },
  priceRangeChange(state, payload) {
    state.priceRange = payload;
  },
  setColorsList(state, payload) {
    if (payload.length != 0) state.selectedColorsList = payload;
    else state.selectedColorsList = "all";
  },
  setsSortingCriteria(state, payload) {
    if (payload === undefined) state.sortingCriteria = "default";
    else state.sortingCriteria = payload;
  },
  setRatingStarsFilter(state, payload) {
    state.selectedRatingStars = payload.selectedRatingStars;
  },
  setSelectedSize(state, payload) {
    state.selectedSize = payload.selectedSize;
  },
};

// actions
const actions = {
  toggleFilterBar({ commit }) {
    commit("toggleFilterBar");
  },
  removeFilter({ commit, state }, payload) {
    var arrayToReturn = state.filtersList;
    arrayToReturn.splice(arrayToReturn.indexOf(payload), 1);
    commit("setFiltersList", arrayToReturn);
  },
  clearAllFilters({ commit }) {
    commit("clearAllFilters");
  },
  filterDiscount({ commit }, payload) {
    commit("setDiscountFilter", payload);
  },
  setFiltersList({ commit }, payload) {
    commit("setFiltersList", payload);
  },
  setCategory({ commit }, payload) {
    commit("setCategory", payload);
  },
  priceRangeChange({ commit }, payload) {
    commit("priceRangeChange", payload);
  },
  setColorsList({ commit }, payload) {
    commit("setColorsList", payload);
  },
  setsSortingCriteria({ commit }, payload) {
    commit("setsSortingCriteria", payload);
  },
  setRatingStarsFilter({ commit }, payload) {
    commit("setRatingStarsFilter", payload);
  },
  setSelectedSize({ commit }, payload) {
    commit("setSelectedSize", payload);
  },
};

function setFilteredProducts(filteredList, allCards) {
  var allFilteredProducts = [],
    productsToReturn = [];
  filteredList.forEach((filter) => {
    allCards.forEach((product) => {
      if (product.brand === filter || product.type === filter) {
        allFilteredProducts.push(product);
      }
    });
  });
  productsToReturn = [...new Set(allFilteredProducts)];
  return productsToReturn;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

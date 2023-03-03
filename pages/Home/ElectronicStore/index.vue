<template>
  <layout :offerCode="offerCode"> </layout>
</template>

<script>
import layout from '~/layouts/layout.vue'
export default {
  head() {
    return {
      title: 'Electronic Store',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '1.png' }],
    }
  },
  components: { layout },
  data() {
    return {
      offerCode: 'DEF4526',
      // themeCss: '/voxo/css/demo1.css',
    }
  },

  // created() {
  //   // if (process.client) {
  //   //   this.$store.dispatch("layout/setPrimaryColor", {
  //   //     primaryColor: "#0163d2",
  //   //   });
  //   //   let layoutMode = localStorage.getItem("colorMode");
  //   //   if (layoutMode === "dark") this.themeCss = "/voxo/css/demo1_dark.css";
  //   //   else this.themeCss = "/voxo/css/demo1.css";
  //   // }
  // },
  // mounted() {
  //   // if (process.client) {
  //   //   !localStorage.getItem("newsLetterSet") &&
  //   //     this.$store.dispatch("clickEvents/toggleNewsLetterModal");
  //   // }
  // },
}
</script>
<style lang="scss">
@import '~assets/scss/demo1.scss';
</style>

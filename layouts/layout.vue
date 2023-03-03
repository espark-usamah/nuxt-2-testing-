<template>
  <div>
    Layout form layout 1
    <!-- <header3 :offerCode="offerCode" />
      <slot></slot>
      <footer1>
          <slot name="footerRight"></slot>
        </footer1> -->
    <!-- <mobileMenu /> -->
  </div>
</template>

<script>
// import header3 from "~/layout/common/headers/header3.vue";
// import footer1 from "~/layout/common/footers/footer1.vue";
//   import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";

export default {
  props: ['offerCode'],
  //   components: { header3 ,footer1},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
}
</script>

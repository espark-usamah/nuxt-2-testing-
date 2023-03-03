<template>
  <div>
    <transition>
      <nuxt id="body-content" />
    </transition>
    <div
      class="tap-to-top"
      v-scroll-to="'#body-content'"
      :class="showTapToTop ? 'show' : ''"
    >
      <a href="#home">
        <i class="fas fa-chevron-up"></i>
      </a>
    </div>
    <!-- <ClientOnly>
     
    </ClientOnly> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTapToTop: false,
      showDarkButton: true,

      showTapToTopOnThisPage: true,
      windowScroll: 0,
      noTapToTopArray: [
        '/page/login',
        '/page/register',
        '/page/forgot_password',
        '/page/comming_soon',
      ],
    }
  },
  watch: {
    windowScroll: function () {
      console.log(this.windowScroll)
      if (this.windowScroll > 600) {
        console.log('600')
        this.showTapToTop = true
      } else {
        this.showTapToTop = false
      }
    },
  },
  mounted() {
    console.log(process.browser)
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
      this.noTapToTopArray.includes(this.$route.path)
        ? (this.showTapToTopOnThisPage = false)
        : (this.showTapToTopOnThisPage = true)
      window.addEventListener('beforeunload', this.beforeWindowUnload)
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      })
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 600) {
        console.log('600')
        this.showTapToTop = true
      } else {
        this.showTapToTop = false
      }
      // console.log(window.scrollY);
    },
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
}
</script>

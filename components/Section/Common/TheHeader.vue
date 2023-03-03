<template>
  <header>
    <TopBar :offerCode="offerCode" />
  </header>
</template>
<script>
import TopBar from '../Elements/HeaderElements/TopBar.vue'
export default {
  name: 'TheHeader',
  props: ['offerCode', 'stopScrollWork'],
  components: { TopBar },
  data() {
    return {
      isSearchbarOpen: false,
      headerDown: false,
      scrollTopDiff: 0,
      scrollUp: false,
      mobileView: false,
      scrollDown: false,
    }
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.getWindowWidth)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.getWindowWidth)
    }
  },
  methods: {
    toggleSearchbar() {
      this.isSearchbarOpen = !this.isSearchbarOpen
    },
    getWindowWidth() {
      if (process.client) {
        if (screen.availWidth < 1200) this.mobileView = true
        else this.mobileView = false
      }
    },
    handleScroll(event) {
      if (process.client) {
        if (!this.stopScrollWork) {
          if (window.scrollY > 0) {
            if (!this.headerDown) {
              this.headerDown = true
              this.scrollDown = false
              this.scrollUp = false
            }
            if (window.scrollY > this.scrollTopDiff) {
              this.scrollDown = true
              this.scrollUp = false
            } else {
              this.scrollUp = true
            }
            this.scrollTopDiff = window.scrollY
          } else if (window.scrollY === 0) {
            this.headerDown = false
            this.scrollDown = false
            this.scrollUp = false
          }
        }
      }
    },
  },
}
</script>
<style scoped></style>

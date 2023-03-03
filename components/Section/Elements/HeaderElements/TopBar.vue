<template>
  <div class="top-header" :class="topBarClasses">
    <div class="container-fluid-lg">
      <div class="row">
        <div class="col-auto d-xl-block d-none">
          <ul class="border-list">
            <li>Voxo ecommerc always free delivery</li>
            <li>New Customer Extra 50% OFF</li>
          </ul>
        </div>
        <div class="col-auto d-sm-block d-none" v-if="offerCode">
          <p class="font-dark-30 mb-0">
            Offer Coupon Code : <span class="fw-bold">{{ offerCode }}</span>
          </p>
        </div>
        <TopBarDropDowns />
      </div>
    </div>
  </div>
</template>

<script>
import TopBarDropDowns from './TopBarDropDowns.vue'
export default {
  props: ['topBarClasses', 'offerCode'],
  components: { TopBarDropDowns },
}
</script>

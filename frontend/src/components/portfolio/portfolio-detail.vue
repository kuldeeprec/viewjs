<template>
  <div>
    <p class="text-center my-3 text-gray-700 font-semibold">
      {{ portfolio.description }}
    </p>
    <stock-list :stocks="portfolio.stocks" class="mx-auto px-2 py-4" />
  </div>
</template>

<script>
import StockList from '../stock/stock-list.vue';


export default {
  name: "PortfolioDetailComponent",
  props: {
    portfolio: {
      type: Object,
      required: true,
      default: null
    }
  },
  components: {
    StockList,
  }
};
</script>

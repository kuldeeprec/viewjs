<template>
  <span>
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
        ADD STOCK
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <add-stock-form v-if="allPortfolio.length" @addStock="addStock" :portfolios="allPortfolio" />
      <p v-else class="my-3 text-center text-gray-700 font-semibold">
        You do not have a portfolio added, please create a portfolio.
      </p>
    </div>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as stockTypes from '../../store/modules/stock/stock-types';
import * as portfolioTypes from '../../store/modules/portfolio/portfolio-types';
import AddStockForm from '../../components/stock/stock-form.vue'

export default {
  name: 'CreatePortfolioPage',
  components: {
    AddStockForm,
  },
  data() {
    return {
      
    };
  },
  mounted() {
    this.getAllPortfolio();
  },
  computed: {
    ...mapGetters({
      allPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS
    }),
  },
  methods: {
    ...mapActions({
      addStock: stockTypes.ADD_STOCK_ACTION,
      getAllPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS_ACTION
    }),
  },
};
</script>

<template>
  <span>
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
      UPDATE STOCK
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <update-stock-form v-if="singleStock && allPortfolio" @updateStock="updateStock" action="update" :stockObj="singleStock" :portfolios="allPortfolio" />
    </div>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as stockTypes from '../../store/modules/stock/stock-types';
import * as portfolioTypes from '../../store/modules/portfolio/portfolio-types';
import UpdateStockForm from '../../components/stock/stock-form.vue'

export default {
  name: 'CreatePortfolioPage',
  components: {
    UpdateStockForm,
  },
  data() {
    return {
      
    };
  },
  mounted() {
    this.getSingleStockAction(this.$route.params.id);
    this.getAllPortfolio();
  },
  computed: {
    ...mapGetters({
      allPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS,
      singleStock: stockTypes.GET_SINGLE_STOCK,
    }),
  },
  methods: {
    ...mapActions({
      updateStock: stockTypes.UPDATE_STOCK_ACTION,
      getAllPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS_ACTION,
      getSingleStockAction: stockTypes.GET_SINGLE_STOCK_ACTION
    }),
  },
};
</script>

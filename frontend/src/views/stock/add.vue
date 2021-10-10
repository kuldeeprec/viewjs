<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
      ADD STOCK
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <div v-if="allPortfolio.length">
        <add-stock-form @addStock="addStock" :portfolios="allPortfolio" />
      </div>
      <p v-else class="my-3 text-center text-gray-700 font-semibold">
        You do not have a portfolio added, please create a portfolio.
      </p>
    </div>
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BreadCrumbComponent from "../../components/common/breadcrumbs.vue";
import * as stockTypes from "../../store/modules/stock/stock-types";
import * as portfolioTypes from "../../store/modules/portfolio/portfolio-types";
import AddStockForm from "../../components/stock/stock-form.vue";


export default {
  name: "CreatePortfolioPage",
  components: {
    AddStockForm,
    BreadCrumbComponent
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Stocks',
          to: { name: 'StockList' },
        },
        {
          title: 'Add Stock',
          to: { name: 'AddStock' },
        },
      ],
    };
  },
  mounted() {
    this.getAllPortfolio();
  },
  computed: {
    ...mapGetters({
      allPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS
    })
  },
  methods: {
    ...mapActions({
      addStock: stockTypes.ADD_STOCK_ACTION,
      getAllPortfolio: portfolioTypes.GET_ALL_PORTFOLIOS_ACTION
    })
  }
};
</script>

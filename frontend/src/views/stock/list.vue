<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <div class="flex justify-center items-center py-2 px-4">
      <p class="text-blue-700 text-2xl text-center font-semibold my-3">
        STOCKS
      </p>
      <t-button class="flex items-center font-medium m-1 p-2 rounded-md bg-primary text-light justify-center ml-4" @click.prevent="navigateToUrl">
        <icon-component name="plus" color="#F5F5F5" class="mr-2" /> Add Stock
      </t-button>
    </div>
    <stock-list :stocks="allStocks" class="mx-auto w-3/4 px-2 py-4" />
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbComponent from '../../components/common/breadcrumbs.vue';
import StockList from '../../components/stock/stock-list.vue';
import IconComponent from '../../components/common/svg-icons.vue';
import * as stockTypes from '../../store/modules/stock/stock-types';

export default {
  name: 'StockListPage',
  components: {
    StockList,
    IconComponent,
    BreadCrumbComponent,
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Stocks',
          to: { name: 'StockList' },
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      allStocks: stockTypes.GET_ALL_STOCKS,
    }),
  },
  mounted() {
    this.allStocksAction();
  },
  methods: {
    ...mapActions({
      allStocksAction: stockTypes.GET_ALL_STOCKS_ACTION,
    }),
    navigateToUrl() {
      this.$router.push({ name: 'AddStock' });
    },
  },
};
</script>

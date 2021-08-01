<template>
  <span>
    <p class="text-blue-700 text-2xl text-center font-semibold my-3">
      STOCK DETAIL
    </p>
    <t-button @click.prevent="openDeleteModal" class="mx-auto my-3">
      Delete Stock
    </t-button>
    <portfolio-detail v-if="singleStock" :portfolio="singleStock" class="mx-auto w-3/4 px-2 py-4" />
    <t-modal v-model="isDeleteModalOpened" header="Delete Stock">
      <confirm-modal :message="deleteMessage" @closeModal="closeDeleteModal" @onConfirmAction="deleteStock" />
    </t-modal>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StockDetail from '../../components/portfolio/portfolio-detail.vue';
import ConfirmModal from '../../components/modals/confirm-modal.vue';
import * as stockTypes from '../../store/modules/stock/stock-types';

export default {
  name: 'StockDetailPage',
  components: {
    StockDetail,
    ConfirmModal
  },
  data() {
    return {
      isDeleteModalOpened: false, 
    };
  },
  mounted() {
    this.getStockAction(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singleStock: stockTypes.GET_SINGLE_STOCK
    }),
    deleteMessage() {
      if (!this.singleStock) {
        return ''
      }
      return `Are you sure you want to delete stock named " ${this.singleStock.name} "?`;
    }
  },
  methods: {
    ...mapActions({
      getStockAction: stockTypes.GET_SINGLE_STOCK_ACTION,
      deleteStockAction: stockTypes.DELETE_STOCK_ACTION
    }),
    deleteStock() {
      this.deleteStockAction(this.$route.params.id);
    },
    openDeleteModal() {
      this.isDeleteModalOpened = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpened = false;
    },
  },
};
</script>

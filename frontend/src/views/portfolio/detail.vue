<template>
  <span>
    <div v-if="singlePortfolio" class="w-1/2 mx-auto flex justify-between">
      <p class="text-blue-700 text-2xl text-center font-semibold my-3">
        {{ singlePortfolio.name }}
      </p>
      <div class="flex justify-center items-center">
        <t-button @click.prevent="openDeleteModal" class="my-3 mx-1">
          Delete Portfolio
        </t-button>
        <t-button @click.prevent="gotToAddStock" class="my-3 mx-1">
          Add Stock
        </t-button>
      </div>
    </div>
    <portfolio-detail
      v-if="singlePortfolio"
      :portfolio="singlePortfolio"
      class="mx-auto w-3/4 px-2 py-4"
    />
    <t-modal v-model="isDeleteModalOpened" header="Delete Portfolio">
      <confirm-modal
        :message="deleteMessage"
        @closeModal="closeDeleteModal"
        @onConfirmAction="deletePortfolio"
      />
    </t-modal>
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PortfolioDetail from "../../components/portfolio/portfolio-detail.vue";
import ConfirmModal from "../../components/modals/confirm-modal.vue";
import * as portfolioTypes from "../../store/modules/portfolio/portfolio-types";

export default {
  name: "PortfolioDetailPage",
  components: {
    PortfolioDetail,
    ConfirmModal
  },
  data() {
    return {
      isDeleteModalOpened: false
    };
  },
  mounted() {
    this.getPortfolioAction(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singlePortfolio: portfolioTypes.GET_SINGLE_PORTFOLIO
    }),
    deleteMessage() {
      if (!this.singlePortfolio) {
        return "";
      }
      return `Are you sure you want to delete portfolio named ${this.singlePortfolio.name}?`;
    }
  },
  methods: {
    ...mapActions({
      getPortfolioAction: portfolioTypes.GET_SINGLE_PORTFOLIO_ACTION,
      deletePortfolioAction: portfolioTypes.DELETE_PORTFOLIO_ACTION
    }),
    deletePortfolio() {
      this.deletePortfolioAction(this.$route.params.id);
    },
    openDeleteModal() {
      this.isDeleteModalOpened = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpened = false;
    },
    gotToAddStock() {
      this.$router.push({ name: "AddStock", query: { portfolioId: this.singlePortfolio.name } });
    }
  }
};
</script>

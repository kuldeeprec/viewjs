<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <div
      v-if="singlePortfolio"
      class="w-1/2 mx-auto flex justify-between bg-green-100 p-2"
    >
      <p class="text-blue-700 text-2xl text-center font-semibold my-3">
        {{ singlePortfolio.name }}
      </p>
      <div class="flex justify-center items-center">
        <t-button class="my-3 mx-1" @click.prevent="openDeleteModal">
          Delete Portfolio
        </t-button>
        <t-button class="my-3 mx-1" @click.prevent="gotToAddStock">
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
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbComponent from '../../components/common/breadcrumbs.vue';
import PortfolioDetail from '../../components/portfolio/portfolio-detail.vue';
import ConfirmModal from '../../components/modals/confirm-modal.vue';
import * as portfolioTypes from '../../store/modules/portfolio/portfolio-types';

export default {
  name: 'PortfolioDetailPage',
  components: {
    PortfolioDetail,
    ConfirmModal,
    BreadCrumbComponent,
  },
  data() {
    return {
      isDeleteModalOpened: false,
      breadcrumbs: [
        {
          title: 'Portfolio',
          to: { name: 'Portfolio' },
        },
      ],
    };
  },
  mounted() {
    this.getPortfolioAction(this.$route.params.id);
  },
  beforeUpdate() {
    if (this.singlePortfolio) {
      this.breadcrumbs.push(
        {
          title: 'Details',
        },
        {
          title: this.singlePortfolio.name,
          to: {
            name: 'PortfolioDetail',
            params: { id: this.singlePortfolio._id },
          },
        },
      );
    }
  },
  computed: {
    ...mapGetters({
      singlePortfolio: portfolioTypes.GET_SINGLE_PORTFOLIO,
    }),
    deleteMessage() {
      if (!this.singlePortfolio) {
        return '';
      }
      return `Are you sure you want to delete portfolio named ${this.singlePortfolio.name}?`;
    },
  },
  methods: {
    ...mapActions({
      getPortfolioAction: portfolioTypes.GET_SINGLE_PORTFOLIO_ACTION,
      deletePortfolioAction: portfolioTypes.DELETE_PORTFOLIO_ACTION,
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
      this.$router.push({
        name: 'AddStock',
        query: { portfolioId: this.singlePortfolio.name },
      });
    },
  },
};
</script>

<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
      UPDATE PORTFOLIO
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <update-portfolio-form
        v-if="singlePortfolio"
        :portfolio-obj="singlePortfolio"
        action="update"
        @updatePortfolio="updatePortfolioAction"
      />
    </div>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbComponent from '../../components/common/breadcrumbs.vue';
import * as portfolioTypes from '../../store/modules/portfolio/portfolio-types';
import UpdatePortfolioForm from '../../components/portfolio/portfolio-form.vue';

export default {
  name: 'UpdatePortfolioPage',
  components: {
    UpdatePortfolioForm,
    BreadCrumbComponent,
  },
  data() {
    return {
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
          title: 'Update',
        },
        {
          title: this.singlePortfolio.name,
          to: {
            name: 'PortfolioUpdate',
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
  },
  methods: {
    ...mapActions({
      getPortfolioAction: portfolioTypes.GET_SINGLE_PORTFOLIO_ACTION,
      updatePortfolioAction: portfolioTypes.UPDATE_PORTFOLIO_ACTION,
    }),
  },
};
</script>

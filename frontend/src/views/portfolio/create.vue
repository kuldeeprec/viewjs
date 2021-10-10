<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <p class="text-center my-2 text-3xl font-semibold bg-green-100 p-2 text-blue-700">
      CREATE PORTFOLIO
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <create-portfolio-form @createPortfolio="createPortfolio" @cancel="navigateBack" />
    </div>
  </span>
</template>

<script>
import { mapActions } from "vuex";
import BreadCrumbComponent from "../../components/common/breadcrumbs.vue";
import * as portfolioTypes from "../../store/modules/portfolio/portfolio-types";
import CreatePortfolioForm from "../../components/portfolio/portfolio-form.vue";

export default {
  name: "CreatePortfolioPage",
  components: {
    CreatePortfolioForm,
    BreadCrumbComponent
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Portfolio',
          to: { name: 'Portfolio' },
        },
        {
          title: 'Add Portfolio',
          to: { name: 'CreatePortfolio' },
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      createPortfolio: portfolioTypes.CREATE_PORTFOLIO_ACTION
    }),
    navigateBack() {
      this.$router.go(-1);
    }
  }
};
</script>

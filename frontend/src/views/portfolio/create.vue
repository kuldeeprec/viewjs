<template>
  <span>
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
      CREATE PORTFOLIO
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <create-portfolio-form @createPortfolio="createPortfolio" @cancel="navigateBack" />
    </div>
  </span>
</template>

<script>
import { mapActions } from "vuex";
import * as portfolioTypes from "../../store/modules/portfolio/portfolio-types";
import CreatePortfolioForm from "../../components/portfolio/portfolio-form.vue";

export default {
  name: "CreatePortfolioPage",
  components: {
    CreatePortfolioForm
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

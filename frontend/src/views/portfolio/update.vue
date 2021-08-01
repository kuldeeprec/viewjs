<template>
  <span>
    <p class="text-center my-2 text-3xl font-semibold text-blue-700">
      UPDATE PORTFOLIO
    </p>
    <div class="mx-auto my-3 md:w-1/2">
      <update-portfolio-form v-if="singlePortfolio" @updatePortfolio="updatePortfolioAction" :portfolioObj="singlePortfolio" action="update" />
    </div>
  </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as portfolioTypes from '../../store/modules/portfolio/portfolio-types';
import UpdatePortfolioForm from '../../components/portfolio/portfolio-form.vue'

export default {
  name: 'CreatePortfolioPage',
  components: {
    UpdatePortfolioForm,
  },
  data() {
    return {
      
    };
  },
  mounted() {
    this.getPortfolioAction(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singlePortfolio: portfolioTypes.GET_SINGLE_PORTFOLIO
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

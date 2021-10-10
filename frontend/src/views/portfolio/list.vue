<template>
  <span>
    <bread-crumb-component :links="breadcrumbs" />
    <div class="flex justify-center items-center py-2 px-4 bg-green-100">
      <p class="text-blue-700 text-2xl text-center font-semibold my-3">
        PORTFOLIOS
      </p>
      <t-button
        class="flex items-center font-medium m-1 p-2 rounded-md bg-primary text-light justify-center ml-4"
        @click.prevent="navigateToUrl"
      >
        <icon-component name="plus" color="#F5F5F5" class="mr-2" /> Create Portfolio
      </t-button>
    </div>
    <portfolio-list :portfolios="allPortfolios" class="mx-auto w-3/4 px-2 py-4" />
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BreadCrumbComponent from "../../components/common/breadcrumbs.vue";
import PortfolioList from "../../components/portfolio/portfolio-list.vue";
import IconComponent from "../../components/common/svg-icons.vue";
import * as portfolioTypes from "../../store/modules/portfolio/portfolio-types";

export default {
  name: "PortfolioListPage",
  components: {
    PortfolioList,
    IconComponent,
    BreadCrumbComponent
  },
  metaInfo: {
    title: "Stock List",
    meta: [
     { name: 'description', content: "Description of all stocks which I have" }
    ]
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
    this.allPortfoliosAction();
  },
  computed: {
    ...mapGetters({
      allPortfolios: portfolioTypes.GET_ALL_PORTFOLIOS
    })
  },
  methods: {
    ...mapActions({
      allPortfoliosAction: portfolioTypes.GET_ALL_PORTFOLIOS_ACTION
    }),
    navigateToUrl() {
      this.$router.push({ name: "CreatePortfolio" });
    }
  }
};
</script>

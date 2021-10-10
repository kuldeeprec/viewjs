<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium container py-3 px-4 text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Stock Name" rules="required">
          <t-input-group label="Stock Name" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="stock.name" type="text" name="Name" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Description" rules="required">
          <t-input-group label="Stock Description" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-textarea v-model="stock.description" type="text" name="Description" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="flex justify-between mt-6">
        <t-button type="button" variant="error" @click="$emit('cancel')">
          Cancel
        </t-button>
        <t-button type="submit">
          Submit
        </t-button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'UpdateAccountSettings',
  props: {
    stockObj: {
      type: Object,
      required: false,
      default: null
    },
  },
  data() {
    return {
      stock: {
        relatedPortfolio: '',
        name: '',
        description: '',
        currentPrice: '',
        targetPrice: '',
        duration: '',
        actionPrice: '',
        stockAction: '',
        stockData: {}
      },
    };
  },
  mounted() {
    if (this.stockObj) {
      this.stock = this.stockObj;
    }
    if (this.$route.query.portfolioId) {
      const selectedPortfolio = this.portfolios.find((item) => item.name === this.$route.query.portfolioId);
      this.stock.relatedPortfolio = selectedPortfolio._id;
    }
  },
  methods: {
    submitForm() {
      if (this.action === 'update') {
        this.$emit('updateStock', {
          id: this.$route.params.id,
          data: this.stock,
        });
      } else {
        this.$emit('addStock', this.stock);
      }
    },
  },
};
</script>

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
      <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Current Price" rules="required">
          <t-input-group label="Current Price" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="stock.currentPrice" type="number" step="any" name="Current Price" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Target Price" rules="required">
          <t-input-group label="Target Price" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="stock.targetPrice" type="number" step="any" name="Target Price" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Stock Action">
          <t-input-group label="Select Stock Action" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-select v-model="stock.stockAction" placeholder="Select Stock Action" :options="stockActions" name="Select Stock Action" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Action Price">
          <t-input-group label="Stock Buy/Sell price ?" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="stock.actionPrice" type="number" step="any" name="Action Price" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Priority" rules="required">
          <t-input-group label="* Portfolio Selection" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-select v-model="stock.relatedPortfolio" placeholder="Select Portfolio" :options="portfolios" name="Select Portfolio" value-attribute="_id" text-attribute="name" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Duration" rules="required">
          <t-input-group label="How long you want to hold this stock ?" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="stock.duration" type="text" name="Duration" :variant="errors.length > 0?'danger':''" />
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
  name: 'AddStockForm',
  props: {
    stockObj: {
      type: Object,
      required: false,
      default: null,
    },
    action: {
      type: String,
      required: false,
      default: 'add',
    },
    portfolios: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      stockActions: ['Buy', 'Sell', 'Hold', 'Watch'],
      stock: {
        relatedPortfolio: '',
        name: '',
        description: '',
        currentPrice: '',
        targetPrice: '',
        duration: '',
        actionPrice: '',
        stockAction: '',
        stockData: {},
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

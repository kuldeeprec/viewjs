<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium container py-3 px-4 text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Portfolio Name" rules="required">
          <t-input-group label="Portfolio Name" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="portfolio.name" type="text" name="Name" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Description" rules="required">
          <t-input-group label="Portfolio Description" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-textarea v-model="portfolio.description" type="text" name="Description" :variant="errors.length > 0?'danger':''" />
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
  name: 'AddPortfolioForm',
  props: {
    portfolioObj: {
      type: Object,
      required: false,
      default: null
    },
    action: {
      type: String,
      required: false,
      default: 'create'
    }
  },
  data() {
    return {
      portfolio: {
        name: '',
        description: '',
      },
    };
  },
  mounted() {
    if (this.portfolioObj) {
      this.portfolio = this.portfolioObj;
    }
  },
  methods: {
    submitForm() {
      if (this.action === 'update') {
        this.$emit('updatePortfolio', {
          id: this.$route.params.id,
          data: this.portfolio,
        });
      } else {
        this.$emit('createPortfolio', this.portfolio);
      }
    },
  },
};
</script>

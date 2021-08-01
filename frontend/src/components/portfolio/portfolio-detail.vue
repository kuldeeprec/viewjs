<template>
  <div>
    <p>
        Portfolio Detail {{ portfolio }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PortfolioDetailComponent',
  props: {
    portfolio: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>

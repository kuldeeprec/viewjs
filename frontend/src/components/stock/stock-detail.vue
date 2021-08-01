<template>
  <div>
    <p>Stock Detail {{ stock }}</p>
  </div>
</template>

<script>
export default {
  name: "StockDetailComponent",
  props: {
    stock: {
      type: Object,
      required: true,
      default: null
    }
  }
};
</script>

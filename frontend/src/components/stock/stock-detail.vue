<template>
  <div v-if="stock" class="bg-white px-4 py-5 my-3 border-b border-gray-200 sm:px-6">
    <div class="-ml-4 my-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
      <div class="ml-4 mt-4">
        <h3 class="text-lg leading-6 font-medium text-blue-900">
          {{ stock.name }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ stock.description }}
        </p>
      </div>
      <div class="ml-4 mt-4 flex-shrink-0">
        <button
          @click.prevent="deleteStock"
          type="button"
          class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Delete Stock
        </button>
      </div>
    </div>
    <p class="text-center text-2xl text-gray-500 underline my-5">
      {{ stock.relatedPortfolio.name }}
    </p>
    <div class="flex bg-green-500 justify-between items-center shadow-md px-3 py-4 my-3">
      <div class="w-1/5">
        <p class="text-2xl text-center font-semibold text-gray-100">
          ACTION
        </p>
        <p class="text-xl text-center font-semibold text-gray-100">
          {{ stock.stockAction }}
        </p>
      </div>
      <div class="w-1/5">
        <p class="text-2xl text-center font-semibold text-gray-100">
          TARGET
        </p>
        <p class="text-xl text-center font-semibold text-gray-100">
          {{ stock.targetPrice }}
        </p>
      </div>
      <div class="w-1/5">
        <p class="text-2xl text-center font-semibold text-gray-100">
          CURRENT
        </p>
        <p class="text-xl text-center font-semibold text-gray-100">
          {{ stock.currentPrice }}
        </p>
      </div>
      <div class="w-1/5">
        <p class="text-2xl text-center font-semibold text-gray-100">
          ACTION PRICE
        </p>
        <p class="text-xl text-center font-semibold text-gray-100">
          {{ stock.actionPrice }}
        </p>
      </div>
      <div class="w-1/5">
        <p class="text-2xl text-center font-semibold text-gray-100">
          DURATION
        </p>
        <p class="text-xl text-center font-semibold text-gray-100">
          {{ stock.duration }}
        </p>
      </div>
    </div>
    <div class="flex justify-between my-3">
      <p class="text-blue-800">
        Created on {{ stock.createdAt | dateToHumanShort }}
      </p>
      <p class="text-blue-800">
        Updated on {{ stock.updatedAt | dateToHumanShort }}
      </p>
    </div>
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
  },
  methods: {
    deleteStock() {
      this.$emit("deleteStock");
    }
  }
};
</script>

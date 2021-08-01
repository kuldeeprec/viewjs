<template>
  <div class="container">
    <p class="text-center text-xl font-semibold my-2">
      {{ message }}
    </p>
    <div class="mt-5 sm:mt-6 flex justify-center">
      <t-button type="button" variant="error" class="m-2 w-40" @click="close">
        Cancel
      </t-button>
      <t-button type="button" class="m-2 w-40" @click="onConfirm">
        Confirm
      </t-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfirmModal',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('closeModal');
    },
    onConfirm() {
      this.$emit('onConfirmAction');
    },
  },
};
</script>

<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="font-medium container py-3 px-4 text-gray-700"
      @submit.prevent="handleSubmit(onConfirm)"
    >
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{ errors }" name="Comment Text" rules="required">
          <t-input-group
            label="Comment Text"
            :feedback="errors[0]"
            :variant="errors.length > 0 ? 'danger' : ''"
          >
            <t-input
              v-model="commentText"
              type="text"
              name="Comment Text"
              :variant="errors.length > 0 ? 'danger' : ''"
            />
          </t-input-group>
        </ValidationProvider>
      </div>
      <div class="flex justify-between mt-6">
        <t-button type="button" variant="error" @click="close">
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
  name: "UpdateCommentModal",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentText: ""
    };
  },
  mounted() {
    this.commentText = this.comment.text;
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    onConfirm() {
      const payload = {
        id: this.$route.params.id,
        commentId: this.comment._id,
        text: this.commentText
      };
      this.$emit("onConfirmAction", payload);
    }
  }
};
</script>

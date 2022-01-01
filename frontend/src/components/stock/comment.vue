<template>
  <div class="bg-white px-4 py-5 my-3 border-b border-gray-200 sm:px-6">
    <p class="text-center text-lg my-3 font-semibold">
      Comments
    </p>
    <t-textarea v-model="commentText" rows="5" columns="10" />
    <t-button class="mt-4" :disabled="commentText.length == 0" @click.prevent="addComment">
      Add Comment
    </t-button>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      commentText: '',
    };
  },
  methods: {
    addComment() {
      this.$emit('addComment', this.commentText);
    },
    deleteComment() {
      this.$emit('deleteComment');
    },
  },
};
</script>

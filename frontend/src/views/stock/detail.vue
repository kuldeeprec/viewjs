<template>
  <span>
    <p class="text-blue-700 text-2xl text-center font-semibold my-3">
      STOCK DETAIL
    </p>
    <div v-if="singleStock">
      <stock-detail
        v-if="singleStock"
        :stock="singleStock"
        @deleteStock="openDeleteModal"
        class="mx-auto w-3/4 px-2 py-4"
      />
      <comment-container class="mx-auto w-3/4 px-2 py-4" @addComment="addComment" />
      <div class="mx-auto w-3/4 py-4 my-3">
        <div v-for="comment in singleStock.comments" :key="comment._id" class="flex bg-gray-200 p-4 my-3 shadow-md justify-between items-center">
          <p>
            {{ comment.text }}
          </p>
          <div>
            <p class="font-semibold text-blue-500">
              {{ comment.writtenBy | getFullName }}
            </p>
            <p>
              {{ comment.date | dateToHumanShort }}
            </p>
            <div class="flex justify-center items-center my-2">
              <span class="cursor-pointer" @click.prevent="deleteComment(comment._id)">
                <icon-component name="trash" color="red" class="mr-2 " />
              </span>
              <span class="cursor-pointer" @click.prevent="openUpdateCommentModal(comment._id)">
                <icon-component name="pencil" color="red" class="mr-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <t-modal v-model="isDeleteModalOpened" header="Delete Stock">
      <confirm-modal
        :message="deleteMessage"
        @closeModal="closeDeleteModal"
        @onConfirmAction="deleteStock"
      />
    </t-modal>
    <t-modal v-model="isEditModalOpened" header="Update Comment">
      <update-comment-modal
        :comment="selectedComment"
        @closeModal="closeUpdateCommentModal"
        @onConfirmAction="updateComment"
      />
    </t-modal>
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StockDetail from "../../components/stock/stock-detail.vue";
import ConfirmModal from "../../components/modals/confirm-modal.vue";
import UpdateCommentModal from "../../components/modals/update-comment.vue";
import * as stockTypes from "../../store/modules/stock/stock-types";
import CommentContainer from "../../components/stock/comment.vue";
import IconComponent from '../../components/common/svg-icons.vue';

export default {
  name: "StockDetailPage",
  components: {
    StockDetail,
    ConfirmModal,
    CommentContainer,
    UpdateCommentModal,
    IconComponent
  },
  data() {
    return {
      isDeleteModalOpened: false,
      isEditModalOpened: false,
      selectedComment: {},
    };
  },
  mounted() {
    this.getStockAction(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singleStock: stockTypes.GET_SINGLE_STOCK
    }),
    deleteMessage() {
      if (!this.singleStock) {
        return "";
      }
      return `Are you sure you want to delete stock named " ${this.singleStock.name} "?`;
    }
  },
  methods: {
    ...mapActions({
      getStockAction: stockTypes.GET_SINGLE_STOCK_ACTION,
      deleteStockAction: stockTypes.DELETE_STOCK_ACTION,
      addCommentAction: stockTypes.ADD_COMMENT_ACTION,
      updateCommentAction: stockTypes.UPDATE_COMMENT_ACTION,
      deleteCommentAction: stockTypes.DELETE_COMMENT_ACTION
    }),
    deleteStock() {
      this.deleteStockAction(this.$route.params.id);
    },
    openDeleteModal() {
      this.isDeleteModalOpened = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpened = false;
    },
    addComment(commentData) {
      const payload = {
        id: this.$route.params.id,
        data: {
          text: commentData
        }
      }
      this.addCommentAction(payload);
    },
    deleteComment(payload) {
      this.deleteCommentAction(payload);
    },
    openUpdateCommentModal(commentId) {
      this.isEditModalOpened = true;
      this.selectedComment = this.singleStock.comments.find((item) => item._id === commentId);
    },
    closeUpdateCommentModal(commentId) {
      this.isEditModalOpened = false;
      this.selectedComment = null;
    },
    updateComment(payload) {
      this.updateCommentAction(payload);
      this.closeUpdateCommentModal();
    }
  }
};
</script>

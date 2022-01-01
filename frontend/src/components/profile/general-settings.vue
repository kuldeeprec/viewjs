<template>
  <form enctype="multipart/form-data" @submit.prevent="submitForm">
    <div class="space-y-2 flex justify-center">
      <input ref="fileinput" type="file" class="hidden" multiple @change="updateProfilePicture">
      <div class="mx-2">
        <p :class="errorText ? 'text-red-500': ''">
          Update Your Profile Picture
        </p>
        <p class="text-red-500">
          {{ errorText }}
        </p>
      </div>
      <t-button class="flex justify-right items-center" type="button" @click.prevent="$refs.fileinput.click()">
        <icon-component color="#fff" class="mx-2" name="upload" />
        Upload Profile Picture
      </t-button>
    </div>
    <div class="flex justify-between mt-4">
      <t-button type="submit">
        Update Profile Picture
      </t-button>
    </div>
  </form>
</template>

<script>
import IconComponent from '../common/svg-icons.vue';

export default {
  name: 'ChangeGeneralSettings',
  components: {
    IconComponent,
  },
  data() {
    return {
      profilePicture: null,
      errorText: '',
    };
  },
  methods: {
    updateProfilePicture() {
      this.profilePicture = { ...this.$refs.fileinput.files };
    },
    async submitForm() {
      if (!this.profilePicture) {
        this.errorText = 'No file chosen';
      } else {
        this.errorText = '';
        const formData = new FormData();
        formData.append('file', this.profilePicture[0]);
        this.$emit('updateSetting', formData);
      }
    },
  },
};
</script>

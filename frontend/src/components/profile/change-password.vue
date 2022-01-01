<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="font-medium container py-3 px-4 text-gray-700" @submit.prevent="handleSubmit(submitForm)">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-8 sm:my-4">
        <ValidationProvider v-slot="{errors}" name="Current Password" rules="required">
          <t-input-group label="Enter Your Current Password" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="password" type="password" name="Current Password" :variant="errors.length > 0?'danger':''" />
          </t-input-group>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" name="Confirm Password" rules="required">
          <t-input-group label="Enter Your Password Again" :feedback="errors[0]" :variant="errors.length > 0?'danger':''">
            <t-input v-model="confirm_password" type="password" name="Confirm Password" :variant="errors.length > 0?'danger':''" />
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
  name: 'ChangePasswordForm',
  data() {
    return {
      password: '',
      confirm_password: '',
    };
  },
  methods: {
    submitForm() {
      this.$emit('changePassword', {
        password: this.password,
      });
    },
  },
};
</script>

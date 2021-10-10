<template>
  <span>
    <div v-if="profileData" class="bg-white shadow-sm rounded-md">
      <div class="w-4/5 mx-auto px-4 py-2 bg-blue-100">
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            CHANGE SETTINGS
          </p>
          <change-profile-settings-form :profileData="profileData" @updateSetting="updateProfileData" />
        </div>
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            CHANGE PASSWORD
          </p>
          <change-password-form @changePassword="changePasswordAction" />
        </div>
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            PROFILE SETTINGS
          </p>
          <img :src="profileData.profilePicture" alt="" height="300" width="350" class="my-4 mx-auto rounded-md">
          <change-settings-form @updateSetting="updateSettings" />
        </div>
      </div>
    </div>
    <p v-else class="text-3xl text-center my-4 text-red-500">
      Loading...
    </p>
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as authTypes from "../../store/modules/auth/auth-types";
import ChangePasswordForm from "../../components/profile/change-password.vue";
import ChangeProfileSettingsForm from "../../components/profile/account-settings.vue";
import ChangeSettingsForm from "../../components/profile/general-settings.vue";

export default {
  name: "About",
  components: {
    ChangePasswordForm,
    ChangeProfileSettingsForm,
    ChangeSettingsForm
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA
    })
  },
  methods: {
    ...mapActions({
      changePasswordAction: authTypes.UPDATE_USER_PASSWORD,
      updateProfileDataAction: authTypes.UPDATE_PROFILE_SETTINGS,
      updateGeneralSettingsAction: authTypes.UPDATE_GENERAL_SETTINGS
    }),
    updateProfileData(payload) {
      this.updateProfileDataAction(payload)
    },
    updateSettings(payload) {
      this.updateGeneralSettingsAction(payload)
    }
  }
};
</script>

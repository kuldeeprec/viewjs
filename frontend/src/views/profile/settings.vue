<template>
  <span>
    <div v-if="profileData" class="bg-white shadow-sm rounded-md">
      <p class="text-2xl p-3 text-center text-blue-700">
        Profile Settings {{ profileData.firstName }}
      </p>
      <div class="w-4/5 mx-auto px-4 py-2 bg-blue-100">
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            CHANGE SETTINGS
          </p>
          <change-general-settings-form />
        </div>
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            CHANGE PASSWORD
          </p>
          <change-password-form />
        </div>
        <div>
          <p class="text-xl p-3 text-center text-blue-700">
            PROFILE SETTINGS
          </p>
          <profile-settings-form />
        </div>
      </div>
    </div>
    <p v-else class="text-3xl text-center my-4 text-red-500">
      Loading...
    </p>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import * as authTypes from "../../store/modules/auth/auth-types";
import ChangePasswordForm from "../../components/profile/change-password.vue";
import ChangeGeneralSettingsForm from "../../components/profile/general-settings.vue";
import ProfileSettingsForm from "../../components/profile/account-settings.vue";

export default {
  name: "About",
  components: {
    ChangePasswordForm,
    ChangeGeneralSettingsForm,
    ProfileSettingsForm
  },
  computed: {
    ...mapGetters({
      profileData: authTypes.GET_PROFILE_DATA
    })
  }
};
</script>

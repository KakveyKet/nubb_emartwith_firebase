<template>
  <div class="min-h-screen bg-primary-1 flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex flex-col items-center justify-center space-y-6 mb-8">
          <img
            src="../assets/nubb.png"
            alt="Logo"
            class="w-24 h-24 object-contain"
          />
          <h1 class="text-24px font-bold text-primary-8">
            {{ t("message.register") }}
          </h1>
        </div>

        <form @submit.prevent="handleSignUp" class="space-y-6">
          <div class="space-y-4">
            <div class="flex flex-col items-center space-y-4">
              <div class="relative group">
                <!-- <div
                  class="w-32 h-32 rounded-full overflow-hidden bg-primary-2 border-4 border-primary-4 flex items-center justify-center"
                >
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Profile Picture Preview"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 text-primary-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div> -->
              </div>
            </div>
            <input
              v-model="displayName"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              :placeholder="t('message.username')"
              required
            />
            <input
              v-model="phoneNumber"
              type="tel"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              :placeholder="t('message.phone')"
              @input="onPhoneNumberInput"
              required
            />
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              :placeholder="t('message.email')"
              required
            />
            <div class="relative">
              <input
                v-model="password"
                class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
                :placeholder="t('message.password')"
                :type="isViewPassword ? 'text' : 'password'"
                required
              />
              <span
                ><i
                  class="text-primary-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  :class="{
                    'text-primary-6 pi pi-eye size-5': isViewPassword,
                    'text-primary-5 pi pi-eye-slash size-5': !isViewPassword,
                  }"
                  @click="isViewPassword = !isViewPassword"
                ></i
              ></span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-primary-6 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 transition duration-300 ease-in-out"
            :disabled="isPending"
          >
            {{ isPending ? t("message.loading") : t("message.register") }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link
            to="/"
            class="text-16px text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
          >
            {{ t("message.already_have_account") }} {{ t("message.login") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import useSignUp from "@/composible/SignUp";
import { useRouter } from "vue-router";

import { formatPhoneNumber } from "@/helper/formatCurrecy";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const role = ref("customer");
    const phoneNumber = ref("");
    const address = ref("");
    const telegram_id = ref("");
    const router = useRouter();
    const { t, locale } = useI18n();
    const dynamicFont = computed(() => {
      switch (locale.value) {
        case "khm":
          return "font-NotoSerif";
        case "eng":
          return "font-Roboto";

        default:
          return "";
      }
    });
    const handleChangeLangue = (lang) => {
      locale.value = lang;
    };
    const toggleTranslate = (event) => {
      if (translate.value) {
        translate.value.toggle(event);
      }
    };
    // uplaod funtion

    const { error, isPending, signup } = useSignUp();

    const handleSignUp = async () => {
      if (
        !email.value ||
        !password.value ||
        !displayName.value ||
        !phoneNumber.value
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      try {
        // Call the signup composable function
        await signup(
          email.value,
          password.value,
          displayName.value,
          role.value,
          phoneNumber.value
        );

        // Navigate to the login page after successful signup
        router.push({ path: "/" });
      } catch (err) {
        console.error("Sign up error:", err);
        alert("An error occurred during registration. Please try again.");
      }
    };
    const onPhoneNumberInput = (event) => {
      phoneNumber.value = formatPhoneNumber(event.target.value);
    };
    const isViewPassword = ref(false);

    return {
      email,
      password,
      displayName,
      phoneNumber,
      error,
      isPending,
      handleSignUp,
      onPhoneNumberInput,
      isViewPassword,
      role,
      address,
      telegram_id,
      dynamicFont,
      handleChangeLangue,
      toggleTranslate,
      t,
    };
  },
};
</script>

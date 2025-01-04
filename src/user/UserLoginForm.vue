<template>
  <div class="w-full">
    <div class="p-8">
      <div class="flex flex-col items-center justify-center space-y-6 mb-8">
        <img
          src="../assets/nubb.png"
          alt="Logo"
          class="w-24 h-24 object-contain"
        />
        <h1
          class="xl:text-24px lg:text-20px md:text-16px text-16px font-bold text-primary-8"
        >
          {{ t("message.welcome_back_login") }}
        </h1>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
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
          {{ isPending ? t("message.loading") : t("message.login") }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/userregister"
          class="text-16px text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
        >
          {{ t("message.dont_have_account") }} {{ t("message.register") }}
        </router-link>
      </div>
      <div class="flex items-center justify-center">
        <router-link
          to="/forgotpassword"
          class="xl:text-16px lg:text-13px text-13px underline text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
        >
          {{ t("message.forgot_password") }}
        </router-link>
      </div>
    </div>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import useSignIn from "@/composible/SignIn";
import { useRouter } from "vue-router";
import { Notivue, Notification, push } from "notivue";
import { useI18n } from "vue-i18n";

export default {
  emits: ["close"],
  components: {
    Notivue,
    Notification,
  },
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, isPending, signin } = useSignIn();
    const isViewPassword = ref(false);
    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        return;
      }
      try {
        const success = await signin(email.value, password.value);
        if (success) {
          console.log("Login successful");
          push.success(t("message.welcome_back"));
          emit("close");
          emit("close_drawer");
          router.push({ path: "/" });
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login. Please try again.");
      }
    };
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
    return {
      email,
      password,
      error,
      isPending,
      handleSubmit,
      isViewPassword,
      dynamicFont,
      handleChangeLangue,
      toggleTranslate,
      t,
    };
  },
};
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="p-8 max-w-xl bg-white rounded-lg shadow-md">
      <div class="flex flex-col items-center justify-center space-y-6 mb-8">
        <img
          src="../assets/nubb.png"
          alt="Logo"
          class="w-24 h-24 object-contain"
        />
        <h1
          class="xl:text-24px lg:text-20px md:text-16px text-16px font-bold text-primary-8"
        >
          Reset Your Password
        </h1>
      </div>

      <form @submit.prevent="handleReset" class="space-y-6">
        <div class="space-y-4">
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
            placeholder="Enter your email"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary-6 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 transition duration-300 ease-in-out"
          :disabled="isPending"
        >
          {{ isPending ? "Sending..." : "Send Reset Link" }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/login"
          class="text-16px text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
        >
          Back to Login
        </router-link>
      </div>

      <Notivue v-slot="item">
        <Notification :item="item" />
      </Notivue>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Notivue, Notification, push } from "notivue";
import useResetPassword from "@/composible/forggetPassowrd";
export default {
  components: {
    Notivue,
    Notification,
  },
  setup() {
    const email = ref("");
    const { error, isPending, resetPassword } = useResetPassword();

    const handleReset = async () => {
      if (!email.value) {
        alert("Please enter your email.");
        return;
      }

      try {
        const response = await resetPassword(email.value);
        if (response.success) {
          push.success(response.message); // Show success notification
          email.value = ""; // Clear the email input
        } else {
          push.error(response.message); // Show error notification
        }
      } catch (err) {
        console.error("Reset password error:", err);
        push.error("An unexpected error occurred. Please try again.");
      }
    };

    return {
      email,
      error,
      isPending,
      handleReset,
    };
  },
};
</script>

<template>
  <div class="w-full">
    <div class="p-8">
      <div class="flex flex-col items-center justify-center space-y-6 mb-8">
        <img
          src="../assets/nubb.png"
          alt="Logo"
          class="w-24 h-24 object-contain"
        />
        <h1 class="text-24px font-bold text-primary-8">User Login</h1>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
            placeholder="Email"
            required
          />
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary-6 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 transition duration-300 ease-in-out"
          :disabled="isPending"
        >
          {{ isPending ? "Logging in..." : "Login" }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/userregister"
          class="text-16px text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
        >
          Don't have an account? Sign up
        </router-link>
      </div>
      <div class="flex items-center justify-center">
        <router-link
          to="/forgot-password"
          class="xl:text-16px lg:text-13px text-13px underline text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
        >
          Forgot password?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignIn from "@/composible/SignIn";
import { useRouter } from "vue-router";
export default {
  emits: ["close"],
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, isPending, signin } = useSignIn();

    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        alert("Please fill in all fields.");
        return;
      }
      try {
        const success = await signin(email.value, password.value);
        if (success) {
          console.log("Login successful");
          emit("close");
          router.push({ path: "/" });
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login. Please try again.");
      }
    };

    return {
      email,
      password,
      error,
      isPending,
      handleSubmit,
    };
  },
};
</script>

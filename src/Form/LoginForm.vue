<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form @submit.prevent="handleSubmit">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <InputText
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Password Input -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <InputText
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <div class="mb-4">
          <Button
            severity="success"
            type="submit"
            :disabled="isPending"
            class="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition duration-150"
          >
            {{ isPending ? "Logging in..." : "Login" }}
          </Button>
        </div>
        <div class="flex justify-center">
          <Button severity="info" text @click="router.push('/userform')">
            <span class="underline">Signup</span>
          </Button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm text-center mt-2">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignIn from "@/composible/SignIn";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, isPending, signin } = useSignIn();

    const handleSubmit = async () => {
      await signin(email.value, password.value);
      router.push({ path: "/dashboard" });
    };

    return {
      email,
      password,
      error,
      isPending,
      handleSubmit,
      router,
    };
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>

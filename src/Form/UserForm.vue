<template>
  <div class="w-full h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="handleSignUp"
      class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-5"
    >
      <!-- Form Title -->
      <h1 class="text-2xl font-bold text-center text-gray-800">Sign Up</h1>

      <!-- Email Input -->
      <InputText
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Password Input -->
      <InputText
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Display Name Input -->
      <InputText
        v-model="displayName"
        type="text"
        placeholder="Username"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Phone Number Input -->
      <InputText
        v-model="phoneNumber"
        type="text"
        placeholder="Phone Number"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Role Selection -->
      <Select
        v-model="role"
        placeholder="Please Select Role"
        :options="roles"
        option-label="label"
        option-value="value"
        required
        class="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isPending"
        class="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition duration-150"
      >
        {{ isPending ? "Signing Up..." : "Sign Up" }}
      </button>

      <!-- Error Message -->
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignUp from "@/composible/SignUp";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const phoneNumber = ref("");
    const role = ref("manager");
    const roles = ref([
      { label: "Manager", value: "manager" },
      { label: "Staff", value: "staff" },
    ]);
    const router = useRouter();
    const { error, isPending, signup } = useSignUp();

    const handleSignUp = async () => {
      await signup(
        email.value,
        password.value,
        displayName.value,
        role.value,
        phoneNumber.value
      );
      router.push({ path: "/admindashboard" });
    };

    return {
      email,
      password,
      displayName,
      role,
      roles,
      phoneNumber,
      error,
      isPending,
      handleSignUp,
    };
  },
};
</script>

<style scoped>
/* Additional styles can be added if necessary */
</style>

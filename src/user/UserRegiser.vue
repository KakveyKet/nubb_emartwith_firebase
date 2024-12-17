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
          <h1 class="text-24px font-bold text-primary-8">User Registration</h1>
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
                <div
                  class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                >
                  <label
                    for="profile-picture"
                    class="text-white cursor-pointer text-sm font-medium"
                  >
                    Change Picture
                  </label>
                </div>
              </div>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              />
            </div>
            <input
              v-model="displayName"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              placeholder="Username"
              required
            />
            <input
              v-model="phoneNumber"
              type="tel"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              placeholder="Phone Number"
              @input="onPhoneNumberInput"
              required
            />
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
              placeholder="Email"
              required
            />
            <div class="relative">
              <input
                v-model="password"
                class="w-full px-4 py-3 rounded-lg bg-primary-2 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-6 text-primary-10 placeholder-primary-5"
                placeholder="Password"
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
            {{ isPending ? "Registering..." : "Register" }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link
            to="/"
            class="text-16px text-primary-6 hover:text-primary-7 font-medium transition duration-300 ease-in-out"
          >
            Already have an account? Log in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignUp from "@/composible/SignUp";
import { useRouter } from "vue-router";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { projectStorage } from "@/config/config";
import { formatPhoneNumber } from "@/helper/formatCurrecy";
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
    };
  },
};
</script>

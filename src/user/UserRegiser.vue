<template>
  <form @submit.prevent="handleSignUp" class="space-y-4">
    <div
      class="w-full mx-auto flex flex-col items-center justify-center space-y-12 mt-3"
    >
      <div class="xl:w-[100px] lg:w-[100px] md:w-[100px] w-[80px] h-[100px]">
        <img src="../assets/nubb.png" alt="" />
      </div>
      <h1 class="xl:text-24px lg:text-24px md:text-24px text-18px text-center">
        User Login
      </h1>
    </div>
    <div
      class="w-[500px] mx-auto flex flex-col items-center justify-center space-y-4"
    >
      <input
        v-model="displayName"
        type="text"
        class="!w-3/4 loginInput"
        placeholder="Username"
      />
      <input
        v-model="phoneNumber"
        type="text"
        class="!w-3/4 loginInput"
        placeholder="Phone Number"
      />
      <input
        v-model="email"
        type="email"
        class="!w-3/4 loginInput"
        placeholder="Email"
      />
      <input
        v-model="password"
        type="password"
        class="!w-3/4 loginInput"
        placeholder="Password"
      />
      <div class="flex justify-center">
        <button class="btncheckout !w-[385px]">Register</button>
      </div>
    </div>

    <div class="flex justify-center">
      <router-link
        class="xl:text-17px lg:text-16px md:text-16pxpx text-13px border-b border-primary-6 text-primary-6 cursor-pointer active:text-primary-6/80 hover:text-primary-6/80 duration-300"
        to="/"
        >Already have an account?</router-link
      >
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import useSignUp from "@/composible/SignUp";
import { useRouter } from "vue-router";
import { getTelegramUserId } from "@/composible/useDMTelegram";
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
    const { error, isPending, signup } = useSignUp();
    const handleSignUp = async () => {
      if (!email.value || !password.value || !displayName.value) {
        alert("Please fill in all fields.");
        return;
      }
      await signup(
        email.value,
        password.value,
        displayName.value,
        role.value,
        phoneNumber.value,
        address.value,
        telegram_id.value
      );
      if (signup) {
        router.push({ path: "/" });
        const telegramUserId = await getTelegramUserId(signup.uid);
        console.log("telegramUserId", telegramUserId);
      }
    };

    return {
      email,
      password,
      displayName,
      role,
      error,
      isPending,
      handleSignUp,
      phoneNumber,
    };
  },
};
</script>

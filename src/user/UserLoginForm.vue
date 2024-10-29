<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div
      class="w-full mx-auto flex flex-col items-center justify-center space-y-4"
    >
      <div class="xl:w-[100px] lg:w-[100px] md:w-[100px] w-[80px] h-[100px]">
        <img src="../assets/nubb.png" alt="" />
      </div>
      <h1 class="xl:text-24px lg:text-24px md:text-24px text-18px text-center">
        User Login
      </h1>
    </div>
    <div
      class="w-full mx-auto flex flex-col items-center justify-center space-y-4"
    >
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
    </div>
    <div class="!w-3/4 mx-auto flex items-center justify-between space-x-2">
      <div class="flex items-center space-x-2">
        <input type="checkbox" class="loginInput" />
        <label for="" class="xl:text-17px lg:text-16px md:text-16pxpx text-13px"
          >Remember me</label
        >
      </div>
      <div>
        <router-link
          class="xl:text-17px lg:text-16px md:text-16pxpx text-13px border-b border-primary-6 text-primary-6 cursor-pointer active:text-primary-6/80 hover:text-primary-6/80 duration-300"
          to="/forgot-password"
          >Forgot password?</router-link
        >
      </div>
    </div>
    <div class="flex justify-center">
      <button
        :disabled="isPending"
        type="submit"
        class="btncheckout px-8 !w-3/4"
      >
        {{ isPending ? "Logging in..." : "Login" }}
      </button>
    </div>
    <div class="flex justify-center">
      <router-link
        class="xl:text-17px lg:text-16px md:text-16pxpx text-13px border-b border-primary-6 text-primary-6 cursor-pointer active:text-primary-6/80 hover:text-primary-6/80 duration-300"
        to="/userregister"
        >Dont have an account?</router-link
      >
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import useSignIn from "@/composible/SignIn";
import { useRouter } from "vue-router";

export default {
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
      const success = await signin(email.value, password.value);
      if (success) {
        console.log("login success");
        emit("close");
        router.push({ path: "/" });
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

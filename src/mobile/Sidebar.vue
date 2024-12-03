<template>
  <div class="flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <ul class="divide-y divide-primary-3">
        <li
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-user size-5 mr-3"></i>
            <span class="text-16px">
              {{
                currentUser
                  ? currentUser.displayName
                  : "Please create a account"
              }}
            </span>
          </div>
        </li>
        <li
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-history size-5 mr-3"></i>
            <span class="text-16px">History</span>
          </div>
        </li>
        <li
          v-if="currentUser"
          @click="logout"
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-sign-out size-5 mr-3"></i>
            <span class="text-16px">Logout</span>
          </div>
        </li>
        <li
          v-else
          @click="handleLogin"
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-sign-in size-5 mr-3"></i>
            <span class="text-16px">Login</span>
          </div>
        </li>
      </ul>
    </div>
    <Dialog
      v-model:visible="visible"
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <component :is="currentComponent" @close="handleClose" />
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "@/config/config";
import UserLoginForm from "@/user/UserLoginForm.vue";
import { getCollectionQuery } from "@/composible/getCollection";
export default {
  components: { UserLoginForm },

  setup() {
    const currentUser = ref(null);
    const auth = getAuth();
    const visible = ref(false);
    const currentComponent = ref(null);
    const logout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("user");
        router.push("/");
        alert("You have been logged out successfully!");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    const handleLogin = () => {
      visible.value = true;
      currentComponent.value = "UserLoginForm";
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = "";
    };
    onMounted(() => {
      currentUser.value = projectAuth.currentUser;
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
    });

    return {
      currentUser,
      logout,
      handleLogin,
      currentComponent,
      handleClose,
      visible,
    };
  },
};
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>

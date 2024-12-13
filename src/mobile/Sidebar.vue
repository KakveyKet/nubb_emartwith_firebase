<template>
  <div class="flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <ul class="divide-y divide-primary-3">
        <li
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div
            @click="currentUser ? handleUserInfo() : handleLogin()"
            class="flex items-center text-primary-8 hover:text-primary-10"
          >
            <i v-if="!items[0]?.image" class="pi pi-user size-5 mr-3"></i>
            <img
              v-else
              :src="items[0]?.image"
              alt="Profile Image"
              class="size-8 rounded-full mr-3"
            />
            <span class="text-16px">
              {{
                items[0]?.username
                  ? items[0]?.username
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
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "@/config/config";
import UserLoginForm from "@/user/UserLoginForm.vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { where } from "firebase/firestore";
import { useRouter } from "vue-router";
export default {
  components: { UserLoginForm },
  props: [""],
  setup(props, { emit }) {
    const router = useRouter();
    const currentUser = ref(null);
    const auth = getAuth();
    const visible = ref(false);
    const currentComponent = ref(null);
    let unsubscribe = null;
    const logout = async () => {
      try {
        if (currentUser.value?.uid) {
          await signOut(auth);
          localStorage.removeItem("user");
          emit("toast", "logout");
          emit("close");
        }
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    const items = ref([]);
    const fetchUser = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "users",
          conditions,
          (data) => {
            items.value = data;
            console.log("items", items.value);
          },
          true
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      unsubscribe = onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
      if (currentUser.value?.uid) {
        await fetchUser("id", currentUser.value?.uid);
      }
      console.log("items", items.value);
    });
    onUnmounted(() => {
      unsubscribe();
    });
    onBeforeUnmount(() => {
      unsubscribe();
    });
    const handleUserInfo = () => {
      router.push(`/userinfo/${items.value[0]?.id}`);
    };
    return {
      currentUser,
      logout,
      handleLogin,
      currentComponent,
      handleClose,
      visible,
      items,
      router,
      handleUserInfo,
    };
  },
};
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>

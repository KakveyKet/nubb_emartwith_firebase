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
              class="size-8 rounded-full mr-3 object-cover"
            />
            <span class="text-16px">
              {{
                items[0]?.username
                  ? items[0]?.username
                  : `${t("message.please_create_account")}`
              }}
            </span>
          </div>
        </li>

        <li
          v-if="currentUser"
          @click="is_logout = true"
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-sign-out size-5 mr-3"></i>
            <span class="text-16px">{{ t("message.logout") }}</span>
          </div>
        </li>
        <li
          v-else
          @click="handleLogin"
          class="p-4 hover:bg-primary-2 transition-colors duration-200 cursor-pointer"
        >
          <div class="flex items-center text-primary-8 hover:text-primary-10">
            <i class="pi pi-sign-in size-5 mr-3"></i>
            <span class="text-16px">{{ t("message.login") }}</span>
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
      <component
        :is="currentComponent"
        @close="handleClose"
        @close_drawer="handleCloseDrawer"
      />
    </Dialog>
    <Dialog
      v-model:visible="is_logout"
      :modal="true"
      :closable="true"
      header="Do you want to logout?"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="w-[100%] mx-auto flex flex-col space-y-5">
        <!-- <h1 class="xl:text-24px lg:text-20px md:text-16px text-16px font-bold">
      Are you sure you want to logout?
    </h1> -->
        <div class="flex items-center gap-2">
          <Button
            @click="is_logout = false"
            severity="secondary"
            :label="t('message.cancel')"
          />
          <Button
            @click="logout"
            severity="contrast"
            text
            :label="t('message.yes')"
          />
        </div>
      </div>
    </Dialog>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, onBeforeUnmount, computed } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "@/config/config";
import UserLoginForm from "@/user/UserLoginForm.vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { where } from "firebase/firestore";
import { useRouter } from "vue-router";
import { Notivue, Notification, push } from "notivue";
import { useI18n } from "vue-i18n";

export default {
  components: { UserLoginForm, Notivue, Notification },
  props: [""],
  setup(props, { emit }) {
    const router = useRouter();
    const currentUser = ref(null);
    const auth = getAuth();
    const handleCloseDrawer = () => {
      emit("close_drawer");
    };

    const visible = ref(false);
    const currentComponent = ref(null);
    let unsubscribe = null;
    const is_logout = ref(false);

    const logout = async () => {
      try {
        if (currentUser.value?.uid) {
          await signOut(auth);
          localStorage.removeItem("user");
          visible.value = false;
          is_logout.value = false;
          handleCloseDrawer();
          push.success(`${t("message.logout_success")}`);
        }
      } catch (error) {
        console.error("Error logging out:", error);
        push.error(`${t(`message.logout_error`)}`);
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
      currentUser,
      logout,
      handleLogin,
      currentComponent,
      handleClose,
      visible,
      items,
      router,
      handleUserInfo,
      handleCloseDrawer,
      is_logout,
      t,
      locale,
      dynamicFont,
    };
  },
};
</script>

<style scoped></style>

<template>
  <div class="w-full h-fit">
    <!-- navbar -->
    <div class="xl:w-full lg:w-full md:w-full w-full shadow-md hidden-print">
      <div
        class="xl:w-[90%] lg:w-[90%] md:w-[90%] w-[90%] mx-auto py-2 flex items-center justify-between"
      >
        <!-- logo -->
        <div class="flex items-center gap-4">
          <div
            class="xl:w-[48px] lg:w-[48px] md:w-[48px] w-[30px] xl:h-[66px] lg:h-[66px] md:h-[66px] h-[40px]"
          >
            <img src="../assets/nubb.png" alt="" />
          </div>
          <div
            class="text-black xl:text-24px lg:text-20px md:text-16px text-14px font-bold"
          >
            <h1
              class="xl:text-24px lg:text-20px md:text-16px text-14px font-bold text-nowrap"
            >
              <router-link to="/">NUBB E-Shop</router-link>
            </h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- cart -->
          <div class="xl:flex hidden lg:flex md:hidden items-center gap-2">
            <div class="flex gap-2">
              <div
                @click="handleTab('cart')"
                class="size-9 bg-primary-5 rounded-full flex items-center justify-center relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span
                  class="text-primary-6 absolute animate-flip-up animate-once animate-duration-300 text-16px bg-white size-5 box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08); flex items-center justify-center rounded-full font-bold -top-2 right-0"
                  >{{ cartAdded.length }}</span
                >
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Button
              @click="is_search = true"
              icon="pi pi-search"
              severity="secondary"
              rounded
              aria-label="Bookmark"
              size="small"
            />
            <Button
              @click="visibleRight = true"
              icon="pi pi-bars"
              severity="secondary"
              rounded
              size="small"
              aria-label="Bookmark"
            />
          </div>
          <div
            v-if="currentUser"
            class="xl:flex lg:flex md:hidden hidden items-center gap-2"
          >
            <!-- image can not move to download -->
            <div class="text-white font-bold">
              <img
                v-if="items[0]?.image"
                @click="toggle"
                :src="items[0]?.image"
                alt=""
                class="size-9 border border-primary-5 rounded-full object-cover cursor-pointer"
              />
              <div
                @click="handleUserInfo"
                v-else
                class="text-white size-9 bg-primary-5 rounded-full flex items-center justify-center font-bold cursor-pointer"
              >
                {{ items[0]?.username[0] }}
              </div>
            </div>
          </div>
          <Button
            v-if="!currentUser"
            @click="handleLogin"
            severity="secondary"
            rounded
            icon="pi pi-user"
            class="xl:!flex lg:!flex md:!hidden !hidden"
          >
          </Button>
          <!-- translate  update to select language 
           -->
          <div
            class="border overflow-hidden size-10 cursor-pointer rounded-full"
          >
            <img class="w-full h-full" src="../assets/download.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- sub navbar  -->
    <div
      class="border-b xl:w-[90%] lg:w-[90%] md:w-[90%] w-full hidden-print mx-auto"
    >
      <div
        class="xl:ml-0 lg:ml-0 md:ml-0 ml-3 flex items-center justify-items-start h-[47px] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto gap-3"
      >
        <div
          @click="handleTab('shop')"
          class="flex items-center gap-2"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 xl:px-4 lg:px-4 md:px-2 px-1.5 duration-300 text-nowrap cursor-pointer':
              tab === 'shop',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'shop',
          }"
        >
          <span>
            <i class="pi pi-shop"></i>
          </span>
          Shop
        </div>
        <div
          class="xl:hidden lg:hidden md:block block relative"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 xl:px-4 lg:px-4 md:px-2 px-1.5 duration-300 text-nowrap cursor-pointer':
              tab === 'cart',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'cart',
          }"
        >
          <div @click="handleTab('cart')" class="flex items-center gap-2">
            <i class="pi pi-shopping-cart"></i>
           Cart
          </div>
          <div 
          v-if="cartAdded.length > 0"

            :class="{
              'absolute top-1 -right-2 size-5 bg-primary-6 rounded-full flex items-center justify-center text-white text-10px ':
                tab === 'cart',
              'absolute -top-2.5   -right-2 size-5 bg-primary-6 rounded-full flex items-center justify-center text-white text-10px ':
                tab !== 'cart',
            }"
          >
            <p
              :class="{
                'animate-flip-up animate-once animate-duration-300':
                  tab === 'cart',
              }"
            >
              <p    class="text-white">
                {{ cartAdded.length }}
              </p>
            </p>
          </div>
        </div>

        <div
          @click="handleTab('tracking_order')"
          class="flex items-center gap-2"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 xl:px-4 lg:px-4 md:px-2 px-1.5 duration-300 text-nowrap cursor-pointer':
              tab === 'tracking_order',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'tracking_order',
          }"
        >
          <span>
            <font-awesome-icon
              class=" size-5"
              :icon="['fas', 'burger']"
            />
          </span>
          Order
        </div>
        <div
          @click="handleTab('history')"
          class="flex items-center gap-2"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 xl:px-4 lg:px-4 md:px-2 px-1.5 duration-300 text-nowrap cursor-pointer':
              tab === 'history',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'history',
          }"
        >
          <span>
            <i class="pi pi-history"></i>
          </span>
          History
        </div>
      </div>
    </div>
    <!-- category -->

    <div v-if="tab === 'shop'" class="w-full hidden-print">
      <div class="w-[80%] mx-auto">
        <ShopComponent
          @tab="handleTab"
          :markets="markets"
          @login="handleLogin"
          :currentUser="currentUser"
        />
      </div>
    </div>
    <div v-if="tab === 'cart'" class="w-full hidden-print">
      <div class="">
        <CartView />
      </div>
    </div>
    <div v-if="tab === 'tracking_order'" class="w-full hidden-print">
      <TrackingOrder :currentUser="currentUser" />
    </div>
    <!-- user history -->
    <div v-if="tab === 'history'" class="w-full">
      <div class="w-[80%] mx-auto">
        <UserHistory :currentUser="currentUser" />
      </div>
    </div>
    <!-- footer -->
    <Dialog
      v-model:visible="visible"
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <component :is="currentComponent" @close="handleClose" />
    </Dialog>
    <Toast />
  </div>
  <div class="hidden-print">
    <FooterVue />
  </div>
  <div class="fixed bottom-5 right-5 hidden">
    <ShopDetail @tab="handleTab('cart')" />
  </div>
  <Drawer
    v-model:visible="visibleRight"
    :show-close-icon="false"
    position="right"
    class="h-screen"
  >
    <Sidebar
      @close_drawer="handleCloseDrawer"
      :currentUser="currentUser"
      @toast="showToast"
    />
  </Drawer>
  <Dialog
    v-model:visible="is_search"
    :modal="true"
    :class="{ 'w-full h-full': is_search, 'w-0 h-0': !is_search }"
    :style="{ width: '50vw', position: 'absolute', top: '5vh' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :closable="false"
    class="!rounded-xl !overflow-auto"
  >
    <div
      class="w-[100%] mx-auto overflow-auto hide-scrollbar flex gap-2 relative"
    >
      <div class="w-[100%] flex items-center mx-auto gap-3">
        <div class="flex items-center gap-2">
          <Button
            @click="is_search = false"
            text
            icon="pi pi-chevron-left"
            severity="secondary"
            rounded
            aria-label="Bookmark"
            class="size-4"
          />
        </div>
        <IconField class="w-full">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="search_value"
            placeholder="Search by shop name ..."
            class="w-full h-12 !rounded-3xl"
          />
        </IconField>
      </div>
    </div>

    <div class="w-[100%] mx-auto overflow-auto hide-scrollbar">
      <ShopFilter :markets="markets" :search_value="search_value" />
    </div>
  </Dialog>
  <!-- pop over -->
  <Popover ref="op">
    <div class="flex flex-col gap-4 items-center w-[10rem]">
      <!-- User Info Section -->
      <div>
        <div v-if="currentUser" class="flex items-center gap-4">
          <!-- User Avatar -->
          <div class="flex items-center gap-2">
            <div
              class="flex flex-col items-center justify-center space-x-3 text-nowrap mx-auto"
            >
              <div
                v-if="items"
                class="hidden xl:flex lg:flex md:flex size-12 bg-primary-5 rounded-full items-center justify-center mx-auto space-y-2"
              >
                <img
                  v-if="items[0]?.image"
                  @click="handleUserInfo"
                  :src="items[0]?.image"
                  alt="User Avatar"
                  class="size-12 rounded-full object-cover cursor-pointer mx-auto"
                />
                <div
                  v-else
                  @click="handleUserInfo"
                  class="text-white font-bold cursor-pointer"
                >
                  {{ items[0]?.username[0] }}
                </div>
              </div>
              <div v-if="currentUser" class="text-primary-8 text-16px mt-2">
                Hi, <span class="font-bold">{{ items[0]?.username }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div>
        <div class="hidden md:flex flex-col items-start">
          <!-- Logout Button -->
          <div class="w-[90%] border-b mx-auto"></div>

          <div class="w-[90%] border-b mx-auto"></div>

          <div
            v-if="currentUser"
            @click="isLogout = true"
            class="p-3 w-full text-16px text-primary-8 hover:bg-primary-2 hover:text-primary-10 transition-colors duration-200 cursor-pointer rounded-md flex items-center gap-2"
          >
            <i class="pi pi-sign-out size-5"></i>
            <span>Logout</span>
          </div>
          <div
            v-else
            @click="handleLogin"
            class="p-3 w-full text-16px text-primary-8 hover:bg-primary-2 hover:text-primary-10 transition-colors duration-200 cursor-pointer rounded-md flex items-center gap-2"
          >
            <i class="pi pi-sign-in size-5"></i>
            <span>Login</span>
          </div>
        </div>
      </div>
    </div>
  </Popover>
  <!-- logout -->
  <Dialog
    v-model:visible="isLogout"
    :modal="true"
    :closable="true"
    header="Do you want to logout?"
    :style="{ width: '30vw', position: 'absolute', top: '10vh' }"
  >
    <div class="w-[100%] mx-auto flex flex-col space-y-5">
      <!-- <h1 class="xl:text-24px lg:text-20px md:text-16px text-16px font-bold">
        Are you sure you want to logout?
      </h1> -->
      <div class="flex items-center gap-2">
        <Button @click="isLogout = false" severity="secondary" label="Cancel" />
        <Button @click="logout" severity="contrast" text label="Yes " />
      </div>
    </div>
  </Dialog>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<script>
import TrackingOrder from "@/views/TrackingOrder.vue";
import ShopFilter from "@/views/ShopFilter.vue";
import Sidebar from "@/mobile/Sidebar.vue";
import FooterVue from "@/components/FooterPage.vue";
import CategoryVue from "@/components/CategoryPage.vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted, watch } from "vue";
import { formatCurrency, formatNumber } from "@/helper/formatCurrecy";
import UserLoginForm from "@/user/UserLoginForm.vue";
import ShopDetail from "@/views/ShopDetail.vue";
import { useRouter, useRoute } from "vue-router";
import ShopComponent from "@/views/ShopComponent.vue";
import { projectAuth } from "@/config/config";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { where } from "@firebase/firestore";
import { timestamp } from "@/config/config";
// import { projectFirestore } from "@/config/config";
// import { sendTelegramMessage } from "@/composible/useDMTelegram";
import useCollection from "@/composible/useCollection";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import CartView from "./CartView.vue";
import { Notivue, Notification, push } from "notivue";
import UserHistory from "@/views/UserHistory.vue";
export default {
  components: {
    FooterVue,
    CategoryVue,
    UserLoginForm,
    ShopComponent,
    Toast,
    CartView,
    Sidebar,
    TrackingOrder,
    ShopFilter,
    ShopDetail,
    Notivue,
    Notification,
    UserHistory,
  },
  setup() {
    const toast = useToast();
    const op = ref(null);
    const is_search = ref(false);
    const search_value = ref("");
    const route = useRoute();
    const subCategory = ref([]);
    const products = ref([]);
    const currentUser = ref(null);
    const visible = ref(false);
    const currentComponent = ref("");
    const router = useRouter();
    const auth = getAuth();
    const visibleRight = ref(false);
    const isLogout = ref(false);
    const toggle = (e) => {
      op.value.toggle(e);
    };
    const showToast = (action, severity) => {
      let summary;
      switch (action) {
        case "create":
          severity = "success";
          summary = "Cart Added Success";
          break;
        case "update":
          severity = "info";
          summary = "Product Updated";
          break;
        case "delete":
          severity = "error";
          summary = "Product Deleted";
        case "delete":
          severity = "warn";
          summary = "You don't have account please register";
          break;
        default:
          severity = "info";
          summary = "Action Completed";
          break;
        case "logout":
          severity = "info";
          summary = "Logout Success";
          break;
        case "login":
          severity = "info";
          summary = "Login Success";
          break;
        case "register":
          severity = "info";
          summary = "Register Success";
          break;
      }

      toast.add({
        severity: severity,
        summary: summary,
        life: 3000,
      });
    };

    const handleCloseDrawer = () => {
      visibleRight.value = false;
    };
    const handleSearch = () => {
      is_search.value = true;
    };
    const handleUserInfo = () => {
      router.push(`/userinfo/${items.value[0]?.id}`);
    };
    const { addDocs, removeDoc } = useCollection("carts");
    const handleLogin = () => {
      visible.value = true;
      currentComponent.value = "UserLoginForm";
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = "";
    };
    const fetchProducts = async () => {
      await getCollectionQuery(
        "products",
        [],
        (data) => {
          products.value = data;
        },
        true
      );
    };

    const fetchCategory = async () => {
      await getCollectionQuery(
        "maincategory",
        [],
        (data) => {
          subCategory.value = data;
        },
        true
      );
    };
    const markets = ref([]);
    const fetchMarket = async () => {
      const conditions = [where("status", "==", true)];
      await getCollectionQuery(
        "marts",
        conditions,
        (data) => {
          markets.value = data;
        },
        true
      );
    };
    const logout = async () => {
      try {
        await signOut(auth); // Sign out the user using Firebase
        localStorage.removeItem("user"); // Remove any stored user info
        router.push("/"); // Redirect to login page
        push.success("Logout Success");
        isLogout.value = false;
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    console.log(products.value);
    const tab = ref("shop");

    const handleTab = (selectedTab) => {
      tab.value = selectedTab;
    };

    watch(currentUser, () => {
      if (currentUser.value?.uid) {
        console.log("currentuser ", currentUser.value?.uid);
      }
      fetchUser("id", currentUser.value?.uid);
    });
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

    const cartAdded = ref([]);
    const fetchCartAdded = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "carts",
          conditions,
          (data) => {
            cartAdded.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    watch(cartAdded, async () => {
      await fetchCartAdded("userId", currentUser.value?.uid);
    });
    const handleAddToCart = async (data) => {
      try {
        const cartItem = {
          name: data.name,
          price: data.price,
          quantity: data.quantity || 1,
          createdAt: timestamp(),
          userId: currentUser.value?.uid,
          category: data.category,
          images: data.images,
          branch_id: data.branch_id,
        };
        if (currentUser.value?.uid) {
          const result = await addDocs(cartItem);
          showToast("create", "success");
          console.log("result", result);
        } else {
          handleLogin();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    onMounted(async () => {
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([
        fetchProducts(),
        fetchCategory(),
        fetchMarket(),
        fetchUser("id", currentUser.value?.uid),
      ]);
      await fetchCartAdded("userId", currentUser.value?.uid);
    });
    return {
      route,
      products,
      subCategory,
      formatCurrency,
      formatNumber,
      currentUser,
      visible,
      currentComponent,
      handleLogin,
      handleClose,
      logout,
      handleTab,
      tab,
      markets,
      handleAddToCart,
      cartAdded,
      router,
      visibleRight,
      showToast,
      items,
      handleUserInfo,
      is_search,
      search_value,
      handleSearch,
      tab,
      isLogout,
      handleCloseDrawer,
      op,
      toggle,
    };
  },
};
</script>

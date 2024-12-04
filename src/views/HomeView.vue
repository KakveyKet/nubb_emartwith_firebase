<template>
  <div class="w-full h-fit">
    <!-- navbar -->
    <div class="xl:w-full lg:w-full md:w-full w-full shadow-md">
      <div
        class="xl:w-[80%] lg:w-[80%] md:w-[100%] w-[90%] mx-auto py-2 flex items-center justify-between"
      >
        <!-- logo -->
        <div class="flex items-center gap-4">
          <div class="w-[48px] h-[66px]">
            <img src="../assets/nubb.png" alt="" />
          </div>
          <div
            class="text-black xl:text-24px lg:text-20px md:text-16px text-14px font-bold"
          >
            <h1
              class="xl:text-24px lg:text-20px md:text-16px text-14px font-bold text-nowrap"
            >
              NUBB E-Shop
            </h1>
          </div>
        </div>
        <!-- search -->
        <div
          class="w-[450px] xl:flex hidden lg:flex md:flex p-0.5 border-[#646464] border rounded-[40px] overflow-hidden"
        >
          <input
            class="w-full border-none input_webpage"
            placeholder="What are you looking for?"
            type="text"
          />
          <button class="btncheckout px-12">Search</button>
        </div>
        <!-- tool -->
        <div class="flex items-center gap-3">
          <div class="xl:flex hidden lg:flex md:flex items-center gap-2">
            <img
              class="w-[24px] h-[16px]"
              src="../assets/download.png"
              alt=""
            />
            <div class="flex gap-2">
              <h3 class="text-16px font-bold">KH</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div class="xl:flex hidden lg:flex md:flex items-center gap-2">
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
                  class="text-primary-6 absolute text-16px bg-white size-5 box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08); flex items-center justify-center rounded-full font-bold -top-2 right-0"
                  >{{ cartAdded.length }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="xl:flex hidden lg:flex md:flex items-center gap-2 border-r border-primary-4 px-2"
          >
            <div
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span
                class="text-primary-6 absolute text-16px bg-white size-5 box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08); flex items-center justify-center rounded-full font-bold -top-2 right-0"
                >2</span
              >
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex gap-2 items-center">
              <div
                v-if="currentUser"
                class="xl:flex lg:flex md:flex hidden size-9 bg-primary-5 rounded-full items-center justify-center"
              >
                <h2 class="text-white font-bold">
                  {{ currentUser?.displayName[0] }}
                </h2>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  v-if="currentUser"
                  class="xl:block lg:block md:block hidden text-nowrap text-16px px-2 py-1.5 bg-primary-5 text-white font-semibold rounded-md"
                >
                  Hi, {{ currentUser.displayName }}
                </div>

                <div
                  class="xl:hidden lg:hidden md:hidden flex items-center gap-2"
                >
                  <Button
                    @click="visibleRight = true"
                    icon="pi pi-bars"
                    severity="secondary"
                    rounded
                    aria-label="Bookmark"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="xl:flex lg:flex md:flex hidden items-center gap-2">
            <div
              v-if="currentUser"
              @click="logout"
              class="p-2 text-16px hover:bg-primary-2 transition-colors duration-200 cursor-pointer rounded-md"
            >
              <div
                class="flex items-center text-primary-8 hover:text-primary-10"
              >
                <i class="pi pi-sign-out size-5 mr-3"></i>
                <span class="text-16px">Logout</span>
              </div>
            </div>
            <div
              v-else
              @click="handleLogin"
              class="p-2 text-16px hover:bg-primary-2 transition-colors duration-200 cursor-pointer rounded-md"
            >
              <div
                class="flex items-center text-primary-8 hover:text-primary-10"
              >
                <i class="pi pi-sign-in size-5 mr-3"></i>
                <span class="text-16px">Login</span>
              </div>
            </div>
          </div>
        </div>
        <!-- pf -->
        <!-- <div></div> -->
      </div>
    </div>
    <!-- sub navbar  -->
    <div class="border-b w-full">
      <div
        class="flex items-center justify-items-start h-[47px] xl:w-[80%] lg:w-[80%] md:w-[80%] mx-auto gap-3"
      >
        <div
          @click="handleTab('home')"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 px-4 duration-300 text-nowrap cursor-pointer':
              tab === 'home',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'home',
          }"
        >
          Home
        </div>
        <div
          @click="handleTab('shop')"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 px-4 duration-300 text-nowrap cursor-pointer':
              tab === 'shop',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'shop',
          }"
        >
          Shop
        </div>
        <OverlayBadge
          class="xl:hidden lg:hidden md:block block"
          severity="danger"
          size="small"
          :value="cartAdded.length"
        >
          <div
            @click="handleTab('cart')"
            :class="{
              'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 px-4 duration-300 text-nowrap cursor-pointer':
                tab === 'cart',
              'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
                tab !== 'cart',
            }"
          >
            In Cart
          </div>
        </OverlayBadge>

        <div
          @click="handleTab('tracking_order')"
          :class="{
            'text-primary-6 font-semibold xl:text-16px lg:text-16px md:text-16px text-13px h-full flex items-center border-b-2 border-primary-6 px-4 duration-300 text-nowrap cursor-pointer':
              tab === 'tracking_order',
            'text-slate-500 xl:text-16px lg:text-16px md:text-16px text-13px  cursor-pointer duration-300 text-nowrap px-3 font-semibold':
              tab !== 'tracking_order',
          }"
        >
          Track Order
        </div>
      </div>
    </div>
    <!-- category -->

    <!-- body -->
    <div v-if="tab === 'home'" class="w-full">
      <div class="w-full mt-8">
        <CategoryVue :data="subCategory" />
      </div>
      <div
        class="xl:w-[80%] lg:w-[80%] md:w-[90%] w-[90%] xl:mx-auto lg:mx-0 md:mx-auto mx-3"
      >
        <div class="mt-6">
          <div class="text-black text-14px font-bold flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
            <span>Popular</span>
          </div>
        </div>
        <!-- cart container -->
        <div
          class="mt-8 xl:w-fit lg:w-fit md:w-fit w-full xl:gap-8 lg:gap-8 md:gap-8 gap-12 grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 h-fit py-3"
        >
          <!-- cart -->
          <div
            v-for="data in products"
            :key="data"
            class="xl:mx-0 lg:mx-0 md:mx-0 mx-auto xl:h-[270px] lg:h-[250px] md:h-[220px] h-[200px] xl:w-[200px] lg:w-[200px] md:w-[150px] w-[150px] xl:p-5 lg:p-5 md:p-5 p-3 rounded-[10px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] animate-fade-up animate-duration-300"
          >
            <OverlayBadge :value="data.stock" position="bottom-right">
              <div
                class="w-full xl:h-[150px] lg:h-[150px] md:h-[100px] h-[100px] overflow-hidden rounded-md"
              >
                <img :src="data.images[0]" class="object-cover" />
              </div>
            </OverlayBadge>
            <div>
              <h2 class="font-semibold text-black text-14px py-2">
                {{ data.name }}
              </h2>
              <!-- <p class="text-slate-400 text-13px">1 pc</p> -->
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="xl:size-3 lg:size-3 md:size-3 size-2 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="xl:size-3 lg:size-3 md:size-3 size-2 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="xl:size-3 lg:size-3 md:size-3 size-2 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="xl:size-3 lg:size-3 md:size-3 size-2 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="xl:size-3 lg:size-3 md:size-3 size-2 text-yellow-400"
                  />
                </div>
                <h2 class="py-2">{{ formatNumber(data.price) }} ៛</h2>
              </div>
              <div>
                <button
                  @click="handleAddToCart(data)"
                  class="btnaddtocart xl:w-[50px] lg:w-[30px] md:w-[30px] w-[30px] xl:h-[50px] lg:h-[30px] md:h-[30px] h-[30px] xl:text-14px lg:text-14px md:text-14px text-12px xl:px-2 lg:px-2 md:px-2 px-1 xl:flex lg:flex md:flex flex items-center justify-center justify-items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tab === 'shop'" class="w-full">
      <div class="w-[80%] mx-auto">
        <ShopComponent :markets="markets" />
      </div>
    </div>
    <div v-if="tab === 'cart'" class="w-full">
      <div class="">
        <CartView />
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
  <div class="">
    <FooterVue />
  </div>

  <Drawer
    v-model:visible="visibleRight"
    :show-close-icon="false"
    position="right"
    class="h-screen"
  >
    <Sidebar />
  </Drawer>
</template>

<script>
import Sidebar from "@/mobile/Sidebar.vue";
import FooterVue from "@/components/FooterPage.vue";
import CategoryVue from "@/components/CategoryPage.vue";
import { useRoute } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted, watch } from "vue";
import { formatCurrency, formatNumber } from "@/helper/formatCurrecy";
import UserLoginForm from "@/user/UserLoginForm.vue";

import { useRouter } from "vue-router";
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
export default {
  components: {
    FooterVue,
    CategoryVue,
    UserLoginForm,
    ShopComponent,
    Toast,
    CartView,
    Sidebar,
  },
  setup() {
    const toast = useToast();
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
      }

      toast.add({
        severity: severity,
        summary: summary,
        life: 3000,
      });
    };
    const route = useRoute();
    const subCategory = ref([]);
    const products = ref([]);
    const currentUser = ref(null);
    const visible = ref(false);
    const currentComponent = ref("");
    const router = useRouter();
    const auth = getAuth();
    const visibleRight = ref(false);

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

    const fetchSubCategory = async () => {
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
      await getCollectionQuery(
        "marts",
        [],
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
        alert("You have been logged out successfully!");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    console.log(products.value);
    const tab = ref("home");

    const handleTab = (selectedTab) => {
      tab.value = selectedTab;
    };

    watch(currentUser, () => {
      if (currentUser.value?.uid) {
        console.log("currentuser ", currentUser.value?.uid);
      }
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
            console.log("cartAdded", cartAdded.value);
          },
          true
        );
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

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
          fetchCartAdded("userId", currentUser.value?.uid),
            console.log("result", result);
        } else {
          showToast("delete", "warning");
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
        fetchSubCategory(),
        fetchMarket(),
        fetchUser("id", currentUser.value?.uid),
        fetchCartAdded("userId", currentUser.value?.uid),
      ]);
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
    };
  },
};
</script>

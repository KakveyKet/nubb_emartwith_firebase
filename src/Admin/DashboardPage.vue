<template>
  <div
    class="flex items-start animate-fade-up animate-once animate-duration-300"
  >
    <!-- Static Sidebar -->
    <div
      :class="[
        'h-screen  duration-300 bg-white  border-r border-slate-200',
        sidebarVisible ? 'w-[15%] duration-300' : 'w-[5%] duration-300',
      ]"
    >
      <div class="flex items-center gap-4 p-5 w-full">
        <div class="size-14 overflow-hidden rounded-full">
          <img
            class="size-full object-cover w-full h-full"
            :src="
              marts[0]?.profileImageUrl
                ? marts[0]?.profileImageUrl
                : 'https://via.placeholder.com/150'
            "
          />
        </div>
        <div
          :class="[
            sidebarVisible ? 'text-primary-10 text-24px font-bold' : 'hidden',
          ]"
        >
          <h1 class="text-16px">
            {{ marts[0]?.name ? marts[0]?.name : "No Shop regsiter" }}
          </h1>
        </div>
      </div>
      <div class="w-full flex flex-col space-y-4 mt-4 p-3">
        <!-- dashboard -->
        <router-link
          :class="
            $route.path === '/admindashboard'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/admindashboard"
        >
          <div
            :class="[
              $route.path === '/admindashboard'
                ? 'isSidbar_border_active'
                : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-6"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M24 21h2v5h-2zm-4-5h2v10h-2zm-9 10a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3v-2a5 5 0 0 1 0 10"
              />
              <path
                fill="currentColor"
                d="M28 2H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h24a2.003 2.003 0 0 0 2-2V4a2 2 0 0 0-2-2m0 9H14V4h14ZM12 4v7H4V4ZM4 28V13h24l.002 15Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Dashboard
            </h2>
          </div>
        </router-link>
        <!-- product -->
        <router-link
          :class="
            $route.path === '/products'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/products"
        >
          <div
            :class="[
              $route.path === '/products' ? 'isSidbar_border_active' : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Products
            </h2>
          </div>
        </router-link>
        <!-- subcategory -->
        <router-link
          :class="
            $route.path === '/subcategory'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/subcategory"
        >
          <div
            :class="[
              $route.path === '/subcategory'
                ? 'isSidbar_border_active'
                : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-6"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Category
            </h2>
          </div>
        </router-link>
        <!-- today order -->
        <router-link
          :class="
            $route.path === '/todayorder'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/todayorder"
        >
          <div
            :class="[
              $route.path === '/todayorder'
                ? 'isSidbar_border_active'
                : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Today Orders
            </h2>
          </div>
        </router-link>

        <!-- report -->
        <router-link
          :class="
            $route.path === '/report'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/report"
        >
          <div
            :class="[
              $route.path === '/report' ? 'isSidbar_border_active' : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Report
            </h2>
          </div>
        </router-link>

        <!-- payment method -->
        <router-link
          :class="
            $route.path === '/paymentmethod'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/paymentmethod"
        >
          <div
            :class="[
              $route.path === '/paymentmethod'
                ? 'isSidbar_border_active'
                : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Payment Method
            </h2>
          </div>
        </router-link>
        <!-- cover -->
        <router-link
          :class="
            $route.path === '/martcover'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/martcover"
        >
          <div
            :class="[
              $route.path === '/martcover'
                ? 'isSidbar_border_active'
                : 'hidden',
            ]"
          ></div>
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <h2
              :class="[
                sidebarVisible
                  ? 'text-primary-11 text-16px font-bold'
                  : 'hidden',
              ]"
            >
              Settings
            </h2>
          </div>
        </router-link>
        <div
          @click="logoutCofimation"
          class="text-red-500 cursor-pointer absolute bottom-2"
        >
          <div
            :class="[
              sidebarVisible
                ? 'flex gap-3 w-full ml-8'
                : 'flex marts-center justify-center w-full',
            ]"
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
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>

            <h2
              :class="[
                sidebarVisible ? 'text-red text-16px font-bold' : 'hidden',
              ]"
            >
              Logout
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div class="content w-full">
      <div class="navbar">
        <button
          class="sidebar_collap_btn"
          v-if="sidebarVisible === true"
          @click="toggleSidebar"
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          class="sidebar_collap_btn"
          v-if="sidebarVisible === false"
          @click="toggleSidebar"
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div
          @click="router.push({ path: '/todayorder' })"
          class="flex marts-center gap-3 mr-6"
        >
          <div class="flex marts-center gap-2 border-r border-primary-4 px-2">
            <div class="gap-2 relative flex right-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
              <span
                class="absolute -top-2 -right-1 text-sm text-white bg-red-500 size-4 flex items-center justify-center rounded-full cursor-pointer"
              >
                {{ orders.length }}
              </span>
            </div>
            <h3 class="text-16px">Order</h3>
          </div>
          <div class="flex marts-center gap-2">
            <div class="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              <h3 class="text-16px">Hi, {{ currentUser?.displayName }}</h3>
            </div>
          </div>
        </div>
        <!-- <div
          @click="toggleTranslate"
          class="border overflow-hidden size-10 cursor-pointer rounded-full"
        >
          <img
            v-if="locale === 'khm'"
            class="w-full h-full animate-fade-up animate-duration-200"
            src="../assets/download.png"
            alt="Khmer Language"
          />
          <img
            v-else
            class="w-full h-full animate-fade-up animate-duration-200"
            src="../assets/eng1.png"
            alt="English Language"
          />
        </div>
        <Popover ref="translate" :show-event="null" :hide-event="null">
          <div class="flex flex-col gap-2">
            <button
              @click="handleChangeLangue('eng')"
              class="px-2 py-1 bg-primary-6 xl:text-16px lg:text-16px md:text-13px text-13px rounded-lg shadow-lg text-white font-Roboto"
            >
              English
            </button>
            <button
              @click="handleChangeLangue('khm')"
              class="px-2 py-1 bg-primary-6 xl:text-16px lg:text-16px md:text-13px text-13px rounded-lg shadow-lg text-white font-NotoSerif"
            >
              ភាសាខ្មែរ
            </button>
          </div>
        </Popover> -->
      </div>
      <div class="bg-[#F5F6FA] h-screen p-7">
        <router-view></router-view>
      </div>
      <Dialog
        modal
        v-model:visible="isLogout"
        @update:visible="isLogout = false"
      >
        <template #header>
          <h3 class="text-24px font-bold">Logout</h3>
        </template>
        <template #default>
          <p>Are you sure you want to logout?</p>
        </template>
        <template #footer>
          <Button
            label="Cancel"
            severity="secondary"
            @click="isLogout = false"
          />
          <Button label="Logout" severity="danger" @click="logout" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";
import { projectAuth } from "@/config/config"; // Firebase config import
import { where } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
export default {
  setup() {
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
    const translate = ref(null);

    const handleChangeLangue = (lang) => {
      locale.value = lang;
    };
    const toggleTranslate = (event) => {
      if (translate.value) {
        translate.value.toggle(event);
      }
    };
    const sidebarVisible = ref(true);
    const router = useRouter();
    const currentUser = ref(null);
    const auth = getAuth(); // Get the Firebase auth instance
    const orders = ref([]);
    const marts = ref([]);

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };
    let unsubscribeMarts = null;
    const fetchMartsForCurrentUser = async () => {
      if (currentUser?.value) {
        // subscribe to the mart collection
        const userId = currentUser.value?.uid; // Get current user's ID
        const conditions = [where("ownerId", "==", userId)];
        unsubscribeMarts = await getCollectionQuery(
          "marts",
          conditions,
          (data) => {
            marts.value = data;
            console.log("data mart", marts.value);
          },
          true
        );
      } else {
        console.error("No user is currently logged in.");
      }
    };
    let unsubscribeOrders = null;
    const fetchOrders = async (field, value) => {
      const today = moment().tz("Asia/Phnom_Penh").startOf("day").toDate();
      const tomorrow = moment(today).add(1, "day").toDate();
      if (marts.value.length > 0) {
        const conditions = [
          where(field, "==", value),
          where("created_at", ">=", today),
          where("created_at", "<", tomorrow),
        ];
        // show toast when unsubcribe or new order
        unsubscribeOrders = await getCollectionQuery(
          "orders",
          conditions,
          (data) => {
            orders.value = data;
            console.log("data orders", orders.value);
          },
          true
        );
      } else {
        console.error("Error fetching data: Marts data is empty.");
      }
    };
    watch(marts, async (newMarts) => {
      if (newMarts.length > 0) {
        await fetchOrders("branch_id", newMarts[0].id);
      }
    });
    const logout = async () => {
      try {
        await signOut(auth); // Sign out the user using Firebase
        localStorage.removeItem("user"); // Remove any stored user info
        router.push("/login"); // Redirect to login page
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await fetchMartsForCurrentUser();
      if (marts.value.length > 0) {
        console.log("marts", marts.value[0]?.id);
        await fetchOrders("branch_id", marts.value[0]?.id);
      }
    });
    const isLogout = ref(false);
    const logoutCofimation = () => {
      isLogout.value = true;
    };

    return {
      sidebarVisible,
      currentUser,
      toggleSidebar,
      logout,
      marts,
      router,
      isLogout,
      logoutCofimation,
      orders,
      toggleTranslate,
      handleChangeLangue,
      dynamicFont,
      t,
      translate,
    };
  },
};
</script>

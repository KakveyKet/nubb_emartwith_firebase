<template>
  <div class="flex items-start">
    <!-- Static Sidebar -->
    <div
      :class="[
        'h-screen  duration-300 bg-white  border-r border-slate-200',
        sidebarVisible ? 'w-[15%] duration-300' : 'w-[5%] duration-300',
      ]"
    >
      <div class="flex items-center gap-4 p-5 w-full">
        <div class="w-[45px] h-[60px]">
          <img src="../assets/nubb.png" alt="" />
        </div>
        <div
          :class="[
            sidebarVisible ? 'text-primary-10 text-24px font-bold' : 'hidden',
          ]"
        >
          <h1 class="text-20px">{{ marts[0]?.name }}</h1>
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
          @click="logout"
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
        <div class="flex marts-center gap-3 mr-6">
          <div class="flex marts-center gap-2">
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
          <div class="flex marts-center gap-2">
            <div class="flex gap-2">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <h3 class="text-16px">Cart</h3>
            </div>
          </div>
          <div class="flex marts-center gap-2 border-r border-primary-4 px-2">
            <div class="flex gap-2">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>

              <h3 class="text-16px">Favorite</h3>
            </div>
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
      </div>
      <div class="bg-[#F5F6FA] h-screen p-7">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { projectAuth } from "@/config/config"; // Firebase config import
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import { where } from "firebase/firestore";

export default {
  setup() {
    const sidebarVisible = ref(true);
    const router = useRouter();
    const currentUser = ref(null);
    const auth = getAuth(); // Get the Firebase auth instance

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };
    const marts = ref([]);
    const fetchMartsForCurrentUser = async () => {
      if (currentUser?.value) {
        const userId = currentUser.value?.uid; // Get current user's ID
        const conditions = [where("ownerId", "==", userId)];

        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("data mart", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };

    // Function to log out the user
    const logout = async () => {
      try {
        await signOut(auth); // Sign out the user using Firebase
        localStorage.removeItem("user"); // Remove any stored user info
        router.push("/login"); // Redirect to login page
        alert("You have been logged out successfully!");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Please try again.");
      }
    };

    // Fetch the current user from Firebase auth
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([fetchMartsForCurrentUser()]);
    });

    // Return all variables and functions to make them available in the template
    return {
      sidebarVisible,
      currentUser,
      toggleSidebar,
      logout,
      marts,
    };
  },
};
</script>

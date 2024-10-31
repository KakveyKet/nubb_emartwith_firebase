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
            $route.path === '/dashboardmanagement'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/dashboardmanagement"
        >
          <div
            :class="[
              $route.path === '/dashboardmanagement'
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
            $route.path === '/userlist'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/userlist"
        >
          <div
            :class="[
              $route.path === '/userlist' ? 'isSidbar_border_active' : 'hidden',
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <h2
              :class="[sidebarVisible ? 'isSidebar_invisibleText' : 'hidden']"
            >
              Users
            </h2>
          </div>
        </router-link>
        <!-- cate -->
        <router-link
          :class="
            $route.path === '/maincategorylist'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/maincategorylist"
        >
          <div
            :class="[
              $route.path === '/maincategorylist'
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
              Main Category
            </h2>
          </div>
        </router-link>

        <router-link
          :class="
            $route.path === '/martlist'
              ? 'isSidebar_active'
              : 'isSidebar_not_active'
          "
          to="/martlist"
        >
          <div
            :class="[
              $route.path === '/martlist' ? 'isSidbar_border_active' : 'hidden',
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
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>

            <h2
              :class="[
                sidebarVisible
                  ? 'text-primary-11 text-16px font-bold'
                  : 'hidden',
              ]"
            >
              All Marts
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

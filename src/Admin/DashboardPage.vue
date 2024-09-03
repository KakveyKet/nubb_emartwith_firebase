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
          <h1 class="text-20px">NUBB E-Shop</h1>
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
                : 'flex items-center justify-center w-full',
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
                : 'flex items-center justify-center w-full',
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
                : 'flex items-center justify-center w-full',
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
                : 'flex items-center justify-center w-full',
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
                : 'flex items-center justify-center w-full',
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
                : 'flex items-center justify-center w-full',
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h2
              :class="[
                sidebarVisible
                  ? 'text-primary-11 text-16px font-bold'
                  : 'hidden',
              ]"
            >
              Mart Cover
            </h2>
          </div>
        </router-link>
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
        <div class="flex items-center gap-3 mr-6">
          <div class="flex items-center gap-2">
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
          <div class="flex items-center gap-2">
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
          <div class="flex items-center gap-2 border-r border-primary-4 px-2">
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
          <div class="flex items-center gap-2">
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

              <h3 class="text-16px">Hi, Nyla</h3>
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

<script setup>
import { ref } from "vue";

const sidebarVisible = ref(true);

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

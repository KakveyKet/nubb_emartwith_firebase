<template>
  <div class="w-full h-auto relative">
    <!-- navbar -->
    <div class="w-full shadow-md">
      <div class="w-[80%] mx-auto py-2 flex items-center justify-between">
        <!-- logo -->
        <div class="flex items-center gap-4">
          <div class="w-[48px] h-[66px]">
            <img src="../assets/nubb.png" alt="" />
          </div>
          <div class="text-black text-24px font-bold">
            <h1>NUBB E-Shop</h1>
          </div>
        </div>
        <!-- search -->
        <div
          class="w-[450px] p-0.5 flex border-[#646464] border rounded-[40px] overflow-hidden"
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
        <!-- pf -->
        <div></div>
      </div>
    </div>
    <!-- sub navbar  -->
    <div class="border-b w-full">
      <div
        class="flex items-center justify-items-start h-[47px] w-[80%] mx-auto gap-3"
      >
        <router-link
          :class="{
            'text-primary-6 text-14px h-full flex items-center border-b-2 border-primary-6 px-4':
              route.name === 'home',
            'text-slate-500 text-14px': !route.name,
          }"
          to="/"
        >
          Home
        </router-link>
        <router-link class="text-slate-500 text-14px" to="/">
          Shop
        </router-link>
        <router-link class="text-slate-500 text-14px" to="/">
          Track Order
        </router-link>
      </div>
    </div>
    <!-- category -->
    <div class="w-full mt-8">
      <CategoryVue :data="subCategory" />
    </div>
    <!-- body -->
    <div class="w-full h-screen">
      <div class="w-[80%] mx-auto">
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
        <div class="mt-8 w-fit gap-8 grid grid-cols-5">
          <!-- cart -->
          <div
            v-for="data in products"
            :key="data"
            class="w-[180px] h-auto p-5 rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <div class="w-[120px] h-[100px] overflow-hidden mx-auto">
              <img :src="data.images[0]" class="object-cover" alt="" />
            </div>
            <div>
              <h2 class="font-semibold text-black text-14px">
                {{ data.name }}
              </h2>
              <!-- <p class="text-slate-400 text-13px">1 pc</p> -->
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="size-3 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="size-3 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="size-3 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="size-3 text-yellow-400"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="size-3 text-yellow-400"
                  />
                </div>
                <h2>2000៛</h2>
              </div>
              <div>
                <button class="btnaddtocart">
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
    <!-- footer -->
    <div>
      <FooterVue />
    </div>
  </div>
</template>

<script>
import FooterVue from "@/components/FooterPage.vue";
import CategoryVue from "@/components/CategoryPage.vue";
import { useRoute } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted } from "vue";

export default {
  components: {
    FooterVue,
    CategoryVue,
  },
  setup() {
    const route = useRoute();
    const subCategory = ref([]);
    const products = ref([]);
    const loadFromCache = (key) => JSON.parse(localStorage.getItem(key)) || [];
    const saveToCache = (key, data) =>
      localStorage.setItem(key, JSON.stringify(data));

    const fetchProducts = async () => {
      const cachedProducts = loadFromCache("productsCache");
      if (cachedProducts.length) {
        products.value = cachedProducts;
      } else {
        await getCollectionQuery("products", [], (data) => {
          products.value = data;
          saveToCache("productsCache", data);
        });
      }
    };

    const fetchSubCategory = async () => {
      const cachedSubCategory = loadFromCache("subCategoryCache");
      if (cachedSubCategory.length) {
        subCategory.value = cachedSubCategory;
      } else {
        await getCollectionQuery("subcategories", [], (data) => {
          subCategory.value = data;
          saveToCache("subCategoryCache", data);
        });
      }
    };

    onMounted(async () => {
      await Promise.allSettled([fetchProducts(), fetchSubCategory()]);
    });
    console.log(products.value);
    return {
      route,
      products,
      subCategory,
    };
  },
};
</script>

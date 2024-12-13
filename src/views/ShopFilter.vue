<template>
  <div class="h-fit py-2">
    <div v-if="filteredMarkets.length > 0" class="mt-3">
      <div class="text-black text-14px font-bold flex items-center gap-3">
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
        <span>All Shop</span>
      </div>
    </div>
    <div
      v-if="filteredMarkets.length > 0"
      class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 mt-4 xl:w-fit lg:w-fit md:w-fit w-full"
    >
      <div
        v-for="market in filteredMarkets"
        @click.stop="$router.push(`/shopdetail/${market.id}`)"
        class="bg-white rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer animate-fade-up animate-duration-300 border"
      >
        <!-- Cover Image Section -->
        <div class="relative">
          <img
            :src="market.coverImageUrls[0]"
            :alt="market.name"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          ></div>
          <!-- Floating Profile Image -->
          <div
            class="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full overflow-hidden border-2 border-white shadow-lg"
          >
            <img
              :src="market.profileImageUrl"
              :alt="market.name"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Category Badge -->
          <div class="absolute top-4 right-4">
            <span
              class="bg-primary-7 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {{ market.Mart_category.name }}
            </span>
          </div>
          <div class="absolute bottom-4 right-4">
            <span
              class="bg-primary-1 text-primary-7 text-xs font-bold px-2 py-1 rounded-full"
            >
              {{ formatTime(market.openTime) }} -
              {{ formatTime(market.closeTime) }}
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-4">
          <h3
            class="xl:text-16px lg:text-16px md:text-16px text-16px font-semibold text-primary-7 mb-1"
          >
            {{ market.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">
            {{ market.Mart_Description }}
          </p>

          <!-- Location with Icon -->
          <div class="flex items-center text-gray-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 h-4 text-red-500 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="text-sm">{{ market.location }}</span>
          </div>

          <button
            @click.stop="router.push(`/shopdetail/${market.id}`)"
            class="xl:text-14px lg:text-14px md:text-14px text-14px font-semibold bg-primary-5 text-white xl:text-center lg:text-center md:text-center text-start py-1 px-4 rounded-full shadow-lg hover:bg-primary-6 transition duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-full">
      <EmptyShop />
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import EmptyShop from "@/Form/EmptyShop.vue";
export default {
  props: ["markets", "search_value"],
  components: {
    EmptyShop,
  },
  setup(props, { emit }) {
    const mainCategory = ref([]);
    const formatTime = (time) => {
      if (!time || !time.seconds) return "N/A";
      const date = new Date(time.seconds * 1000);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    const fetchMainCategory = async () => {
      await getCollectionQuery(
        "maincategory",
        [],
        (data) => {
          mainCategory.value = data;
        },
        true
      );
    };
    const filteredMarkets = computed(() => {
      if (!props.search_value || props.search_value.trim() === "") {
        return props.markets;
      }
      const searchTerm = props.search_value.toLowerCase();
      return props.markets.filter((market) => {
        return (
          market.name.toLowerCase().includes(searchTerm) ||
          market.location.toLowerCase().includes(searchTerm) ||
          (market.Mart_category?.name &&
            market.Mart_category.name.toLowerCase().includes(searchTerm))
        );
      });
    });

    const router = useRouter();
    console.log(props.markets);
    onMounted(async () => {
      if (props.markets) {
        console.log("markets", props.markets);
      }
      if (props.search_value) {
        console.log("search_value", props.search_value);
      }
    });
    return {
      router,
      mainCategory,
      formatTime,
      filteredMarkets,
    };
  },
};
</script>

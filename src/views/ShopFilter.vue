<template>
  <div class="h-fit py-2">
    <div>
      <!-- sort by category -->
      <div class="py-2">
        <div class="">
          <div
            class="flex overflow-x-auto pb-4 px-4 space-x-3 snap-x hide-scrollbar bg-none"
          >
            <!-- viwe all -->
            <button
              @click="selectedCategory = null"
              class="flex-shrink-0 snap-start focus:outline-none transition-all duration-300 ease-in-out border"
              :class="[
                selectedCategory === null
                  ? 'bg-primary-6 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-2 hover:text-primary-8',
                'px-4 py-2 rounded-full text-16px font-medium shadow-md hover:shadow-lg',
              ]"
            >
              All
            </button>
            <button
              v-for="category in mainCategory"
              :key="category.id"
              @click="selectedCategory = category.name"
              class="flex-shrink-0 snap-start focus:outline-none transition-all duration-300 ease-in-out border"
              :class="[
                selectedCategory === category
                  ? 'bg-primary-6 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-2 hover:text-primary-8',
                'px-4 py-2 rounded-full text-16px font-medium shadow-md hover:shadow-lg',
              ]"
            >
              {{ category.name }}
            </button>
          </div>
          <div
            class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary-1 to-transparent pointer-events-none"
          ></div>
          <div
            class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary-1 to-transparent pointer-events-none"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="filteredMarkets.length > 0" class="mt-3">
      <!-- filter by category -->
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
    const selectedCategory = ref(null);
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
      const searchTerm = props.search_value?.trim().toLowerCase() || "";
      const category = selectedCategory.value;

      return props.markets.filter((market) => {
        // Check if market matches the selected category
        const matchesCategory = category
          ? market.Mart_category?.name === category
          : true;

        // Check if market matches the search term
        const matchesSearch = searchTerm
          ? market.name.toLowerCase().includes(searchTerm) ||
            market.location.toLowerCase().includes(searchTerm) ||
            (market.Mart_category?.name &&
              market.Mart_category.name.toLowerCase().includes(searchTerm))
          : true;

        // Return true if both conditions are met
        return matchesCategory && matchesSearch;
      });
    });

    console.log(filteredMarkets.value);
    const router = useRouter();
    console.log(props.markets);
    onMounted(async () => {
      if (props.markets) {
        console.log("markets", props.markets);
      }
      if (props.search_value) {
        console.log("search_value", props.search_value);
      }
      await fetchMainCategory();
    });
    return {
      router,
      mainCategory,
      formatTime,
      filteredMarkets,
      selectedCategory,
    };
  },
};
</script>
<style scoped>
.hide-scrollbar {
  overflow: auto; /* Enables scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>

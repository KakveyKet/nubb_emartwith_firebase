<template>
  <div class="h-fit py-2">
    <div class="mt-3">
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
      class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 mt-4 xl:w-fit lg:w-fit md:w-fit w-full"
    >
      <div
        v-for="market in markets"
        :key="market.id"
        @click.stop="router.push(`/shopdetail/${market.id}`)"
        class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-gray-800 animate-fade-up animate-duration-300 border"
      >
        <!-- Cover Image Section -->
        <div class="relative w-full h-48 rounded-lg overflow-hidden">
          <img
            :src="market.coverImageUrls[0]"
            alt="Market Cover Image"
            class="w-full h-full object-cover"
          />
          <!-- Floating Profile Image -->
          <div
            class="absolute top-[60%] left-4 w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg"
          >
            <img
              :src="market.profileImageUrl"
              alt="Profile Image"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Card Content -->
        <div
          class="pt-12 pb-4 px-4 xl:text-center lg:text-center md:text-center text-start duration-300 transition-all"
        >
          <!-- Market Name -->
          <h3 class="text-xl font-semibold text-gray-900 truncate">
            {{ market.name }}
          </h3>
          <!-- Category & Description -->
          <p class="text-sm text-gray-500 mt-1">
            {{ market.Mart_category.name }}
          </p>
          <p class="text-gray-600 text-sm mt-2 truncate">
            {{ market.Mart_Description }}
          </p>
        </div>

        <div
          class="xl:flex lg:flex md:flex flex-col space-y-3 items-center justify-between px-4 pb-4 mt-auto"
        >
          <!-- Location with Icon -->
          <div
            class="xl:text-center lg:text-center md:text-center text-start flex items-center text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-5 h-5 text-red-500 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span
              class="xl:text-center lg:text-center md:text-center text-start text-sm"
              >{{ market.location }}</span
            >
          </div>

          <button
            @click.stop="router.push(`/shopdetail/${market.id}`)"
            class="xl:block lg:block md:block block bg-primary-5 text-white xl:text-center lg:text-center md:text-center text-start py-1 px-4 rounded-full shadow-lg hover:bg-primary-6 transition duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["markets"],
  setup(props, { emit }) {
    const router = useRouter();
    console.log(props.markets);
    onMounted(() => {
      if (props.markets) {
        console.log("markets", props.markets);
      }
    });
    return {
      router,
    };
  },
};
</script>

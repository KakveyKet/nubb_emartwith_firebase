<template>
  <div
    class="xl:w-[100%] lg:w-[100%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto mx-0 py-5"
  >
    <div class="py-2">
      <div>
        <div class="flex items-center gap-2">
          <font-awesome-icon
            class="text-primary-6"
            :icon="['fas', 'bowl-food']"
          />
          <span
            class="xl:text-16px lg:text-16px md:text-16px text-13px font-semibold text-primary-6"
          >
            View by category
          </span>
        </div>
      </div>
    </div>
    <div
      class="xl:flex lg:flex md:flex grid grid-cols-4 xl:gap-9 lg:gap-6 md:gap-3 gap-2"
    >
      <div v-for="category in data" class="mt-6" :key="data">
        <div
          class="xl:size-16 lg:size-14 md:size-14 size-14 overflow-hidden mx-auto animate-fade-left animate-duration-300 shadow p-1 shadow-primary-2"
        >
          <img
            class="size-full object-cover"
            :src="
              category.image_url
                ? category.image_url
                : require('../assets/image.png')
            "
            alt=""
          />
        </div>
        <h2
          class="text-center font-normal mt-2 xl:text-14px lg:text-14px md:text-14px text-13px"
        >
          {{ category.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  props: ["data"],
  setup(props, { emit }) {
    onMounted(() => {
      if (props.data) {
        console.log(props.data);
      }
    });
    return {};
  },
};
</script>

<style></style>

<template>
  <div class="w-[80%] mx-auto">
    <div class="py-2">
      <h2 class="font-bold text-black text-14px">Categories</h2>
    </div>
    <div
      class="xl:flex lg:flex md:flex grid grid-cols-3 xl:gap-9 lg:gap-6 md:gap-3 gap-2"
    >
      <div v-for="category in data" class="mt-6" :key="data">
        <div
          class="xl:size-[96px] lg:size-14 md:size-14 size-14 overflow-hidden mx-auto rounded-full border animate-fade-left animate-duration-300"
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
        <h2 class="text-center font-semibold mt-2">{{ category.name }}</h2>
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

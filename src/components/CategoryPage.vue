<template>
  <div
    :class="dynamicFont"
    class="xl:w-[100%] lg:w-[100%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto py-5"
  >
    <div class="py-2">
      <div>
        <div class="flex items-center gap-2">
          <font-awesome-icon
            class="text-primary-6"
            :icon="['fas', 'utensils']"
          />
          <span
            class="xl:text-16px lg:text-16px md:text-16px text-13px font-semibold text-slate-500"
          >
            {{ t("message.category") }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="xl:flex lg:flex md:flex grid grid-cols-5 xl:gap-9 lg:gap-6 md:gap-3 gap-2"
    >
      <div v-for="category in data" class="mt-6" :key="data">
        <div
          class="xl:size-12 lg:size-12 md:size-12 size-6 overflow-hidden mx-auto animate-fade-left animate-duration-300"
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
          class="text-center font-normal mt-1 xl:text-16px lg:text-16px md:text-16px text-13px text-slate-500"
        >
          {{ category.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

export default {
  props: ["data"],
  setup(props, { emit }) {
    onMounted(() => {
      if (props.data) {
        console.log(props.data);
      }
    });
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
    const handleChangeLangue = (lang) => {
      locale.value = lang;
    };
    const toggleTranslate = (event) => {
      if (translate.value) {
        translate.value.toggle(event);
      }
    };
    return {
      t,
      locale,
      dynamicFont,
      handleChangeLangue,
      toggleTranslate,
    };
  },
};
</script>

<style></style>

<template>
  <div class="flex flex-col items-center justify-center text-center h-screen">
    <div
      class="size-28 flex items-center justify-center rounded-full bg-primary-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 text-primary-9"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
        />
      </svg>
    </div>
    <p class="mt-6 text-primary-10 font-semibold text-20px">
      {{ t("message.no_history_today") }}
    </p>
    <p class="mt-2 text-primary-9 text-16px">
      {{ t("message.browse_our_products_and_add_items_to_your_cart") }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
export default {
  name: "EmptyHistoryComponent",
  setup() {
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

<style scoped>
/* Scoped styles if additional adjustments are needed */
</style>

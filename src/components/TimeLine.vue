<template>
  <div class="">
    <div class="w-full mt-4">
      <h2 class="text-16px font-semibold text-black">Activity</h2>
    </div>
    <div class="relative">
      <div
        class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-4"
      ></div>
      <div class="space-y-12">
        <div v-for="(event, index) in events" :key="index" class="relative">
          <div
            :class="`flex items-center ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            }`"
          >
            <div
              :class="`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`"
            >
              <div
                :class="[
                  'bg-white p-6 rounded-lg shadow-lg',
                  { 'opacity-50': !isActive(event.status) },
                ]"
              >
                <h2 class="text-20px font-semibold text-primary-8 mb-2">
                  {{ event.title }}
                </h2>
                <p class="text-16px text-primary-7">{{ event.description }}</p>
                <span class="text-13px text-primary-6">{{ event.date }}</span>
              </div>
            </div>
            <div
              class="absolute left-1/2 transform -translate-x-1/2 -translate-y-4"
            >
              <div
                class="w-8 h-8 bg-primary-5 rounded-full border-4 border-white flex items-center justify-center"
                :class="{ 'bg-green-500': isActive(event.status) }"
              >
                <span class="text-white text-13px font-bold">{{
                  index + 1
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const statuses = ["pending", "processed", "shipped", "delivered"];

    const isActive = (status) => {
      return statuses.indexOf(status) <= statuses.indexOf(props.currentStatus);
    };

    return {
      isActive,
    };
  },
};
</script>

<style scoped>
.opacity-50 {
  opacity: 0.5;
}
</style>

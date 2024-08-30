<template>
  <div class="bg-white p-5 rounded-[10px]">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Product Lists</h1>
      <DatePicker
        v-model="dates"
        placeholder="Filter By Date"
        selectionMode="range"
        :manualInput="false"
      />

      <div class="flex space-x-4">
        <input type="text" placeholder="Search by name" class="searchInput" />
        <button class="add_new_button">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2"
              />
            </svg>
            <span class="mr-2"> Add New</span>
          </div>
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="py-3 px-4 bg-grey-100 rounded-l-[10px] border-none">
              <div class="flex gap-2 items-center">
                <h2>No</h2>
                <div class="-space-y-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 1024 1344"
                  >
                    <path
                      fill="currentColor"
                      d="M1024 512q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 1024 1344"
                  >
                    <g transform="translate(0 1344) scale(1 -1)">
                      <path
                        fill="currentColor"
                        d="M1024 512q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </th>
            <th class="py-3 px-4 border-none">Product Name</th>
            <th class="py-3 px-4 border-none">Category</th>
            <th class="py-3 px-4 border-none">Date - Time</th>
            <th class="py-3 px-4 border-none">Qty</th>
            <th class="py-3 px-4 border-none">Price</th>
            <th class="py-3 px-4 bg-grey-100 rounded-r-[10px]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-3 px-4">01</td>
            <td class="py-3 px-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Product Image"
                class="w-10 h-10 rounded-full mr-4"
              />
              Sandwich
            </td>
            <td class="py-3 px-4">Fast Food</td>
            <td class="py-3 px-4">12.09.2024 - 12.53 PM</td>
            <td class="py-3 px-4">20</td>
            <td class="py-3 px-4">2000 riel</td>
            <td class="py-3 px-4">
              <span class="bg-green-500 text-white px-2 py-1 rounded-full">
                In Stock
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const dates = ref();

    return { dates };
  },
};
</script>

<style lang="scss" scoped></style>

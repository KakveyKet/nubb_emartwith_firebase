<template>
  <div class="bg-white p-5 rounded-[10px]">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Product Lists</h1>

      <div class="flex space-x-4">
        <div class="w-[330px] px-2 searchInput flex">
          <input
            type="text"
            placeholder="Search by name"
            class="w-full border-none outline-none"
          />
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-[#89868D]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
        <DatePicker
          v-model="dates"
          placeholder="Filter by created at"
          selectionMode="range"
          :manualInput="false"
          showIcon
          fluid
          :showOnFocus="false"
          show-button-bar
        />
        <button class="btn_filter">
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
      </div>
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
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="py-3 px-4 bg-grey-100 rounded-l-[10px] border-none">
              <div class="flex gap-3 items-center">
                <h2>No</h2>
                <div class="-space-y-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
                    viewBox="0 0 1024 1344"
                  >
                    <path
                      fill="currentColor"
                      d="M1024 512q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
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
            <th class="py-3 px-4 border-none">Created At</th>
            <th class="py-3 px-4 border-none">
              <div class="flex gap-3 items-center">
                <h2>Product Name</h2>
                <div class="-space-y-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
                    viewBox="0 0 1024 1344"
                  >
                    <path
                      fill="currentColor"
                      d="M1024 512q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
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
            <th class="py-3 px-4 border-none">Category</th>
            <th class="py-3 px-4 border-none">
              <div class="flex gap-3 items-center">
                <h2>Qty</h2>
                <div class="-space-y-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
                    viewBox="0 0 1024 1344"
                  >
                    <path
                      fill="currentColor"
                      d="M1024 512q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3"
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
            <th class="py-3 px-4 border-none">Price</th>
            <th class="py-3 px-4 bg-grey-100 rounded-r-[10px]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="data in items" :key="data.id">
            <td class="py-3 px-4">01</td>
            <td class="py-3 px-4">12.09.2024 - 12.53 PM</td>

            <td class="py-3 px-4 flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Product Image"
                class="w-10 h-10 rounded-full mr-4"
              />
              Sandwich
            </td>
            <td class="py-3 px-4">Fast Food</td>
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
    <!-- <ProductForm /> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import ProductForm from "./ProductForm.vue";
export default {
  components: { ProductForm },
  setup() {
    const dates = ref();
    const items = ref([]);
    const getData = async () => {
      try {
        await getCollectionQuery(
          "maincategory",
          [],
          (data) => {
            items.value = data;
          },
          true
        );
        console.log("data", items);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    onMounted(() => {
      getData();
    });
    return { dates, items };
  },
};
</script>

<style lang="scss" scoped></style>

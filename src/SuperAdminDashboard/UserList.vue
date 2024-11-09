<template>
  <div class="w-full">
    <div class="mt-3 bg-white p-4 rounded-lg w-full">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-20px font-semibold">User List</h2>
        <div class="flex items-center gap-2">
          <DatePicker
            v-model="currentDate"
            selectionMode="range"
            :manualInput="false"
            placeholder="Filter by date"
          />
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            filter
            optionLabel="name"
            placeholder="Filter by category"
          />
          <InputText v-model="searchTerm" placeholder="Search by name" />
          <Button
            icon="pi pi-filter"
            label="Filter"
            class="!bg-primary-6 !border-none"
          />
          <!-- <Button
            icon="pi pi-plus"
            label="Add Product"
            class="!bg-primary-6 !border-none"
            @click="handleVisible"
          /> -->
        </div>
      </div>
      <div class="mt-3">
        <DataTable
          v-if="items.length > 0"
          :value="items"
          paginator
          :rows="50"
          :rowsPerPageOptions="[50, 100, 200, 500]"
          tableStyle="min-width: 50rem"
          class="text-nowrap"
        >
          <Column field="id" header="ID" style="width: 20%">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column field="created_at" header="Created At" style="width: 20%">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column field="username" header="Name" style="width: 20%" />
          <Column field="email" header="Email" style="width: 20%" />
          <Column field="phone_number" header="Phone" style="width: 20%">
            <template #body="slotProps">
              {{
                slotProps.data.phoneNumber
                  ? slotProps.data.phoneNumber
                  : "No Number"
              }}
            </template>
          </Column>
          <Column field="role" header="Role" style="width: 20%" />
          <Column field="status" header="Status" style="width: 20%">
            <template #body="slotProps">
              <Tag class="badge" :class="slotProps.data.status">
                {{ slotProps.data.status === true ? " Inactive" : "Active" }}
              </Tag>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { formatDate } from "@/helper/formatCurrecy";
export default {
  setup() {
    const items = ref([]);
    const currentDate = ref(null);
    const selectedCategory = ref(null);
    const searchTerm = ref("");
    const fetchUser = async () => {
      await getCollectionQuery(
        "users",
        [],
        (data) => {
          items.value = data;
          console.log("items", items.value);
        },

        true
      );
    };
    onMounted(async () => {
      await Promise.allSettled([fetchUser()]);
    });
    return {
      items,
      currentDate,
      selectedCategory,
      searchTerm,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped></style>

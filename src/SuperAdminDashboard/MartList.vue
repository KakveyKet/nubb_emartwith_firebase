<template>
  <div class="w-full">
    <div class="mt-3 bg-white p-4 rounded-lg w-full">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-20px font-semibold">Mart List</h2>
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
        >
          <Column field="created_at" header="Created At" style="width: 20%">
            <template #body="slotProps">
              <h2 v-if="!slotProps.data.createdAt">
                <Skeleton shape="rectangle" size="2rem" />
              </h2>
              <h2 v-else>
                {{ formatDate(slotProps.data.createdAt) }}
              </h2>
            </template>
          </Column>

          <Column
            field="name"
            header="Product Name"
            style="width: 20%"
          ></Column>
          <Column style="width: 20%" header="Image">
            <template #body="slotProps">
              <Skeleton
                shape="circle"
                size="4rem"
                class="mr-2"
                v-if="
                  !slotProps.data.profileImageUrl ||
                  slotProps.data.profileImageUrl.length === 0
                "
              />
              <img
                v-else
                :src="
                  slotProps.data.profileImageUrl ||
                  'https://via.placeholder.com/40'
                "
                class="size-20 rounded object-cover"
              />
            </template>
          </Column>

          <Column field="status" header="Status" style="width: 20%">
            <template #body="slotProps">
              <Tag
                severity="success"
                v-if="slotProps.data.status !== undefined"
                :value="slotProps.data.status ? 'Active' : 'Inactive'"
              />
            </template>
          </Column>
          <Column field="action" header="Action" style="width: 20%">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  text
                  @click="handleEdit(slotProps.data)"
                />
                <Button
                  @click="handleDeleteDialog(slotProps.data.id, slotProps.data)"
                  icon="pi pi-trash"
                  severity="danger"
                  text
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <div v-else class="card flex justify-center py-5">
          <div class="flex flex-col items-center">
            <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="8"
              fill="transparent"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            />
            <p class="mt-2">Mart Loading...</p>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      :header="currentComponent === 'AddNewMartForm' ? 'Add Mart' : 'Edit Mart'"
      v-model:visible="currentComponent"
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <component
        @close="handleClose"
        @toast="showToast"
        :is="currentComponent"
        :dataToEdit="dataToEdit"
      />
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { formatDate } from "@/helper/formatCurrecy";
import AddNewMartForm from "@/SuperAdminForm/AddNewMartForm.vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
export default {
  components: {
    AddNewMartForm,
  },
  setup() {
    const items = ref([]);
    const currentDate = ref(null);
    const selectedCategory = ref(null);
    const searchTerm = ref("");
    const dataToEdit = ref(null);
    const toast = useToast();
    const showToast = (action, severity) => {
      let summary;
      switch (action) {
        case "create":
          severity = "success";
          summary = "Product Created";
          break;
        case "update":
          severity = "info";
          summary = "Product Updated";
          break;
        case "delete":
          summary = "Product Deleted";
          break;
        default:
          severity = "info";
          summary = "Action Completed";
      }

      toast.add({
        severity: severity,
        summary: summary,
        life: 3000,
      });
    };
    const currentComponent = ref(null);
    // const handleAddNewMart = () => {
    //   currentComponent.value = "AddNewMartForm";
    //   dataToEdit.value = null;
    // };
    const handleEdit = (data) => {
      dataToEdit.value = data;
      currentComponent.value = "AddNewMartForm";
    };
    const handleClose = () => {
      currentComponent.value = null;
      dataToEdit.value = null;
    };
    const fetchMart = async () => {
      await getCollectionQuery(
        "marts",
        [],
        (data) => {
          items.value = data;
        },
        true
      );
    };
    onMounted(async () => {
      await Promise.allSettled([fetchMart()]);
    });
    return {
      items,
      currentDate,
      selectedCategory,
      searchTerm,
      formatDate,
      handleEdit,
      currentComponent,
      dataToEdit,
      handleClose,
      showToast,
      toast,
    };
  },
};
</script>

<style lang="scss" scoped></style>

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
          <Button
            icon="pi pi-plus"
            label="Add Product"
            class="!bg-primary-6 !border-none"
            @click="handleAdd"
          />
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
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column field="name" header="Name" style="width: 20%" />
          <Column field="image_url" header="Image" style="width: 20%">
            <template #body="slotProps">
              <img
                :src="slotProps.data.image_url"
                alt="Image"
                class="size-32 object-cover rounded-lg"
              />
            </template>
          </Column>
          <!-- <Column field="email" header="Email" style="width: 20%" />
          <Column field="phone_number" header="Phone" style="width: 20%" />
          <Column field="role" header="Role" style="width: 20%" /> -->
          <Column field="status" header="Status" style="width: 20%">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.status === true ? 'Active' : 'Inactive'"
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
      </div>
      <Dialog
        :modal="true"
        header="Add Main Category"
        :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        v-model:visible="visible"
        closable
      >
        <component
          :is="currentComponent"
          :dataToEdit="dataToEdit"
          @close="handleClose"
          @toast="showToast"
        />
      </Dialog>
    </div>
    <Toast />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { formatDate } from "@/helper/formatCurrecy";
import MainCategoryForm from "@/SuperAdminForm/MainCategoryForm.vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
export default {
  components: {
    MainCategoryForm,
  },
  setup() {
    const items = ref([]);
    const currentDate = ref(null);
    const selectedCategory = ref(null);
    const searchTerm = ref("");
    const fetchUser = async () => {
      await getCollectionQuery(
        "maincategory",
        [],
        (data) => {
          items.value = data;
        },
        true
      );
    };
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
    const visible = ref(false);
    const currentComponent = ref(null);
    const handleAdd = () => {
      currentComponent.value = MainCategoryForm;
      visible.value = true;
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = "";
    };

    const dataToEdit = ref(null);
    const handleEdit = (data) => {
      dataToEdit.value = data;
      currentComponent.value = "MainCategoryForm";
      visible.value = true;
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
      visible,
      currentComponent,
      handleAdd,
      handleClose,
      handleEdit,
      dataToEdit,
      showToast,
    };
  },
};
</script>

<style lang="scss" scoped></style>

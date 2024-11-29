<template>
  <div class="w-full">
    <div class="mt-3 bg-white p-4 rounded-lg w-full">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-20px font-semibold">Product List</h2>
        <div class="flex items-center gap-2">
          <DatePicker
            v-model="currentDate"
            selectionMode="range"
            :manualInput="false"
            placeholder="Filter by date"
            show-button-bar
            style="width: 250px"
          />
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            filter
            optionLabel="name"
            placeholder="Filter by category"
            style="width: 250px"
            show-clear
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
            @click="handleVisible"
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
              <h2 v-if="!slotProps.data.created_at">
                <Skeleton shape="rectangle" size="2rem" />
              </h2>
              <h2 v-else>
                {{ formatDate(slotProps.data.created_at) }}
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
                  !slotProps.data.images || slotProps.data.images.length === 0
                "
              />
              <img
                v-else
                :src="
                  slotProps.data.images[0] || 'https://via.placeholder.com/40'
                "
                class="size-20 rounded object-cover"
              />
            </template>
          </Column>
          <Column field="stock" header="Qty" style="width: 20%">
            <template #body="slotProps">
              <h2 v-if="slotProps.data.stock === undefined">
                <Skeleton shape="rectangle" size="2rem" />
              </h2>
              <h2 v-else>
                {{ slotProps.data.stock }}
              </h2>
            </template>
          </Column>

          <Column field="price" header="Price" style="width: 20%">
            <template #body="slotProps">
              <h2 v-if="slotProps.data.price === undefined">
                <Skeleton shape="rectangle" size="2rem" />
              </h2>
              <h2 v-else>
                {{ formatNumberWithCommas(slotProps.data.price) }} ៛
              </h2>
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
            <p class="mt-2">Product Loading...</p>
          </div>
        </div>
      </div>
      <Dialog
        :header="
          currentComponent === 'ProductForm' ? 'Add Product' : 'Edit Product'
        "
        v-model:visible="visible"
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
      <DeleteDialog
        v-model:visible="deleteDialog"
        :deleteId="deleteId"
        :dataToDelete="dataToDelete"
        @delete="handleDelete"
        @toast="showToast"
      />
      <Toast />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import ProductForm from "@/Form/ProductForm.vue";
import { useToast } from "primevue/usetoast";
import DeleteDialog from "@/Form/DeleteDiaog.vue";
import useCollection from "@/composible/useCollection";
import { projectAuth } from "@/config/config";
import { where, Timestamp } from "firebase/firestore";

import {
  formatCurrency,
  formatNumber,
  formatDate,
  KhmerCurrency,
  formatNumberWithCommas,
} from "@/helper/formatCurrecy";

export default {
  components: {
    ProductForm,
    DeleteDialog,
  },
  setup() {
    const currentUser = ref(null);
    const selectedCategory = ref(null);
    const currentDate = ref(null);
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
    const marts = ref([]);
    const fetchMarts = async (field, value) => {
      if (currentUser?.value) {
        const conditions = [where(field, "==", value)]; // Dynamic condition based on the field and value provided

        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("data mart", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };

    const items = ref([]);
    const currentComponent = ref(null);
    const visible = ref(false);
    const handleVisible = () => {
      visible.value = true;
      currentComponent.value = "ProductForm";
      dataToEdit.value = null;
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = null;
    };
    const dataToEdit = ref(null);
    const handleEdit = (data) => {
      dataToEdit.value = data;
      visible.value = true;
      currentComponent.value = "ProductForm";
    };
    const searchTerm = ref("");

    const { removeDoc } = useCollection("products");
    const deleteDialog = ref(false);
    const deleteId = ref(null);
    const dataToDelete = ref(null);
    const handleDelete = async (id) => {
      await removeDoc(id);
      deleteDialog.value = false;
      deleteId.value = null;
      dataToDelete.value = null;
    };
    const handleDeleteDialog = (id, doc) => {
      deleteDialog.value = true;
      deleteId.value = id;
      dataToDelete.value = doc;
    };

    const fetchProducts = async () => {
      if (marts.value.length > 0) {
        const conditions = [where("branch_id", "==", marts.value[0].id)];

        // Add date range filter if currentDate is set
        if (currentDate.value && currentDate.value[0] && currentDate.value[1]) {
          conditions.push(
            where(
              "created_at",
              ">=",
              Timestamp.fromDate(new Date(currentDate.value[0]))
            ),
            where(
              "created_at",
              "<=",
              Timestamp.fromDate(new Date(currentDate.value[1]))
            )
          );
        }

        // Add category filter if selectedCategory is set
        if (selectedCategory.value) {
          conditions.push(where("category", "==", selectedCategory.value));
        }

        await getCollectionQuery(
          "products",
          conditions,
          (data) => {
            items.value = data;
            console.log("Fetched products:", items.value);
          },
          true, // Use snapshot for real-time updates
          "name", // Search field
          searchTerm.value // Search term
        );
      } else {
        console.error("Error: Marts data is empty.");
      }
    };
    watch(searchTerm, fetchProducts);
    watch([currentDate, selectedCategory], fetchProducts);

    const categories = ref([]);
    const fetchSubCategories = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];

        await getCollectionQuery("subcategories", conditions, (data) => {
          categories.value = data;
          console.log("data category", categories.value);
        });
      } else {
        console.error("Error fetching data: subcategories data is empty.");
      }
    };
    watch(
      marts,
      async (newMarts) => {
        if (newMarts.length > 0) {
          await fetchProducts();
          await fetchSubCategories("branch_id", newMarts[0].id);
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([
        fetchMarts("ownerId", currentUser.value.uid),
        // fetchSubCategories("branch_id", marts.value[0]?.id),
        // fetchProducts("branch_id", marts.value[0]?.id),
      ]);
      console.log("currentUser", currentUser.value);
      console.log("marts", marts.value[0]?.id);
      console.log("items", items.value);
      console.log("categories", categories.value.length);
    });

    return {
      items,
      currentComponent,
      visible,
      handleVisible,
      handleClose,
      showToast,
      formatCurrency,
      formatNumber,
      formatDate,
      KhmerCurrency,
      formatNumberWithCommas,
      handleEdit,
      dataToEdit,
      handleDelete,
      deleteDialog,
      deleteId,
      handleDeleteDialog,
      dataToDelete,
      searchTerm,
      categories,
      currentDate,
      selectedCategory,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>

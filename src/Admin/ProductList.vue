<template>
  <div class="w-full">
    <div class="mt-3 bg-white p-4 rounded-lg w-full">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-20px font-semibold">Product List</h2>
        <div class="flex items-center gap-2">
          <DatePicker type="daterange" placeholder="Filter by date" />
          <Dropdown :options="statusOptions" placeholder="Filter by category" />
          <InputText placeholder="Search" />
          <Button
            icon="pi pi-plus"
            label="Add Product"
            class="!bg-primary-6 !border-none"
            @click="handleVisible"
          />
        </div>
      </div>
      <!-- <img :src="items[0]?.images[0]" alt="" class="size-20 rounded" /> -->
      <div class="mt-3">
        <DataTable
          :value="items"
          paginator
          :rows="50"
          :rowsPerPageOptions="[50, 100, 200, 500]"
          tableStyle="min-width: 50rem"
        >
          <Column
            field="name"
            header="Product Name"
            style="width: 20%"
          ></Column>
          <Column style="width: 20%" header="Image">
            <template #body="slotProps">
              <img
                :src="
                  slotProps.data.images[0]
                    ? slotProps.data.images[0]
                    : 'https://via.placeholder.com/40'
                "
                class="size-20 rounded object-cover"
              />
            </template>
          </Column>
          <Column field="stock" header="Qty" style="width: 20%"></Column>
          <Column field="price" header="Price" style="width: 20%">
            <template #body="slotProps">
              {{ formatNumberWithCommas(slotProps.data.price) }} ៛
            </template>
          </Column>
          <Column field="status" header="Status" style="width: 20%">
            <template #body="slotProps">
              <Tag
                severity="success"
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
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import ProductForm from "@/Form/ProductForm.vue";
import { useToast } from "primevue/usetoast";
import DeleteDialog from "@/Form/DeleteDiaog.vue";
import useCollection from "@/composible/useCollection";
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  KhmerCurrency,
  formatNumberWithCommas,
} from "@/helper/formatCurrecy";
export default {
  components: {
    ProductForm,
    DeleteDialog,
  },
  setup() {
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
    const loadFromCache = (key) => JSON.parse(localStorage.getItem(key)) || [];

    const getData = async () => {
      await getCollectionQuery(
        "products",
        [],
        (data) => {
          items.value = data;
        },
        true
      );
    };
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
    onMounted(() => {
      getData();
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
      formatDateTime,
      KhmerCurrency,
      formatNumberWithCommas,
      handleEdit,
      dataToEdit,
      handleDelete,
      deleteDialog,
      deleteId,
      handleDeleteDialog,
      dataToDelete,
      showToast,
    };
  },
};
</script>

<style lang="scss" scoped></style>

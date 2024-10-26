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
      <div class="mt-3">
        <DataTable
          :value="items"
          paginator
          :rows="5"
          :rowsPerPageOptions="[1, 10, 20, 50]"
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
                class="size-20 rounded"
              />
            </template>
          </Column>
          <Column field="qty" header="Qty" style="width: 20%"></Column>
          <Column field="price" header="Price" style="width: 20%"></Column>
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
                <Button icon="pi pi-pencil" text />
                <Button icon="pi pi-trash" severity="danger" text />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog header="Add Product" v-model:visible="visible" :modal="true">
        <component
          @close="handleClose"
          @toast="showSuccess"
          :is="currentComponent"
        />
      </Dialog>
      <Toast />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import ProductForm from "@/Form/ProductForm.vue";
import { useToast } from "primevue/usetoast";
export default {
  components: {
    ProductForm,
  },
  setup() {
    const toast = useToast();

    const showSuccess = () => {
      toast.add({
        severity: "success",
        summary: "Product Created",

        life: 3000,
      });
    };

    const items = ref([]);
    const currentComponent = ref(null);
    const visible = ref(false);
    const handleVisible = () => {
      visible.value = true;
      currentComponent.value = "ProductForm";
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = null;
    };
    const getData = async () => {
      try {
        await getCollectionQuery(
          "products",
          [],
          (data) => {
            items.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
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
      showSuccess,
    };
  },
};
</script>

<style lang="scss" scoped></style>

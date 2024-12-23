<template>
  <div
    class="bg-white p-5 rounded-[10px] animate-fade-up animate-once animate-duration-300"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Category List</h1>

      <div class="flex space-x-4">
        <InputText
          v-model="searchTerm"
          clearButton="true"
          placeholder="Search by name"
        />
        <DatePicker
          v-model="currentDate"
          selectionMode="range"
          :manualInput="false"
          placeholder="Filter by date"
          showButtonBar
          showIcon
          fluid
        />
      </div>
      <button @click="handleAdd" class="add_new_button">
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
      <DataTable
        v-if="items.length > 0"
        :value="items"
        paginator
        :rows="50"
        :rowsPerPageOptions="[50, 100, 200, 500]"
        tableStyle="min-width: 50rem"
      >
        <Column field="name" header="Name"></Column>
        <Column field="image_url" header="Image">
          <template #body="slotProps">
            <img
              :src="
                slotProps.data.image_url
                  ? slotProps.data.image_url
                  : 'https://via.placeholder.com/150'
              "
              alt="Image"
              class="size-20 rounded object-cover"
            />
          </template>
        </Column>
        <Column field="created_at" header="Created At">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column field="status" header="Status">
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
          <!-- <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          /> -->
          <p class="mt-2">No Category Found</p>
        </div>
      </div>
    </div>

    <Dialog
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      v-model:visible="visible"
      modal
      header="Add New Category"
    >
      <component
        :is="currentComponent"
        :dataToEdit="dataToEdit"
        @toast="showToast"
        @close="handleClose"
      />
    </Dialog>
    <Toast />
    <!-- {{ marts }} , {{ items }} -->
  </div>
</template>

<script>
import SubCategoryForm from "@/Form/SubCategoryForm.vue";
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { getAuth } from "firebase/auth";
import { projectAuth } from "@/config/config";
import { where, Timestamp } from "firebase/firestore";
import { formatDate } from "@/helper/formatCurrecy";
import { useToast } from "primevue/usetoast";
export default {
  components: {
    SubCategoryForm,
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
    const dates = ref();
    const visible = ref(false);
    const currentUser = ref(null);
    const auth = getAuth(); // Get the Firebase auth instance
    const items = ref([]);
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

    const currentComponent = ref(null);
    const handleAdd = () => {
      visible.value = true;
      currentComponent.value = "SubCategoryForm";
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = "";
    };
    const currentDate = ref(null);
    const searchTerm = ref("");
    const fetchSubCategories = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];

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

        await getCollectionQuery(
          "subcategories",
          conditions,
          (data) => {
            items.value = data;
            console.log("data category", items.value);
          },
          true,
          "name",
          searchTerm.value
        );
      } else {
        console.error("Error fetching data: Marts data is empty.");
      }
    };

    watch(searchTerm, () => {
      fetchSubCategories("branch_id", marts.value[0].id);
    });
    watch(currentDate, () => {
      fetchSubCategories("branch_id", marts.value[0].id);
    });
    const dataToEdit = ref(null);
    const handleEdit = (data) => {
      dataToEdit.value = data;
      visible.value = true;
      currentComponent.value = "SubCategoryForm";
    };
    watch(
      marts,
      async (newMarts) => {
        if (newMarts.length > 0) {
          await fetchSubCategories("branch_id", newMarts[0].id);
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;

      await fetchMarts("ownerId", currentUser.value.uid);

      // Only fetch subcategories if marts were successfully fetched and marts.value is not empty
      if (marts.value.length > 0) {
        await fetchSubCategories("branch_id", marts.value[0].id);
      } else {
        console.error("Error: No marts available for the current user.");
      }
    });
    return {
      dates,
      items,
      visible,
      handleAdd,
      handleClose,
      currentComponent,
      marts,
      formatDate,
      searchTerm,
      currentDate,
      dataToEdit,
      handleEdit,
      showToast,
    };
  },
};
</script>

<style scoped></style>

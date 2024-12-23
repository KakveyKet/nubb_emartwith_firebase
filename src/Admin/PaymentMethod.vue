<template>
  <div
    class="bg-white p-5 rounded-[10px] animate-fade-up animate-once animate-duration-300"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Payment Method</h1>
      <div class="flex space-x-4">
        <div class="flex space-x-4">
          <!-- <InputText
            v-model="searchTerm"
            showClear
            placeholder="Search by name"
          /> -->
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
        <Column field="bank_name" header="Name"></Column>
        <Column field="kh_qr_payement_image" header="Kh QR Payement">
          <template #body="slotProps">
            <img
              :src="
                slotProps.data.kh_qr_payement_image
                  ? slotProps.data.kh_qr_payement_image
                  : 'https://via.placeholder.com/150'
              "
              alt="Image"
              class="w-24 h-40 rounded object-cover"
            />
          </template>
        </Column>
        <Column field="usd_qr_payement_image" header="Usd QR Payement">
          <template #body="slotProps">
            <img
              :src="
                slotProps.data.kh_qr_payement_image
                  ? slotProps.data.kh_qr_payement_image
                  : 'https://via.placeholder.com/150'
              "
              alt="Image"
              class="w-20 h-40 rounded object-cover"
            />
          </template>
          <Column field="usd_qr_payement_image" header="Image">
            <template #body="slotProps">
              <img
                :src="
                  slotProps.data.usd_qr_payement_image
                    ? slotProps.data.usd_qr_payement_image
                    : 'https://via.placeholder.com/150'
                "
                alt="Image"
                class="w-20 h-40 rounded object-cover"
              />
            </template>
          </Column>
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
          <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
          <p class="mt-2">Loading...</p>
        </div>
      </div>
    </div>

    <Dialog
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      v-model:visible="visible"
      modal
      header="Add New Payment Method"
    >
      <component
        :is="currentComponent"
        :dataToEdit="dataToEdit"
        @toast="showToast"
        @close="handleClose"
      />
    </Dialog>
    <DeleteDiaog
      :visible="visibleDeleteDialog"
      :dataToDelete="dataToDelete"
      :deleteId="deleteId"
      @close="handleCloseDeleteDialog"
      @delete="handleDelete"
      @toast="showToast"
    />
    <Toast />
  </div>
</template>

<script>
import PaymentMethodForm from "@/Form/PaymentMethodForm.vue";
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { getAuth } from "firebase/auth";
import { projectAuth } from "@/config/config";
import { where, Timestamp } from "firebase/firestore";
import { formatDate } from "@/helper/formatCurrecy";
import { useToast } from "primevue/usetoast";
import DeleteDiaog from "@/Form/DeleteDiaog.vue";
import useCollection from "@/composible/useCollection";
export default {
  components: {
    PaymentMethodForm,
    DeleteDiaog,
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
    const { removeDoc } = useCollection("payment_methods");
    const dates = ref();
    const visible = ref(false);
    const currentUser = ref(null);
    const auth = getAuth();
    const items = ref([]);
    const marts = ref([]);
    const visibleDeleteDialog = ref(false);
    const deleteId = ref(null);
    const deleteData = ref(null);
    const fetchMarts = async (field, value) => {
      if (currentUser?.value) {
        const conditions = [where(field, "==", value)];
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
      currentComponent.value = "PaymentMethodForm";
    };
    const handleClose = () => {
      visible.value = false;
      currentComponent.value = "";
    };
    const handleDeleteDialog = (id, data) => {
      deleteId.value = id;
      dataToDelete.value = data;
      visibleDeleteDialog.value = true;
    };
    const handleCloseDeleteDialog = () => {
      visibleDeleteDialog.value = false;
    };
    const dataToDelete = ref(null);

    const handleDelete = async (id) => {
      await removeDoc(id);
      visibleDeleteDialog.value = false;
      deleteId.value = null;
      dataToDelete.value = null;
    };
    const currentDate = ref(null);
    const searchTerm = ref("");
    const fetchPaymentMethod = async (field, value) => {
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
          "payment_methods",
          conditions,
          (data) => {
            items.value = data;
            console.log("data category", items.value);
          },
          true,
          "bank_name",
          searchTerm.value
        );
      } else {
        console.error("Error fetching data:  data is empty.");
      }
    };

    watch(searchTerm, () => {
      fetchPaymentMethod("name", searchTerm.value);
    });
    watch(currentDate, () => {
      fetchPaymentMethod("created_at", currentDate.value);
    });
    const dataToEdit = ref(null);
    const handleEdit = (data) => {
      dataToEdit.value = data;
      visible.value = true;
      currentComponent.value = "PaymentMethodForm";
    };
    watch(
      marts,
      async (newMarts) => {
        if (newMarts.length > 0) {
          await fetchPaymentMethod("branch_id", newMarts[0].id);
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;

      await fetchMarts("ownerId", currentUser.value.uid);

      // Only fetch subcategories if marts were successfully fetched and marts.value is not empty
      if (marts.value.length > 0) {
        await fetchPaymentMethod("branch_id", marts.value[0].id);
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
      handleDeleteDialog,
      visibleDeleteDialog,
      deleteId,
      deleteData,
      showToast,
      handleCloseDeleteDialog,
      handleDelete,
      dataToDelete,
    };
  },
};
</script>

<style scoped></style>

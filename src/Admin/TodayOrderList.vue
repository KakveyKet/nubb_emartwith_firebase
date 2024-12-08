<template>
  <div class="bg-white p-5 rounded-[10px]">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">To Day Order</h1>

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
        />
      </div>
      <!-- <button @click="handleAdd" class="add_new_button">
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
      </button> -->
    </div>
    <div class="overflow-x-auto">
      <DataTable
        v-if="orders.length > 0"
        :value="orders"
        paginator
        :rows="50"
        :rowsPerPageOptions="[50, 100, 200, 500]"
        tableStyle="min-width: 50rem"
      >
        <Column field="items" header="Product">
          <template #body="slotProps">
            <div v-for="item in slotProps.data.items" :key="item.id">
              {{ item.name }}
            </div>
          </template>
        </Column>
        <Column field="items" header="Image">
          <template #body="slotProps">
            <div class="flex space-x-2">
              <div v-for="item in slotProps.data.items" :key="item.id">
                <OverlayBadge :value="item.quantity">
                  <img
                    :src="
                      item.images[0]
                        ? item.images[0]
                        : 'https://via.placeholder.com/150'
                    "
                    alt="Image"
                    class="size-20 rounded object-cover"
                  />
                </OverlayBadge>
              </div>
            </div>
          </template>
        </Column>

        <Column field="instructions" header="Instructions">
          <template #body="slotProps">
            {{ slotProps.data.instructions }}
          </template>
        </Column>
        <Column field="total_price" class="text-nowrap" header="Total Price">
          <template #body="slotProps">
            {{ slotProps.data.total_price }} ៛
          </template>
        </Column>
        <Column field="user" header="Cusomter ">
          <template #body="slotProps">
            {{ slotProps.data.user[0].username }}
          </template>
        </Column>
        <Column field="user" header="Cusomter ">
          <template #body="slotProps">
            {{ slotProps.data.user[0].phoneNumber }}
          </template>
        </Column>
        <Column field="created_at" header="Location">
          <template #body="slotProps">
            {{ slotProps.data.location }}
          </template>
        </Column>
        <Column field="status" header="Status" style="width: 20%">
          <template #body="slotProps">
            <!-- <div class="flex gap-2">
              <span class="badge" :class="`badge-${slotProps.data.status}`">
                {{ slotProps.data.status }}
              </span>
            </div> -->
            <Button
              v-if="slotProps.data.status === 'pending'"
              label="Pending"
              icon="pi pi-clock"
              class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
              style="
                background-color: #fec53d;
                color: #000;
                width: 100px !important;
              "
            />
            <Button
              v-else-if="slotProps.data.status === 'accepted'"
              label="Accepted"
              icon="pi pi-check"
              class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
              style="
                background-color: #88bf68;
                color: #000;
                width: 100px !important;
              "
            />
          </template>
        </Column>
        <Column field="action" header="Action" style="width: 20%">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-check"
                class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
                @click="handleEdit(slotProps.data)"
              />
              <Button
                @click="handleDeleteDialog(slotProps.data.id, slotProps.data)"
                class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
                icon="pi pi-times"
                severity="danger"
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
          <p class="mt-2">Orders Loading...</p>
        </div>
      </div>
    </div>

    <Dialog
      :modal="true"
      :style="{ position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      v-model:visible="visible"
      modal
      header="Order Confimation"
    >
      <component
        :is="currentComponent"
        :dataToEdit="dataToEdit"
        @toast="showToast"
        @close="handleClose"
      />
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import OrderConfimation from "@/Form/OrderConfimation.vue";
import { getAuth } from "firebase/auth";
import { projectAuth } from "@/config/config";
import { where, Timestamp } from "firebase/firestore";
import { formatDate } from "@/helper/formatCurrecy";
import { useToast } from "primevue/usetoast";
export default {
  components: {
    OrderConfimation,
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
    const orders = ref([]);
    let unsubscribeOrders = null;
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
      currentComponent.value = "OrderConfimation";
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
    const fetchOrders = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];
        unsubscribeOrders = await getCollectionQuery(
          "orders",
          conditions,
          (data) => {
            orders.value = data;
            console.log("data orders", orders.value);
          },
          true,
          "created_at",
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
      currentComponent.value = "OrderConfimation";
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
      await fetchOrders("branch_id", marts.value[0].id);
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
      orders,
    };
  },
};
</script>

<style scoped></style>

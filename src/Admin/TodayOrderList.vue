<template>
  <div
    class="bg-white p-5 rounded-[10px] animate-fade-up animate-once animate-duration-300"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">To Day Order</h1>
      <div class="flex space-x-4">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="searchTerm" placeholder="Search" />
        </IconField>
      </div>
    </div>
    <div class="overflow-x-auto h-screen">
      <DataTable
        v-if="orders.length > 0"
        :value="orders"
        paginator
        :rows="50"
        :rowsPerPageOptions="[50, 100, 200, 500]"
        tableStyle="min-width: 50rem"
      >
        <Column field="items" header="Image">
          <template #body="slotProps">
            <div class="flex space-x-4">
              <div
                v-for="item in slotProps.data.items"
                :key="item.id"
                class="flex items-center justify-center relative"
              >
                <div class="size-32">
                  <OverlayBadge :value="item.quantity">
                    <img
                      :src="
                        item.images[0]
                          ? item.images[0]
                          : 'https://via.placeholder.com/150'
                      "
                      alt="Image"
                      class="size-32 rounded object-cover"
                    />
                  </OverlayBadge>
                </div>
                <span
                  class="text-nowrap left-1 text-13px absolute bottom-2 bg-primary-6 text-white px-2 py-1 rounded-md"
                  >{{ item.name }}</span
                >
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
        <Column class="text-nowrap" field="created_at" header="Location">
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
            <Button
              v-else-if="slotProps.data.status === 'rejected'"
              label="Rejected"
              icon="pi pi-times"
              class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
              style="
                background-color: #f44336;
                color: #000;
                width: 100px !important;
              "
            />
          </template>
        </Column>
        <Column field="action" header="Action" style="width: 20%">
          <template #body="slotProps">
            <div v-if="slotProps.data.status === 'pending'" class="flex gap-2">
              <Button
                icon="pi pi-check"
                class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
                @click="handleEdit(slotProps.data)"
              />
              <Button
                @click="handleRejectOrders(slotProps.data)"
                class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
                icon="pi pi-times"
                severity="danger"
              />
            </div>
            <div v-else class="flex gap-2">
              <Button
                icon="pi pi-info-circle
"
                class="!border-none !text-white !rounded-[10px] !text-13px !px-1.5 !py-1.5"
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
      :style="{ width: '30vw', position: 'absolute', top: '10vh' }"
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
    <Dialog
      :modal="true"
      :style="{ width: '30vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      v-model:visible="isReject"
      modal
      header="Are You Sure ?"
    >
      <HandleRejectOrder
        :dataToEdit="dataToEdit"
        @close="isReject = false"
        @toast="showToast"
      />
    </Dialog>

    <Toast />
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import OrderConfimation from "@/Form/OrderConfimation.vue";
import { getAuth } from "firebase/auth";
import { projectAuth } from "@/config/config";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { formatDate } from "@/helper/formatCurrecy";
import { useToast } from "primevue/usetoast";
import HandleRejectOrder from "@/Form/HandleRejectOrder.vue";
import moment from "moment-timezone";

export default {
  components: {
    OrderConfimation,
    HandleRejectOrder,
  },
  setup() {
    const playSound = () => {
      const audio = new Audio("/notification.mp3"); // Correct path without `/public`
      audio.play();
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
          break;
        case "new order":
          severity = "success";
          summary = "New Order";
          break;
        case "update":
          severity = "info";
          summary = "Order Updated";
          break;
        case "new order":
          severity = "success";
          summary = "New Order";
          break;
      }

      toast.add({
        severity: severity,
        summary: summary,
        life: 3000,
      });
    };
    const dates = ref();
    const dataToEdit = ref(null);

    const visible = ref(false);
    const currentUser = ref(null);
    const auth = getAuth();
    const items = ref([]);
    const marts = ref([]);
    const orders = ref([]);
    const isReject = ref(false);
    const handleRejectOrders = (data) => {
      isReject.value = true;
      dataToEdit.value = data;
      console.log("data", data);
    };
    let unsubscribeOrders = null;
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
    const notifiedOrderIds = ref([]);
    const fetchOrders = (field, value) => {
      const today = moment().tz("Asia/Phnom_Penh").startOf("day").toDate();
      const tomorrow = moment(today).add(1, "day").toDate();

      if (marts.value.length > 0) {
        const conditions = [
          where(field, "==", value),
          where("created_at", ">=", today),
          where("created_at", "<", tomorrow),
        ];

        // Real-time listener using onSnapshot (for Firestore)
        unsubscribeOrders = getCollectionQuery(
          "orders",
          conditions,
          (data) => {
            // Identify new orders
            const newOrders = data.filter(
              (newOrder) =>
                !orders.value.some((order) => order.id === newOrder.id)
            );

            if (newOrders.length > 0) {
              newOrders.forEach((order) => {
                if (
                  order.status === "pending" &&
                  !notifiedOrderIds.value.includes(order.id)
                ) {
                  showToast("new order", "success");
                  notifiedOrderIds.value.push();
                  playSound();
                }
              });

              orders.value = [...orders.value, ...newOrders];
            }

            console.log("Updated orders:", orders.value);
          },
          true
        );
      } else {
        console.error("Error fetching data: Marts data is empty.");
      }
    };
    const groupByItemName = computed(() => {
      return orders.value.reduce((acc, order) => {
        acc[order.items[0].name] = acc[order.items[0].name] || [];
        acc[order.items[0].name].push(order);
        return acc;
      }, {});
    });
    watch(searchTerm, () => {
      fetchSubCategories("branch_id", marts.value[0].id);
    });
    watch(currentDate, () => {
      fetchSubCategories("branch_id", marts.value[0].id);
    });
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
      handleRejectOrders,
      isReject,
      groupByItemName,
    };
  },
};
</script>

<style scoped></style>

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
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
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
          <p class="mt-2">No Order Today...</p>
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
import HandleRejectOrder from "@/Form/HandleRejectOrder.vue";
import { getAuth } from "firebase/auth";
import { projectAuth, projectFirestore } from "@/config/config";
import {
  where,
  Timestamp,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment-timezone";
import { useToast } from "primevue/usetoast";
import { formatDate } from "@/helper/formatCurrecy";

export default {
  components: {
    OrderConfimation,
    HandleRejectOrder,
  },
  setup() {
    const toast = useToast();
    const playSound = () => {
      const audio = new Audio("/notification.mp3");
      audio.play();
    };

    const showToast = (action, severity = "info") => {
      const messages = {
        create: { summary: "Product Created", severity: "success" },
        update: { summary: "Product Updated", severity: "info" },
        delete: { summary: "Product Deleted", severity: "warn" },
        "new order": { summary: "New Order", severity: "success" },
      };
      const { summary, severity: sev } = messages[action] || {
        summary: "Action Completed",
        severity,
      };
      toast.add({ severity: sev, summary, life: 3000 });
    };

    const marts = ref([]);
    const orders = ref([]);
    const items = ref([]);
    const visible = ref(false);
    const currentComponent = ref(null);
    const currentUser = ref(null);
    const currentDate = ref(null);
    const searchTerm = ref("");
    const isReject = ref(false);
    const dataToEdit = ref(null);
    const notifiedOrderIds = ref([]);
    let unsubscribeOrders = null;
    const handleEdit = (data) => {
      dataToEdit.value = data;
      visible.value = true;
      currentComponent.value = "OrderConfimation";
    };

    const fetchMarts = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("Fetched marts:", marts.value);
        });
      } catch (error) {
        console.error("Error fetching marts:", error);
      }
    };

    const fetchSubCategories = async (field, value) => {
      try {
        if (marts.value.length > 0) {
          const conditions = [where(field, "==", value)];
          if (currentDate.value?.[0] && currentDate.value?.[1]) {
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
              console.log("Fetched subcategories:", items.value);
            },
            true,
            "name",
            searchTerm.value
          );
        } else {
          console.error("No marts available for fetching subcategories.");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    const fetchOrders = (field, value) => {
      if (!projectFirestore) {
        console.error("Firestore instance is not initialized.");
        return;
      }

      const today = moment().tz("Asia/Phnom_Penh").startOf("day").toDate();
      const tomorrow = moment(today).add(1, "day").toDate();

      if (marts.value.length > 0) {
        const conditions = [
          where(field, "==", value),
          where("created_at", ">=", today),
          where("created_at", "<", tomorrow),
        ];

        const ordersQuery = query(
          collection(projectFirestore, "orders"),
          ...conditions
        );

        unsubscribeOrders = onSnapshot(
          ordersQuery,
          (snapshot) => {
            const newOrders = [];
            snapshot.docChanges().forEach((change) => {
              const orderData = { id: change.doc.id, ...change.doc.data() };
              if (change.type === "added") {
                newOrders.push(orderData);
                if (
                  orderData.status === "pending" &&
                  !notifiedOrderIds.value.includes(orderData.id)
                ) {
                  showToast("new order", "success");
                  playSound();
                  notifiedOrderIds.value.push(orderData.id);
                }
              } else if (change.type === "modified") {
                const index = orders.value.findIndex(
                  (order) => order.id === orderData.id
                );
                if (index !== -1) {
                  orders.value[index] = orderData;
                }
              } else if (change.type === "removed") {
                orders.value = orders.value.filter(
                  (order) => order.id !== orderData.id
                );
              }
            });

            orders.value = [...orders.value, ...newOrders];
            console.log("Updated orders:", orders.value);
          },
          (error) => {
            console.error("Error fetching orders:", error);
          }
        );
      } else {
        console.error("Error: Marts data is empty.");
      }
    };

    const handleAdd = () => {
      visible.value = true;
      currentComponent.value = "OrderConfimation";
    };

    const handleClose = async () => {
      console.log("Closing dialog...");
      visible.value = false;
      currentComponent.value = "";

      if (marts.value.length > 0) {
        console.log("Refetching data...");
        await fetchOrders("branch_id", marts.value[0].id);
        await fetchSubCategories("branch_id", marts.value[0].id);
        console.log("Data re-fetched after closing the dialog");
      } else {
        console.error("Error: No marts available for the current user.");
      }
    };

    const handleRejectOrders = (data) => {
      isReject.value = true;
      dataToEdit.value = data;
      console.log("Rejecting order:", data);
    };

    const groupByItemName = computed(() => {
      return orders.value.reduce((acc, order) => {
        acc[order.items[0].name] = acc[order.items[0].name] || [];
        acc[order.items[0].name].push(order);
        return acc;
      }, {});
    });

    watch(searchTerm, () => {
      fetchSubCategories("branch_id", marts.value[0]?.id);
    });

    watch(currentDate, () => {
      fetchSubCategories("branch_id", marts.value[0]?.id);
    });

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
      await fetchMarts("ownerId", currentUser.value?.uid);
      if (marts.value.length > 0) {
        await fetchOrders("branch_id", marts.value[0].id);
        await fetchSubCategories("branch_id", marts.value[0].id);
      } else {
        console.error("Error: No marts available for the current user.");
      }
    });

    return {
      visible,
      currentComponent,
      handleAdd,
      handleClose,
      marts,
      items,
      orders,
      currentDate,
      searchTerm,
      dataToEdit,
      isReject,
      groupByItemName,
      handleRejectOrders,
      showToast,
      formatDate,
      handleEdit,
    };
  },
};
</script>

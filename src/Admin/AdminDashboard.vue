<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Products -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div
          class="size-16 flex items-center justify-center bg-primary-3 rounded-full"
        >
          <i class="pi pi-box text-primary-7" style="font-size: 2rem"></i>
        </div>
        <div class="ml-4">
          <h3 class="text-20px font-semibold text-primary-8 mb-2">
            Total Products
          </h3>
          <p class="text-16px text-primary-7">
            Products: {{ products.length }} Instock
          </p>
        </div>
      </div>

      <!-- Total Category -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div
          class="size-16 flex items-center justify-center bg-primary-3 rounded-full"
        >
          <i class="pi pi-list text-primary-7" style="font-size: 2rem"></i>
        </div>
        <div class="ml-4">
          <h3 class="text-20px font-semibold text-primary-8 mb-2">
            Total Category
          </h3>
          <p class="text-16px text-primary-7">
            Category: {{ category.length }} In Shop
          </p>
        </div>
      </div>

      <!-- Today Order -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div
          class="size-16 flex items-center justify-center bg-primary-3 rounded-full"
        >
          <i
            class="pi pi-shopping-cart text-primary-7"
            style="font-size: 2rem"
          ></i>
        </div>
        <div class="ml-4">
          <h3 class="text-20px font-semibold text-primary-8 mb-2">
            Today Order
          </h3>
          <p class="text-16px text-primary-7">
            Orders: {{ todayOrder.length }} for today
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import useCollection from "@/composible/useCollection";
import { timestamp } from "@/config/config";
import { getCollectionQuery } from "@/composible/getCollection";
import useStorage from "@/composible/useStorage";
import { where } from "firebase/firestore";
import { projectAuth } from "@/config/config";
import { useToast } from "primevue/usetoast";
import { formatPhoneNumber } from "@/helper/formatCurrecy";
import moment from "moment-timezone";

export default {
  setup() {
    const products = ref([]);
    const category = ref([]);
    const todayOrder = ref([]);
    const paymetnMethod = ref([]);
    const currentUser = ref(null);
    const marts = ref([]);
    const fetchMarts = async () => {
      if (currentUser?.value) {
        const userId = currentUser.value?.uid; // Get current user's ID
        const conditions = [where("ownerId", "==", userId)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("mart data", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };
    // fetchCategory
    const fetchSubCategories = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "subcategories",
          conditions,
          (data) => {
            category.value = data;
            console.log("data category", category.value);
          },
          true
        );
      } else {
        console.error("Error fetching data: Marts data is empty.");
      }
    };
    const fetchProducts = async () => {
      if (marts.value.length > 0) {
        const conditions = [where("branch_id", "==", marts.value[0].id)];

        await getCollectionQuery(
          "products",
          conditions,
          (data) => {
            products.value = data;
            console.log("Fetched products:", products.value);
          },
          true // Use snapshot for real-time updates
        );
      } else {
        console.error("Error: Marts data is empty.");
      }
    };
    const fetchPaymentMethod = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];

        await getCollectionQuery(
          "payment_methods",
          conditions,
          (data) => {
            paymetnMethod.value = data;
            console.log("payment ", paymetnMethod.value);
          },
          true
        );
      } else {
        console.error("payment fails to fetch ");
      }
    };
    let unsubscribeOrders = null;

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
            todayOrder.value = data;

            console.log("Updated orders:", todayOrder.value);
          },
          true
        );
      } else {
        console.error("Error fetching data: Marts data is empty.");
      }
    };

    watch(
      marts,
      async (newMarts) => {
        if (newMarts.length > 0) {
          await fetchSubCategories("branch_id", marts.value[0]?.id);
          await fetchProducts("branch_id", marts.value[0]?.id);
          await fetchPaymentMethod("branch_id", marts.value[0]?.id);
          await fetchOrders("branch_id", marts.value[0].id);
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([
        fetchMarts("ownerId", currentUser.value.uid),
        fetchSubCategories("branch_id", marts.value[0]?.id),
        fetchProducts("branch_id", marts.value[0]?.id),
        fetchPaymentMethod("branch_id", marts.value[0]?.id),
        fetchOrders("branch_id", marts.value[0]?.id),
      ]);
      console.log("currentUser", currentUser.value);
      console.log("marts", marts.value[0]?.id);
    });
    return {
      todayOrder,
      products,
      category,
      paymetnMethod,
    };
  },
};
</script>

<style lang="scss" scoped></style>

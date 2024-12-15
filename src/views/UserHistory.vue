<template>
  <div
    class="xl:w-[100%] lg:w-[100%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto mx-0 py-5"
  >
    <div class="w-full">
      <h1
        class="text-24px font-semibold mb-6 text-primary-11 hidden-print"
        v-if="userHistory.length > 0"
      >
        Your Order History
      </h1>
      <div
        v-if="userHistory.length === 0"
        class="text-primary-8 text-center py-10 text-20px animate-fade-up animate-once animate-duration-2000 animate-delay-275"
      >
        No orders found. Time to treat yourself!
      </div>
    </div>
    <div
      class="xl:w-[70%] lg:w-[80%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto mx-0 grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 print-container"
    >
      <div
        v-for="order in userHistory"
        :key="order.id"
        :id="'invoice-' + order.id"
        class="bg-white border border-primary-3 rounded-lg p-6 mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-up animate-once animate-duration-300"
      >
        <!-- Branch -->
        <div class="flex flex-col items-center space-y-2 mb-4 font-medium">
          <img
            :src="formarBranchImage(order.branch_id)"
            alt="Branch Image"
            class="w-14 h-14 rounded-full"
          />
          <p class="text-16px text-slate-700">
            {{ formatBranchName(order.branch_id) }}
          </p>
        </div>
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-13px italic text-slate-500">
              Order #<span class="">{{ order.orderId }}</span>
            </p>
            <p class="text-13px text-slate-500 mt-1">
              
              <span
                class="font-medium capitalize px-2 py-1 text-primary-6 bg-primary-2 rounded-full"
                >{{ order.status }}</span
              >
            </p>
          </div>
          <div class="text-right">
            <p class="text-13px text-slate-500">
              Address: <span class="font-medium">{{ order.location }}</span>
            </p>
            <p class="text-17px font-semibold text-red-500 mt-1">
              {{ formatNumber(order.total_price) }} ៛
            </p>
          </div>
        </div>

        <!-- Items List -->
        <div class="border-t border-dashed pt-4">
          <h2 class="text-17px font-semibold mb-3 text-slate-700">
            Your Order
          </h2>
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center space-x-4 mb-3"
          >
            <img
              :src="item.images[0]"
              alt="Food Item"
              class="w-20 h-20 rounded-lg object-cover "
            />
            <div>
              <p class="font-medium text-16px text-slate-700">
                {{ item.name }}
              </p>
              <p class="text-13px text-slate-500">
                Quantity: {{ item.quantity }}
              </p>
              <p class="text-13px text-primary-8 font-medium">
                {{ formatNumber(item.price) }} ៛
              </p>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div v-if="order.instructions" class="mt-4 border-t border-dashed py-2">
          <p class="text-13px text-slate-500">
            <span class="font-medium text-slate-500">Special instructions: </span>
            {{ order.instructions }}
          </p>
        </div>

        <!-- Order Footer -->
        <div
          class="mt-4 text-13px text-slate-500 flex justify-between items-center"
        >
          <p>Ordered on: {{ formatDate(order.created_at) }}</p>
          <!-- print different invoice -->
          <div class="hidden-print">
            <Button
              icon="pi pi-bookmark"
              @click="handlePrint(order.id)"
              severity="primary"
              variant="text"
              raised
              rounded
              aria-label="Bookmark"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { where } from "@firebase/firestore";
import { formatDate, formatNumber } from "@/helper/formatCurrecy";
export default {
  props: ["currentUser"],
  setup(props) {
    const users = ref([]); // To store users data
    const userHistory = ref([]); // To store user order history

    const fetchUser = async (field, value) => {
      if (!value) {
        console.error("Invalid value for fetching user data");
        return;
      }
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "users",
          conditions,
          (data) => {
            users.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const branch = ref([]);
    const fetchBranch = async () => {
      await getCollectionQuery(
        "marts",
        [],
        (data) => {
          branch.value = data;
          console.log("items", branch.value);
        },
        true
      );
    };
    const formatBranchName = (id) => {
      const branchs = branch.value.find((item) => item.id === id);
      return branchs ? branchs.name : "N/A";
    };
    const formarBranchImage = (id) => {
      const branchs = branch.value.find((item) => item.id === id);
      return branchs ? branchs.profileImageUrl : "N/A";
    };

    const fetchUserHistory = async () => {
      try {
        const conditions = [where("userId", "==", users.value[0]?.id)];
        await getCollectionQuery(
          "orders_report",
          conditions,
          (data) => {
            userHistory.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    onMounted(async () => {
      if (props.currentUser?.uid) {
        await fetchUser("id", props.currentUser?.uid);
        await fetchBranch();
        await fetchUserHistory();
      }
    });

    watch(
      () => props.currentUser,
      async (newVal) => {
        if (newVal?.uid) {
          await fetchUser("id", newVal?.uid);
          if (users.value.length > 0) {
            await fetchUserHistory();
          }
        }
      },
      { immediate: true }
    );

    watch(users, () => {
      if (users.value.length > 0) {
        fetchUserHistory();
      }
    });
    const handlePrint = (orderId) => {
      const invoiceElement = document.getElementById(`invoice-${orderId}`);

      if (!invoiceElement) {
        console.error("Invoice element not found!");
        return;
      }

      // Hide all invoices
      const allInvoices = document.querySelectorAll(
        ".print-container .bg-white"
      ); // Adjust this selector if needed
      allInvoices.forEach((invoice) => {
        invoice.style.display = "none"; // Hide all invoices
      });

      // Show only the selected invoice
      invoiceElement.style.display = "block"; // Make the selected invoice visible

      // Trigger the print dialog for the selected invoice
      window.print();

      // Restore the visibility of all invoices after printing
      allInvoices.forEach((invoice) => {
        invoice.style.display = ""; // Restore visibility of all invoices
      });
    };

    return {
      userHistory,
      users,
      formatCurrency,
      formatDate,
      formatNumber,
      formatBranchName,
      formarBranchImage,
      handlePrint,
    };
  },
};
</script>

<style scoped>
.text-primary {
  color: #ff5722; /* Example primary color */
}
@media print {
  @page {
    size: A5; /* Set the page size to A5 */
  }


  /* Optional: Ensure content fits A5 */
  .print-container {
    width: 100mm; /* A5 width */
    height: 100mm; /* A5 height */
  }
}
</style

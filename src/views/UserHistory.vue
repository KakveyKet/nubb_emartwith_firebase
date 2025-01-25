<template>
  <div class="xl:w-[100%] lg:w-[100%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto mx-0 py-5">

    <div>
      <div class="xl:w-[80%] lg:w-[80%] md:w-[90%] w-full mx-auto flex items-center justify-between"> 
        <h1 class="text-24px font-semibold  text-primary-11 hidden-print" >
          {{t("message.your_histoy")}}
         </h1>
        <DatePicker
        v-model="currentDate"
        selectionMode="range"
        :manualInput="false"
        placeholder="filter by date"
        showButtonBar
        showIcon
        fluid
      />
      </div>
      <div v-if="userHistory.length > 0"
        class="xl:w-[80%] lg:w-[80%] md:w-[90%] w-full xl:mx-auto lg:mx-0 md:mx-auto mx-0 grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 print-container mt-4">
        <div v-for="order in userHistory" :key="order.id" :id="'invoice-' + order.id"
          class="bg-white border border-primary-3 rounded-lg p-6 mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-up animate-once animate-duration-300">
          <!-- Branch -->
          <div class="flex flex-col items-center space-y-2 mb-4 font-medium">
            <img :src="formarBranchImage(order.branch_id)" alt="Branch Image" class="w-14 h-14 rounded-full" />
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
  
                <span class="font-medium capitalize px-2 py-1 text-primary-6 bg-primary-2 rounded-full">{{ order.status
                  }}</span>
              </p>
            </div>
            <div class="text-right">
              <p class="text-13px text-slate-500">
                {{t("message.orderd_on")}}: <span class="font-medium">{{ order.location }}</span>
              </p>
              <p class="text-17px font-semibold text-red-500 mt-1">
                {{ formatNumber(order.total_price) }} ៛
              </p>
            </div>
          </div>
          
          <!-- Items List -->
          <div class="border-t border-dashed pt-4">
            <h2 class="text-17px font-semibold mb-3 text-slate-700">
             {{t("message.your_order")}}
            </h2>
            <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4 mb-3">
              <!-- <img :src="item.images[0]" alt="Food Item" class="w-20 h-20 rounded-lg object-cover " /> -->
              <div class="flex  items-end justify-between w-full space-x-2 border-b border-dashed pb-2">
                <p class="font-medium text-16px text-slate-700">
                  {{ item.name }}
                </p>
                <p class="text-13px text-slate-500">
                  Qty: {{ item.quantity }}
                </p>
                <p class="text-13px text-primary-8 font-medium">
                  {{ formatNumber(item.price) }} ៛
                </p>
              </div>
            </div>
          </div>
          <div v-if="order.instructions" class="mt-4 border-t border-dashed py-2">
            <p class="text-13px text-slate-500">
              <span class="font-medium text-slate-500">{{t("message.spacail_instruction_history")}}: </span>
              {{ order.instructions }}
            </p>
          </div>
          <div class="mt-4 text-13px text-slate-500 flex justify-between items-center">
            <p>{{t("message.orderd_on")}}: {{ formatDate(order.created_at) }}</p>
            <div class="hidden-print">
              <Button icon="pi pi-download" class="hidden-print" @click="handleDownload(order.id)" severity="primary" text
                aria-label="Bookmark" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <EmptyHistory v-if="userHistory.length === 0" />

    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch , computed} from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { where , Timestamp } from "@firebase/firestore";
import { formatDate, formatNumber } from "@/helper/formatCurrecy";
import html2canvas from "html2canvas";
import EmptyHistory from "@/Form/EmptyHistory.vue";
import jsPDF from "jspdf";
import { useI18n } from "vue-i18n";

export default {
  props: ["currentUser"],
  components: {
    EmptyHistory,
  },
  setup(props) {
    const users = ref([]); 
    const userHistory = ref([]); 

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
          "orders_report",
          conditions,
          (data) => {
            userHistory.value = data;
          },
          true,
          

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
    // default is this month
    const currentDate = ref([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ]);
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
    watch(currentDate, () => {
      if (currentDate.value && currentDate.value[0] && currentDate.value[1]) {
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

    const handleDownload = (orderId) => {
  const invoiceElement = document.getElementById(`invoice-${orderId}`);
  
  // Render the content without images
  html2canvas(invoiceElement, { 
    scale: 2, 
    useCORS: true, 
    backgroundColor: null // Optional: Set the background color to null for transparency
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [148, 210], // A5 size
    });

    // Add the canvas image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, 148, 210); // Fit content to A5 dimensions
    pdf.save(`invoice-${orderId}.pdf`);
  });
};

const { t, locale } = useI18n();
    const dynamicFont = computed(() => {
      switch (locale.value) {
        case "khm":
          return "font-NotoSerif";
        case "eng":
          return "font-Roboto";

        default:
          return "";
      }
    });
    const handleChangeLangue = (lang) => {
      locale.value = lang;
    };
    const toggleTranslate = (event) => {
      if (translate.value) {
        translate.value.toggle(event);
      }
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
      handleDownload,
      t
      ,dynamicFont,
      handleChangeLangue,
      toggleTranslate,
      currentDate
    };
  },
};
</script>

<style scoped>
.text-primary {
  color: #ff5722;
  /* Example primary color */
}

.invoice {
  font-size: 12px;
  /* Small font size */
  line-height: 1.2;
  /* Compact line spacing */
  width: 70mm;
  /* Match content width */
}

.invoice-header,
.invoice-footer {
  text-align: center;
  margin-bottom: 5px;
}

.invoice-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
</style

<template>
  <div
    class="bg-white p-5 rounded-[10px] animate-fade-up animate-once animate-duration-300"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Report List</h1>

      <div class="flex space-x-4">
        <DatePicker
          v-model="currentDate"
          selectionMode="range"
          :manualInput="false"
          placeholder="Filter by date"
          showButtonBar
          showIcon
          fluid
        />
        <Button
          label="Export to Excel"
          icon="pi pi-file-excel"
          class="p-button-success p-mr-2"
          @click="exportToExcel"
        />

        <!-- Print as PDF Button -->
        <Button
          label="Print as PDF"
          icon="pi pi-file-pdf"
          class="p-button-secondary"
          @click="printPDF"
        />
      </div>
    </div>
    <div class="overflow-x-auto">
      <DataTable
        v-if="report.length > 0"
        :value="report"
        paginator
        :rows="50"
        :rowsPerPageOptions="[50, 100, 200, 500]"
        tableStyle="min-width: 50rem"
      >
        <Column field="name" header="Item Name">
          <template #body="slotProps">
            {{ slotProps.data.items[0]?.name }}
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
              :value="
                slotProps.data.status === 'accepted' ? 'Accepted' : 'Pending'
              "
            />
          </template>
        </Column>

        <Column field="total_price" header="Total Price">
          <template #body="slotProps">
            {{ formatNumber(slotProps.data.total_price) }} ៛
          </template>
        </Column>

        <Column field="location" header="Location">
          <template #body="slotProps">
            {{ slotProps.data.location }}
          </template>
        </Column>
      </DataTable>

      <!-- Loading state -->
      <div v-else class="card flex justify-center py-5">
        <div class="flex flex-col items-center">
          <ProgressSpinner
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
          <p class="mt-2">Report Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { projectAuth } from "@/config/config";
import { where } from "firebase/firestore";
import { formatDate, formatNumber } from "@/helper/formatCurrecy";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Timestamp } from "firebase/firestore";

export default {
  setup() {
    const isLoading = ref(true);
    const currentUser = ref(null);
    const report = ref([]);
    const marts = ref([]);

    const fetchMarts = async (field, value) => {
      if (currentUser.value) {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };
    const currentDate = ref(null);

    const fetchReport = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];

        // Check if a date range is selected
        if (currentDate.value && currentDate.value[0] && currentDate.value[1]) {
          const startDate = Timestamp.fromDate(new Date(currentDate.value[0]));
          const endDate = Timestamp.fromDate(new Date(currentDate.value[1]));

          // Add date range conditions
          conditions.push(where("created_at", ">=", startDate));
          conditions.push(where("created_at", "<=", endDate));
        }

        // Fetch the report data using the conditions
        await getCollectionQuery("orders_report", conditions, (data) => {
          report.value = data;
        });
      } catch (error) {
        console.error("Error fetching report", error);
      } finally {
        isLoading.value = false;
      }
    };
    watch(currentDate, async () => {
      await fetchReport("branch_id", marts.value[0]?.id);
    });
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      if (currentUser.value) {
        await fetchMarts("ownerId", currentUser.value.uid);
        if (marts.value.length > 0) {
          await fetchReport("branch_id", marts.value[0]?.id);
        }
      }
    });

    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(report.value);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, "report.xlsx");
    };

    const printPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Report List", 14, 16);

      const columns = [
        "Item Name",
        "Created At",
        "Status",
        "Total Price",
        "Location",
      ];
      const rows = report.value.map((item) => [
        item.items[0]?.name,
        formatDate(item.created_at),
        item.status === "accepted" ? "Accepted" : "Pending",
        formatNumber(item.total_price) + " ៛",
        item.location,
      ]);

      doc.autoTable(columns, rows, { startY: 30 });
      doc.save("report.pdf");
    };

    return {
      report,
      marts,
      currentUser,
      isLoading,
      currentDate,
      formatDate,
      formatNumber,
      exportToExcel,
      printPDF,
    };
  },
};
</script>

<style lang="scss" scoped></style>

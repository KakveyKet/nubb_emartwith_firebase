<template>
  <div :class="orders.length > 0 ? 'p-5 w-full h-fit' : 'w-full h-screen'">
    <div
      v-if="orders.length > 0"
      class="xl:w-[50%] lg:w-[50%] md:w-[60%] w-full mx-auto"
    >
      <div class="">
        <div class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-3">
          <div
            v-for="order in orders"
            :key="order.id"
            class="w-full p-4 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] animate-fade-up animate-duration-300 space-y-3 h-auto"
          >
            <div class="flex mx-auto size-16 rounded-full overflow-hidden">
              <img
                class="w-full h-full object-cover"
                :src="formarBranchImage(order.branch_id)"
                alt=""
              />
            </div>
            <div class="w-full">
              <!-- branch name -->

              <div class="flex items-center justify-between mt-4">
                <p
                  class="xl:text-20px lg:text-20px md:text-20px text-16px text-slate-700 font-bold"
                >
                  {{ t("message.order_details") }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-13px text-gray-500">
                  {{ t("message.shop_name") }}
                </p>
                <p class="text-13px font-semibold text-primary-6">
                  {{ formatBranchName(order.branch_id) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-13px text-gray-500">
                  {{ t("message.order_date") }}
                </p>
                <p class="text-13px text-gray-500">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>

              <div class="w-full border-b border-t py-2 mt-4 space-y-2">
                <div
                  v-for="order_data in order.items"
                  class="flex items-center justify-between"
                >
                  <!-- img -->
                  <div class="w-[60px] h-[70px] rounded-md overflow-hidden">
                    <img
                      :src="order_data.images[0]"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <!-- name -->
                  <div class="w-fit">
                    <p class="text-13px text-slate-700" v-if="order.items">
                      {{ order_data.name }}
                    </p>
                  </div>
                  <!-- qty -->
                  <div class="w-fit">
                    <p class="text-13px text-slate-700" v-if="order.items">
                      {{ order_data.quantity }}
                    </p>
                  </div>
                  <!-- price -->
                  <div class="w-fit">
                    <p class="text-13px text-slate-700" v-if="order.items">
                      {{ formatNumber(order_data.price) }} ៛
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mt-4">
              <h2
                class="xl:text-20px lg:text-20px md:text-20px text-16px text-slate-700 font-bold"
              >
                {{ t("message.activity") }}
              </h2>
            </div>
            <div class="w-full mt-4 flex items-center justify-between">
              <h2 class="text-16px font-semibold text-slate-700">
                {{ t("message.order_status") }}
              </h2>
              <h2
                v-if="order.status === 'pending'"
                class="text-13px p-2 text-[#FEC53D] rounded-md animate-pulse animate-infinite animate-duration-[600ms]"
              >
                {{ t("message.pending") }}
                <span class=""> ... </span>
              </h2>
              <h2
                class="text-13px p-2 text-primary-6 rounded-md animate-fade-up animate-once animate-duration-[600ms]"
                v-if="order.status === 'accepted'"
              >
                {{ t("message.accepted") }}
              </h2>
              <h2
                class="text-13px p-2 text-red-500 rounded-md animate-fade-up animate-once animate-duration-[600ms]"
                v-else-if="order.status === 'rejected'"
              >
                {{ t("message.rejected") }}
              </h2>
            </div>
            <!-- time tracking delivery -->
            <div
              v-if="order.status === 'accepted'"
              class="w-full mt-4 flex items-center justify-between"
            >
              <h2 class="text-16px font-semibold text-slate-700">
                {{ t("message.time_delivery") }}
              </h2>
              <h2
                v-if="order.status === 'accepted'"
                class="text-13px p-2 text-[#FEC53D] rounded-md"
              >
                <span class="text-16px font-semibold text-primary-6">
                  {{ order.pending_time }} {{ t("message.minute") }}
                </span>
              </h2>
            </div>
            <!-- reject reason -->
            <div
              v-if="order.status === 'rejected'"
              class="w-full mt-4 flex items-center justify-between"
            >
              <h2 class="text-16px font-semibold text-slate-700">
                Reject Reason
              </h2>
              <p class="text-16px font-semibold text-primary-6">
                {{ order.reject_reason }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <EmptyOrder />
    </div>
  </div>
</template>

<script>
import EmptyOrder from "@/Form/EmptyOrder.vue";
import { where, doc, getDoc } from "firebase/firestore";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted, computed } from "vue";
import { formatDate } from "@/composible/formatDate";
import { formatNumber } from "@/helper/formatCurrecy";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";

export default {
  props: ["currentUser"],
  components: {
    EmptyOrder,
  },
  setup(props) {
    const orders = ref([]);
    // like inculde 001 then
    const splitInvoiceId = (id) => {
      // Extract the first 7 characters
      const prefix = id.slice(0, 7);

      const numberPart = `00${orders.value.length + 1}`;

      // Combine and return the result
      return `${numberPart}-${prefix}`;
    };
    const fetchOrders = async (field, value) => {
      try {
        if (props.currentUser) {
          const today = moment().tz("Asia/Phnom_Penh").startOf("day").toDate();
          const tomorrow = moment(today).add(1, "day").toDate();

          const conditions = [
            where("userId", "==", props.currentUser?.uid),
            where("created_at", ">=", today),
            where("created_at", "<", tomorrow),
          ];

          const unsubscribeOrders = await getCollectionQuery(
            "orders",
            conditions,
            (data) => {
              orders.value = data;
              console.log("Updated Orders:", orders.value);
            },
            true
          );

          return unsubscribeOrders;
        } else {
          console.error("Error fetching data: User data is empty.");
        }
      } catch (error) {
        console.log(error);
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
    onMounted(async () => {
      if (props.currentUser) {
        fetchOrders("userId", props.currentUser?.uid);
        await fetchBranch();
      }
    });
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
      orders,
      formatDate,
      formatBranchName,
      formarBranchImage,
      splitInvoiceId,
      formatNumber,
      t,
      handleChangeLangue,
      dynamicFont,
      toggleTranslate,
      getTotalSteps,
      getActiveStep,
    };
  },
};
</script>

<style lang="sass" scoped></style>

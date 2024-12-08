<template>
  <div class="p-5 w-full h-screen">
    <div v-if="orders.length > 0" class="w-[80%] mx-auto">
      <div
        class="w-full bg-white p-4 rounded-md shadow-md mt-4 animate-fade-up animate-duration-300 space-y-3 h-auto"
      >
        <div class="flex mx-auto w-[58px] overflow-hidden">
          <img src="../assets/nubb.png" alt="" />
        </div>
        <h1 class="text-17px font-semibold text-center">Tracking Order</h1>
        <div class="w-full mx-auto">
          <div v-for="order in orders" :key="order.id">
            <div class="w-full">
              <div class="flex items-center justify-between">
                <p class="text-16pxpx text-black">Order Details</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-13px text-gray-500">Order Date</p>
                <p class="text-13px text-gray-500">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-13px text-gray-500">Order ID</p>
                <p class="text-13px text-gray-500">{{ order.id }}</p>
              </div>
              <div class="w-full border-b border-t py-2 mt-4">
                <div class="flex items-center justify-between">
                  <!-- img -->
                  <div class="w-[60px] h-[70px] rounded-md overflow-hidden">
                    <img
                      :src="order.items[0].images[0]"
                      class="w-full h-full"
                    />
                  </div>
                  <!-- name -->
                  <div class="w-fit">
                    <p class="text-13px text-black" v-if="order.items">
                      {{ order.items[0].name }}
                    </p>
                  </div>
                  <!-- qty -->
                  <div class="w-fit">
                    <p class="text-13px text-black" v-if="order.items">
                      {{ order.items[0].quantity }}
                    </p>
                  </div>
                  <!-- price -->
                  <div class="w-fit">
                    <p class="text-13px text-black" v-if="order.items">
                      {{ order.items[0].price }} ៛
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mt-4">
              <h2 class="text-16px font-semibold text-black">Activity</h2>
            </div>
            <div class="w-full mt-4 flex items-center justify-between">
              <h2 class="text-16px font-semibold text-black">Order Status</h2>
              <h2
                v-if="order.status === 'pending'"
                class="text-13px p-2 text-[#FEC53D] rounded-md animate-pulse animate-infinite animate-duration-[600ms]"
              >
                Pending
                <span class=""> ... </span>
              </h2>
              <h2
                class="text-13px p-2 text-primary-5 rounded-md animate-fade-up animate-once animate-duration-[600ms]"
                v-else-if="order.status === 'accepted'"
              >
                Accepted
              </h2>
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
import { where } from "firebase/firestore";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted } from "vue";
import { formatDate } from "@/composible/formatDate";
export default {
  props: ["currentUser"],
  components: {
    EmptyOrder,
  },
  setup(props) {
    const orders = ref([]);
    const fetchOrders = async (field, value) => {
      try {
        if (props.currentUser) {
          const conditions = [where(field, "==", value)];
          const unsubscribeOrders = await getCollectionQuery(
            "orders",
            [where("userId", "==", props.currentUser?.uid)],
            (data) => {
              orders.value = data;
              console.log("Updated Orders:", orders.value);
            },
            true
          );
          return unsubscribeOrders;
        } else {
          console.error("Error fetching data: Marts data is empty.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      if (props.currentUser) {
        fetchOrders("userId", props.currentUser?.uid);
      }
    });
    return {
      orders,
      formatDate,
    };
  },
};
</script>

<style lang="sass" scoped></style>

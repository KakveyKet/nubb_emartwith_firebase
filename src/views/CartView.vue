<template>
  <div class="p-5 w-full">
    <div class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto">
      <div class="cart_container">
        <div>
          <div>
            <h2 class="text-17px font-semibold">Shopping Cart</h2>
          </div>
          <div class="flex gap-2 items-center mt-4">
            <i class="pi pi-shop"></i>
            <p>Je Pov 168 Shop</p>
          </div>
          <br />
          <!-- {{ cartAdded }} -->
          <div class="space-y-4">
            <div v-for="cart in cartAdded" class="cart_added">
              <div
                class="flex items-center w-full justify-between gap-4 animate-fade-up animate-duration-300"
              >
                <div class="size-20 rounded-md overflow-hidden">
                  <img class="object-cover" :src="cart.images[0]" alt="" />
                </div>
                <div>
                  <p
                    class="font-semibold text-black xl:text-16px lg:text-16px md:text-16px text-13px"
                  >
                    {{ cart.name }}
                  </p>
                  <div
                    class="flex items-center gap-3 xl:text-16px lg:text-16px md:text-16px text-13px text-nowrap"
                  >
                    <p>PRICE</p>
                    <span>{{ cart.price }} ៛</span>
                  </div>
                </div>
                <div>
                  <div class="border flex items-center rounded-md">
                    <button
                      class="size-8 rounded flex items-center justify-center bg-blue-500"
                    >
                      <i class="pi pi-minus text-white"></i>
                    </button>
                    <div class="size-8 flex items-center justify-center">
                      <p>{{ cart.quantity }}</p>
                    </div>
                    <button
                      class="size-8 rounded flex items-center justify-center bg-slate-200"
                    >
                      <i class="pi pi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="summary">
            <div>
              <p class="text-17px font-semibold">Summary</p>
            </div>
            <div class="space-y-1 mt-4">
              <h2>Subtotal</h2>
              <div
                class="flex space-x-4 xl:text-16px lg:text-16px md:text-16px text-13px"
              >
                <div v-for="item in groupedItems" :key="item.id">
                  <p>{{ item.name }} x {{ item.totalQuantity }}:</p>
                  <p>{{ item.totalPrice }}៛</p>
                </div>
              </div>
            </div>
            <div
              class="mt-2 flex flex-col space-y-2 xl:text-16px lg:text-16px md:text-16px text-13px"
            >
              <label for="Special"> Special Instructions (Optional) </label>
              <InputText
                id="Special"
                v-model="instructions"
                placeholder="Ex: I’m allergies to egg"
                style="width: 250px"
                class="h-9"
              />
            </div>

            <div
              class="mt-4 flex flex-col xl:text-16px lg:text-16px md:text-16px text-13px space-y-2"
            >
              <label for="Special">
                Delivery method <span class="text-red-500">*</span>
              </label>
              <span
                class="text-slate-400 xl:text-16px lg:text-16px md:text-16px text-13px"
                >Location
              </span>

              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="isArea"
                    inputId="pay_by_bank"
                    name="yourara"
                    value="yourarea"
                  />
                  <label for="pay_by_bank">Your Area</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="isArea"
                    inputId="local"
                    name="paymentMethod"
                    value="local"
                  />
                  <label for="local">Local Area</label>
                </div>
              </div>
              <InputText
                v-if="isArea === 'yourarea'"
                id="Special"
                v-model="location_selected"
                placeholder="Ex: room 114"
                style="width: 250px"
              />
              <Select
                v-else
                v-model="location_selected"
                :options="location"
                optionLabel="name"
                placeholder="Select a location"
                filter
                show-clear
                class="w-[250px]"
              />
            </div>
            <div
              class="mt-4 flex flex-col space-y-1 xl:text-16px lg:text-16px md:text-16px text-13px"
            >
              <label for="Special">
                Payment method <span class="text-red-500">*</span>
              </label>

              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="paymentMethod"
                    inputId="pay_by_bank"
                    name="paymentMethod"
                    value="bank"
                  />
                  <label for="pay_by_bank">Pay by Bank</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="paymentMethod"
                    inputId="pay_by_cash"
                    name="paymentMethod"
                    value="cash"
                  />
                  <label for="pay_by_cash">Pay by Cash</label>
                </div>
              </div>
            </div>
            <div class="w-[90%] mt-4 flex justify-between">
              <p>Total</p>
              <p>{{ totalPrice }} ៛</p>
            </div>
            <div
              class="
            "
            >
              <button class="btncheckout w-full mt-4">Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
import { projectAuth } from "@/config/config";
import { where } from "@firebase/firestore";
export default {
  setup() {
    const paymentMethod = ref("bank"); // Default selected value

    const currentUser = ref(null);
    const instructions = ref(null);
    const loctions = ref(null);
    const location_selected = ref(null);
    const isArea = ref("yourarea");
    const location = ref([
      {
        name: "មាត់ទឹក",
      },
      {
        name: "បណ្ណាល័យ",
      },
      {
        name: "តារាងបាល់",
      },

      {
        name: "មុខសាលាផ្លូវទី1",
      },
      {
        name: "មុខសាលាផ្លូវទី2",
      },

      {
        name: "កន្លែងចុះឈ្មោះសិស្ស",
      },
    ]);
    const cartAdded = ref([]);
    const fetchCartAdded = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "carts",
          conditions,
          (data) => {
            cartAdded.value = data;
            console.log("cartAdded", cartAdded.value);
          },
          true
        );
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    const totalPrice = computed(() => {
      return cartAdded.value.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    });

    const groupedItems = computed(() => {
      const grouped = {};
      cartAdded.value.forEach((item) => {
        if (!grouped[item.name]) {
          grouped[item.name] = {
            id: item.id,
            name: item.name,
            totalQuantity: 0,
            totalPrice: 0,
          };
        }
        grouped[item.name].totalQuantity += item.quantity;
        grouped[item.name].totalPrice += item.quantity * item.price;
      });
      return Object.values(grouped);
    });
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      fetchCartAdded("userId", currentUser.value?.uid);
    });

    return {
      cartAdded,
      paymentMethod,
      totalPrice,
      groupedItems,
      instructions,
      location,
      loctions,
      location_selected,
      isArea,
    };
  },
};
</script>

<style lang="sass" scoped></style>

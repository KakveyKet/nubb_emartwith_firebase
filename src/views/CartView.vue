<template>
  <div class="w-full h-screen p-5">
    <div class="w-[80%] mx-auto">
      <div class="w-full justify-between flex items-start">
        <div>
          <div>
            <h2 class="text-17px font-semibold">Shopping Cart</h2>
          </div>
          <div class="flex gap-2 items-center mt-4">
            <i class="pi pi-shop"></i>
            <p>Je Pov 168 Shop</p>
          </div>
          <br />
          <div class="space-y-4">
            <div
              v-for="cart in cartAdded"
              class="w-[400px] px-2 py-2 flex rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              <div class="flex items-center w-full justify-between gap-4">
                <div class="size-20 overflow-hidden">
                  <img class="object-cover" :src="cart.images[0]" alt="" />
                </div>
                <div>
                  <p class="font-semibold text-black text-16px">
                    {{ cart.name }}
                  </p>
                  <div class="flex items-center gap-3">
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
          <div
            class="bg-white w-[400px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-5 rounded-lg"
          >
            <div>
              <p class="text-17px font-semibold">Summary</p>
            </div>
            <div class="space-y-1 mt-4">
              <h2>Subtotal</h2>
              <div class="flex space-x-4">
                <p>Sandwich x4</p>
                <p>8000៛</p>
              </div>
            </div>
            <div class="mt-2 space-y-2">
              <label for="Special"> Special Instructions (Optional) </label>
              <InputText
                id="Special"
                placeholder="Ex: I’m allergies to egg"
                style="width: 250px"
              />
            </div>
            <div class="mt-2 flex flex-col space-y-1">
              <label for="Special">
                Delivery method <span class="text-red-500">*</span>
              </label>

              <span class="text-16px text-slate-400">Location</span>
              <InputText
                id="Special"
                placeholder="Ex: I’m allergies to egg"
                style="width: 250px"
              />
            </div>
            <div class="mt-2 flex flex-col space-y-1">
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
              <p>8000 ៛</p>
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
import { ref, onMounted } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
import { projectAuth } from "@/config/config";
import { where } from "@firebase/firestore";
export default {
  setup() {
    const cartAdded = ref([]);
    const paymentMethod = ref("bank"); // Default selected value

    const currentUser = ref(null);
    const fetchCartAdded = async (field, value) => {
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
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      fetchCartAdded("userId", currentUser.value?.uid);
    });

    return {
      cartAdded,
      paymentMethod,
    };
  },
};
</script>

<style lang="sass" scoped></style>

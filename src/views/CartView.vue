<template>
  <div class="p-5 w-full">
    <div
      v-if="cartAdded.length > 0"
      class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto"
    >
      <div class="cart_container">
        <div>
          <div>
            <h2 class="text-17px font-semibold">
              {{ t("message.shoping_cart") }}
            </h2>
          </div>
          <br />
          <div class="space-y-4">
            <div
              v-for="(item, branchId) in groupedByBranch"
              :key="branchId"
              class="space-y-3"
            >
              <div class="flex gap-2 items-center mt-4">
                <i class="pi pi-shop"></i>
                <p>{{ branchId }}</p>
              </div>

              <div
                v-for="cart in cartAdded"
                :key="cart.id"
                class="cart_added relative bg-white p-4 rounded-lg shadow-sm"
              >
                <!-- Remove Button -->
                <button
                  @click="handleRemoveCart(cart.id)"
                  class="absolute size-3 rounded-full flex items-center justify-center right-2 top-2 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 hover:text-red-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <!-- Cart Item Content -->
                <div
                  class="flex items-center w-full justify-between gap-4 animate-fade-up animate-duration-300"
                >
                  <!-- Product Image -->
                  <div
                    class="rounded-md overflow-hidden min-w-12 min-h-12 max-w-12 max-h-12"
                  >
                    <img
                      class="object-cover w-full h-full"
                      :src="cart.images[0]"
                      :alt="cart.name"
                    />
                  </div>

                  <!-- Product Details -->
                  <div class="mr-4">
                    <p
                      class="font-semibold text-black xl:text-16px lg:text-16px md:text-16px text-13px"
                    >
                      {{ cart.name }}
                    </p>
                    <div
                      class="flex items-center gap-3 xl:text-16px lg:text-16px md:text-16px text-13px text-nowrap"
                    >
                      <p>{{ t("message.price") }}</p>
                      <span>{{ formatNumber(cart.price) }} ៛</span>
                    </div>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="mr-8">
                    <div class="border flex items-center rounded-md">
                      <button
                        :disabled="cart.quantity <= 1"
                        @click="handleDecrementCart(cart.id, cart.quantity)"
                        class="xl:size-8 lg:size-7 md:size-6 size-5 rounded flex items-center justify-center bg-slate-200 text-black disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-primary-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <div
                        class="xl:size-8 lg:size-7 md:size-6 size-5 flex items-center justify-center text-13px text-primary-6 font-semibold"
                      >
                        <p
                          class="animate-flip-up animate-once animate-duration-300"
                        >
                          {{ cart.quantity }}
                        </p>
                      </div>
                      <button
                        @click="handleAddMoreCart(cart.id)"
                        class="xl:size-8 lg:size-7 md:size-6 size-5 rounded flex items-center justify-center bg-primary-6 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M12 5v14m-7-7h14"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="summary">
            <div>
              <p class="text-17px font-semibold">{{ t("message.summary") }}</p>
            </div>
            <div class="space-y-1 mt-4">
              <h2>
                {{ t("message.subtotal") }}
              </h2>
              <div
                class="flex space-x-4 xl:text-16px lg:text-16px md:text-16px text-13px"
              >
                <div v-for="item in groupedItems" :key="item.id">
                  <p>{{ item.name }} x {{ item.totalQuantity }}:</p>
                  <p>{{ formatNumber(item.totalPrice) }} ៛</p>
                </div>
              </div>
            </div>
            <div
              class="mt-2 flex flex-col space-y-2 xl:text-16px lg:text-16px md:text-16px text-13px"
            >
              <label for="Special"
                >{{ t("message.spacail_instruction") }}
              </label>
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
                {{ t("message.delivery_method") }}
                <span class="text-red-500">*</span>
              </label>
              <span
                class="text-slate-400 xl:text-16px lg:text-16px md:text-16px text-13px"
                >{{ t("message.location") }}
              </span>

              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="isArea"
                    inputId="pay_by_bank"
                    name="yourara"
                    value="yourarea"
                  />
                  <label for="pay_by_bank">{{ t("message.your_area") }}</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="isArea"
                    inputId="local"
                    name="paymentMethod"
                    value="local"
                  />
                  <label for="local">{{ t("message.local_area") }}</label>
                </div>
              </div>
              <div class="flex flex-col" v-if="isArea === 'yourarea'">
                <InputText
                  id="Special"
                  v-model="location_selected"
                  placeholder="Ex: room 114"
                  style="width: 250px"
                  class="h-9"
                />
                <span v-if="!isValidateLocation" class="text-red-500">
                  {{ t("message.please_enter_loaction") }}
                </span>
              </div>
              <div class="flex flex-col" v-else>
                <Select
                  v-model="location_selected"
                  :options="location"
                  optionLabel="name"
                  option-value="name"
                  placeholder="Select a location"
                  filter
                  show-clear
                  class="w-[250px]"
                />
                <span v-if="!isValidateLocation" class="text-red-500">
                  Please select or enter your locations
                </span>
              </div>
            </div>
            <div
              class="mt-4 flex flex-col space-y-1 xl:text-16px lg:text-16px md:text-16px text-13px"
            >
              <label for="Special">
                {{ t("message.payment_method") }}
                <span class="text-red-500">*</span>
              </label>

              <div class="flex flex-wrap gap-4">
                <!-- <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="paymentMethod"
                    inputId="pay_by_bank"
                    name="paymentMethod"
                    value="bank"
                  />
                  <label for="pay_by_bank">Pay by Bank</label>
                </div> -->
                <div class="flex items-center gap-2">
                  <RadioButton
                    v-model="paymentMethod"
                    inputId="pay_by_cash"
                    name="paymentMethod"
                    value="cash"
                  />
                  <label for="pay_by_cash">
                    {{ t("message.pay_by_cash") }}
                  </label>
                </div>
              </div>
              <!-- when payment method is bank -->
            </div>

            <div class="w-[90%] mt-4 flex justify-between">
              <p
                class="xl:text-16px lg:text-16px md:text-16px text-16px text-primary-6 font-semibold"
              >
                {{ t("message.total") }}
              </p>
              <p class="xl:text-16px lg:text-16px md:text-16px text-13px">
                {{ formatNumber(totalPrice) }} ៛
              </p>
            </div>
            <div
              class="
            "
            >
              <button @click="handleCheckout" class="btncheckout w-full mt-4">
                {{ t("message.checkout") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto">
      <EmptyCart />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
import { projectAuth } from "@/config/config";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { where } from "@firebase/firestore";
import { timestamp } from "@/config/config";
import EmptyCart from "@/Form/EmptyCart.vue";
import { writeBatch, getDocs, query, collection } from "firebase/firestore";
import { projectFirestore } from "@/config/config";
import { formatNumber } from "@/helper/formatCurrecy";
import { useI18n } from "vue-i18n";

export default {
  components: {
    EmptyCart,
  },
  setup() {
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
    const paymentMethod = ref("cash"); // Default selected value
    const auth = getAuth();
    const users = ref([]);
    const currentUser = ref(null);
    const instructions = ref(null);
    const locations = ref(null);
    const location_selected = ref(null);
    const isArea = ref("yourarea");
    const location = ref([
      {
        name: "ស្រះទឹក",
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

    const markets = ref([]);
    const fetchMarket = async () => {
      await getCollectionQuery(
        "marts",
        [],
        (data) => {
          markets.value = data;
        },
        true
      );
    };

    const groupedByBranch = computed(() => {
      const grouped = {};
      const branchMap = Object.fromEntries(
        markets.value.map((market) => [market.id, market.name])
      );

      cartAdded.value.forEach((item) => {
        const branchName = branchMap[item.branch_id] || "Unknown Branch";
        if (!grouped[branchName]) {
          grouped[branchName] = [];
        }
        grouped[branchName].push(item);
      });

      return grouped;
    });
    const groupedByBranchID = computed(() => {
      const grouped = {};

      // Create a mapping of branch IDs to their corresponding names or other data
      const branchMap = Object.fromEntries(
        markets.value.map((market) => [market.id, market])
      );

      cartAdded.value.forEach((item) => {
        // Use the branch ID from the branchMap or default to "Unknown Branch"
        const branchId = branchMap[item.branch_id]?.id || "Unknown Branch";
        if (!grouped[branchId]) {
          grouped[branchId] = [];
        }
        grouped[branchId].push(item);
      });

      return grouped;
    });
    const paymentMethods = ref([]);

    const { addDocs, removeDoc, updateDocs } = useCollection("carts");
    const { addDocs: addOrder } = useCollection("orders");
    const clearCartForUser = async (userId) => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(projectFirestore, "carts"),
            where("userId", "==", userId)
          )
        );
        const batch = writeBatch(projectFirestore);

        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`Cart cleared for user: ${userId}`);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };
    // click to update the quantity of the cart
    const handleAddMoreCart = async (id) => {
      try {
        const cartItem = cartAdded.value.find((item) => item.id === id);
        if (cartItem) {
          const newQuantity = cartItem.quantity + 1; // Increment quantity by 1
          await updateDocs(id, { quantity: newQuantity });
          console.log(
            `Updated cart item ${id} with new quantity: ${newQuantity}`
          );
        } else {
          console.error("Cart item not found");
        }
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    };
    const handleRemoveCart = async (id) => {
      try {
        // Remove the cart item from Firestore
        await removeDoc(id);

        // Update the local cartAdded array to reflect the change
        cartAdded.value = cartAdded.value.filter((item) => item.id !== id);

        console.log(`Cart item ${id} removed successfully`);
        fetchCartAdded("userId", currentUser.value?.uid);
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    };
    const handleDecrementCart = async (id, currentQty) => {
      try {
        // Update the quantity in Firestore
        await updateDocs(id, {
          quantity: currentQty - 1,
        });

        // Update the local cartAdded array to reflect the change
        const updatedCart = cartAdded.value.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        cartAdded.value = updatedCart;

        console.log(`Decremented quantity for cart item ${id}`);
        fetchCartAdded("userId", currentUser.value?.uid);
      } catch (error) {
        console.error("Error decrementing cart item quantity:", error);
      }
    };

    const isValidateLocation = ref(true);
    watch(location_selected, (newValue) => {
      isValidateLocation.value = !!newValue; // Valid if not empty
    });
    const handleCheckout = async () => {
      if (!location_selected.value) {
        isValidateLocation.value = false;
        return;
      }
      try {
        for (const [branchId, items] of Object.entries(
          groupedByBranchID.value
        )) {
          const orderData = {
            branch_id: branchId,
            user: users.value,
            status: "pending",
            items: cartAdded.value,
            instructions: instructions.value,
            location: location_selected.value,
            paymentMethod: paymentMethod.value,
            created_at: timestamp(),
            total_price: totalPrice.value,
            userId: users.value[0].id,
            pending_time: 0,
            reject_reason: "",
          };

          console.log("Order data to save:", orderData);

          await addOrder(orderData);
          if (addDocs) {
            await clearCartForUser(users.value[0].id);
          }
        }
        console.log("All orders added successfully");
      } catch (error) {
        console.error("Error saving orders:", error);
      }
    };

    const fetchUser = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "users",
          conditions,
          (data) => {
            users.value = data;
            console.log("items", users.value);
          },
          true
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
      await Promise.allSettled([
        fetchMarket(),
        fetchCartAdded("userId", currentUser.value?.uid),
        fetchUser("id", currentUser.value?.uid),
      ]);
    });

    return {
      cartAdded,
      paymentMethod,
      paymentMethods,
      totalPrice,
      groupedItems,
      instructions,
      locations,
      location_selected,
      isArea,
      groupedByBranch,
      location,
      handleCheckout,
      handleRemoveCart,
      groupedByBranchID,
      handleAddMoreCart,
      handleDecrementCart,
      formatNumber,
      t,
      isValidateLocation,
    };
  },
};
</script>

<style lang="sass" scoped></style>

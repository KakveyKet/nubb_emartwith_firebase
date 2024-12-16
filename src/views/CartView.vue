<template>
  <div class="p-5 w-full">
    <div
      v-if="cartAdded.length > 0"
      class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto"
    >
      <div class="cart_container">
        <div>
          <div>
            <h2 class="text-17px font-semibold">Shopping Cart</h2>
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

              <div v-for="cart in item" class="cart_added relative">
                <div
                  @click="handleRemoveCart(cart.id)"
                  class="absolute size-3 rounded-full flex items-center justify-center right-2 top-2"
                >
                  <i
                    class="pi pi-times hover:cursor-pointer hover:text-red-500"
                  ></i>
                </div>
                <div
                  class="flex items-center w-full justify-between gap-4 animate-fade-up animate-duration-300"
                >
                  <div class="size-20 rounded-md overflow-hidden">
                    <img class="object-cover" :src="cart.images[0]" alt="" />
                  </div>
                  <div class="mr-4">
                    <p
                      class="font-semibold text-black xl:text-16px lg:text-16px md:text-16px text-13px"
                    >
                      {{ cart.name }}
                    </p>
                    <div
                      class="flex items-center gap-3 xl:text-16px lg:text-16px md:text-16px text-13px text-nowrap"
                    >
                      <p>PRICE</p>
                      <span>{{ formatNumber(cart.price) }} ៛</span>
                    </div>
                  </div>
                  <div class="mr-8">
                    <div class="border flex items-center rounded-md">
                      <button
                        :disabled="cart.quantity <= 1"
                        @click="handleDecrementCart(cart.id, cart.quantity)"
                        class="size-8 rounded flex items-center justify-center bg-slate-200 text-black"
                      >
                        <i class="pi pi-minus text-primary-6"></i>
                      </button>
                      <div
                        class="size-8 flex items-center justify-center text-13px text-primary-6 font-semibold"
                      >
                        <p
                          class="animate-flip-up animate-once animate-duration-300"
                        >
                          {{ cart.quantity }}
                        </p>
                      </div>
                      <button
                        @click="handleAddMoreCart(cart.id)"
                        class="size-8 rounded flex items-center justify-center bg-primary-6 text-white"
                      >
                        <i class="pi pi-plus"></i>
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
              <p class="text-17px font-semibold">Summary</p>
            </div>
            <div class="space-y-1 mt-4">
              <h2>Subtotal</h2>
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
                class="h-9"
              />
              <Select
                v-else
                v-model="location_selected"
                :options="location"
                optionLabel="name"
                option-value="name"
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
                  <label for="pay_by_cash">Pay by Cash</label>
                </div>
              </div>
              <!-- when payment method is bank -->
            </div>

            <div class="w-[90%] mt-4 flex justify-between">
              <p
                class="xl:text-16px lg:text-16px md:text-16px text-16px text-primary-6 font-semibold"
              >
                Total
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
                Check Out
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
export default {
  components: {
    EmptyCart,
  },
  setup() {
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

    const handleCheckout = async () => {
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
    };
  },
};
</script>

<style lang="sass" scoped></style>

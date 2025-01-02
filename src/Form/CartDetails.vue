<template>
  <div>
    <!-- product details -->
    <div class="max-w-4xl mx-auto p-4">
      <div v-if="product_detail" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Image Gallery Section -->
        <div class="space-y-4">
          <div class="border rounded-lg overflow-hidden bg-white">
            <img
              :src="selectedImage || product_detail.images[0]"
              :alt="product_detail.name"
              class="max-h-40 min-h-[40] max-w-[40] object-cover"
            />
          </div>
          <div class="flex gap-3">
            <div
              v-for="(image, index) in product_detail.images"
              :key="index"
              @click="selectedImage = image"
              class="cursor-pointer border rounded-lg overflow-hidden w-20 h-20 hover:border-primary-6"
            >
              <img
                :src="image"
                :alt="`${product_detail.name} thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Product Details Section -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h1 class="text-24px font-semibold">{{ product_detail.name }}</h1>
            <div class="flex items-center gap-1">
              <span class="text-yellow-400">★★★★</span>
              <span class="text-13px text-gray-500">{{
                product_detail.rate
              }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <!-- Shop Info -->
            <div class="flex items-center gap-2">
              <span class="text-16px text-gray-600">{{
                product_detail.category.name
              }}</span>
            </div>

            <!-- Price -->
            <div class="flex items-center gap-2">
              <span class="text-20px font-bold text-primary-8">
                {{
                  new Intl.NumberFormat("en-US").format(product_detail.price)
                }}
                ៛
              </span>
            </div>

            <!-- Description -->
            <p class="text-16px text-gray-600">
              {{ product_detail.description }}
            </p>
            <!-- Quantity Selector -->
            <div
              class="flex items-center gap-4 animate-fade-up animate-once animate-duration-300"
              v-if="cartItem?.quantity > 0"
            >
              <span class="text-16px">QTY</span>
              <div class="flex items-center border rounded-md">
                <button
                  @click="handleDecrementCart(cartItem)"
                  class="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span class="px-4 py-2 border-x">{{ cartItem?.quantity }}</span>
                <button
                  @click="handleAddMoreCart(cartItem)"
                  class="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <button
                @click="
                  cartItem?.quantity === 1
                    ? clearQty(cartItem)
                    : handleAddToCart(product_detail)
                "
                class="flex-1 bg-primary-6 hover:bg-primary-7 text-white py-3 rounded-lg text-17px transition-colors"
              >
                {{ cartItem?.quantity > 0 ? "Clear Cart" : "Add to cart" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
import { timestamp } from "@/config/config";
import { where } from "@firebase/firestore";
import { Notivue, Notification, push } from "notivue";

export default {
  props: ["product_detail", "product_related", "currentUser"],
  components: {
    Notivue,
    Notification,
  },
  setup(props, { emit }) {
    let subscription = ref(null);
    const cartItem = computed(() =>
      cartAdded.value.find(
        (item) => item.product_id === props.product_detail?.id
      )
    );
    const { addDocs, updateDocs, removeDoc } = useCollection("carts");

    const cartAdded = ref([]);
    const fetchCartAdded = async (field1, value1, field2, value2) => {
      try {
        const conditions = [
          where(field1, "==", value1),
          where(field2, "==", value2),
        ];
        subscription.value = await getCollectionQuery(
          "carts",
          conditions,
          (data) => {
            cartAdded.value = data;
            console.log("cartAdded", cartAdded.value);
          },
          true
        );
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    // Use the getCollectionQuery function to fetch the data from the Firestore.

    const handleAddToCart = async (data) => {
      try {
        // The callback function to run when the data is fetched.
        const cartItem = {
          // Update the cartAdded state with the fetched data.
          name: data.name,
          price: data.price,
          quantity: data.quantity || 1,
          // Set to true to listen for real-time updates.
          createdAt: timestamp(),
          userId: props.currentUser?.uid,
          category: data.category,
          // Log any errors that occur while fetching the data.
          images: data.images,
          branch_id: data.branch_id,
          product_id: data.id,
        };
        if (props.currentUser?.uid) {
          const result = await addDocs(cartItem);
          fetchCartAdded(
            "userId",
            props.currentUser?.uid,
            "product_id",
            data.id
          );
          push.success("Add to cart success");
          console.log("result", result);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    const handleAddMoreCart = async (cartItem) => {
      try {
        cartItem.quantity += 1;
        await updateDocs(cartItem.id, cartItem);
        fetchCartAdded(
          "userId",
          props.currentUser?.uid,
          "product_id",
          props.product_detail?.id
        );
      } catch (error) {
        console.error("Error adding more to cart:", error);
      }
    };
    const handleRemoveCart = async (id) => {
      try {
        await removeDoc(id);
        cartAdded.value = cartAdded.value.filter((item) => item.id !== id);
        console.log(`Cart item ${id} removed successfully`);
        fetchCartAdded(
          "userId",
          props.currentUser?.uid,
          "product_id",
          props.product_detail?.id
        );
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    };
    const handleDecrementCart = async (cartItem) => {
      try {
        cartItem.quantity -= 1;
      } catch (error) {
        console.error("Error decrementing cart item:", error);
      }
    };
    const clearQty = async (cartItem) => {
      try {
        await removeDoc(cartItem.id);
        cartAdded.value = cartAdded.value.filter(
          (item) => item.id !== cartItem.id
        );
        console.log(`Cart item ${cartItem.id} removed successfully`);
        fetchCartAdded(
          "userId",
          props.currentUser?.uid,
          "product_id",
          props.product_detail?.id
        );
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    };
    onMounted(async () => {
      if (props.currentUser?.uid) {
        await fetchCartAdded(
          "userId",
          props.currentUser?.uid,
          "product_id",
          props.product_detail?.id
        );
      }

      if (props.product_detail) {
        console.log("product_detail", props.product_detail);
      }
      if (props.product_related) {
        console.log("product_related", props.product_related);
      }
    });

    return {
      product_detail: props.product_detail,
      product_related: props.product_related,
      handleAddToCart,
      cartAdded,
      handleAddMoreCart,
      handleDecrementCart,
      cartItem,
      handleRemoveCart,
      clearQty,
    };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="w-full p-5">
    <div class="w-[80%] mx-auto">
      <div>
        <div class="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Cover Image -->
          <div class="relative h-48 md:h-64 overflow-hidden">
            <img
              :src="shop.coverImageUrls"
              alt="Shop Cover"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
            <div
              class="absolute bottom-4 left-4 right-4 flex items-end justify-between"
            >
              <h1 class="text-24px font-bold text-white drop-shadow-lg">
                {{ shop.name }}
              </h1>
              <span
                class="px-3 py-1 bg-primary-6 text-white text-13px font-semibold rounded-full animate-fade-up animate-delay-275"
              >
                {{ shop.Mart_category?.name }}
              </span>
            </div>
          </div>

          <!-- Shop Details -->
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <img
                :src="shop.profileImageUrl"
                alt="Shop Profile"
                class="w-16 h-16 rounded-full border-4 border-primary-3"
              />
              <div>
                <h2 class="text-20px font-semibold text-gray-800">
                  {{ shop.name }}
                </h2>
                <p class="text-16px text-gray-600">
                  <span class="text-red-500">
                    <i class="pi pi-map-marker"></i>
                  </span>
                  {{ shop.location }}
                </p>
              </div>
            </div>

            <p class="text-17px text-gray-700 mb-6 line-clamp-3">
              {{ shop.Mart_Description }}
            </p>

            <div
              class="flex items-center justify-between text-16px text-gray-700"
            >
              <div class="flex items-center space-x-2">
                <div class="flex items-center gap-2">
                  <span class="text-primary-7">
                    <i class="pi pi-phone"></i>
                  </span>
                  <p class="text-16px font-semibold">
                    {{ shop.Phone_number }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-full md:mx-auto mx-3">
          <!-- cart container -->
          <div
            class="mt-8 xl:w-fit lg:w-fit md:w-fit w-full xl:gap-8 lg:gap-8 md:gap-8 gap-12 grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 h-fit py-3"
          >
            <div
              v-for="product in product"
              :key="product.id"
              class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 animate-fade-up animate-duration-300"
              style="width: 200px; height: 270px"
            >
              <div class="relative h-[150px] overflow-hidden">
                <img
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute top-2 right-2 bg-primary-6 text-white text-13px font-semibold px-2 py-1 rounded-full"
                >
                  New
                </div>
              </div>
              <div class="p-4 flex flex-col justify-between h-[120px]">
                <h2 class="font-semibold text-16px text-gray-800 mb-2 truncate">
                  {{ product.name }}
                </h2>
                <div class="flex items-center justify-between">
                  <span class="text-17px font-bold text-primary-8">
                    {{ product.price }} ៛
                  </span>
                  <button
                    @click="handleAddToCart(product)"
                    class="bg-primary-5 hover:bg-primary-6 text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-opacity-50"
                  >
                    <PlusIcon class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { getAuth } from "firebase/auth";
import { projectAuth, projectFirestore } from "@/config/config";
import { where, doc, getDoc } from "firebase/firestore";
import useCollection from "@/composible/useCollection";
import { onAuthStateChanged } from "firebase/auth";
import { timestamp } from "@/config/config";
import { useToast } from "primevue/usetoast";
export default {
  setup() {
    const route = useRoute();
    const currentUser = ref(null);
    const auth = getAuth();
    const { addDocs } = useCollection("carts");
    const product = ref([]);

    const fetchProducts = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("products", conditions, (data) => {
          product.value = data;
        });
        console.log("product", product.value);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const shop = ref([]);
    const fetchShopsById = async (id) => {
      try {
        const docRef = doc(projectFirestore, "marts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          shop.value = { id: docSnap.id, ...docSnap.data() };
          console.log("Fetched shop:", shop.value);
        } else {
          console.error("No document found with the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching shops by document ID:", error);
      }
    };
    const handleAddToCart = async (data) => {
      try {
        const cartItem = {
          name: data.name,
          price: data.price,
          quantity: data.quantity || 1,
          createdAt: timestamp(),
          userId: currentUser.value?.uid,
          category: data.category,
          images: data.images,
          branch_id: data.branch_id,
        };
        if (currentUser.value?.uid) {
          const result = await addDocs(cartItem);
          showToast("create", "success");
          fetchCartAdded("userId", currentUser.value?.uid);
          console.log("result", result);
          console.log("cartAdded", cartAdded.value);
        } else {
          handleLogin();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
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
    const category = ref([]);
    const fetchCategory = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("subcategories", conditions, (data) => {
          category.value = data;
        });
        console.log("category", category.value);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    onMounted(async () => {
      console.log("route", route.params.id);
      await Promise.all([
        fetchProducts("branch_id", route.params.id),
        fetchCategory("branch_id", route.params.id),
        fetchShopsById(route.params.id),
      ]);

      currentUser.value = projectAuth.currentUser;
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
    });
    return { product, cartAdded, handleAddToCart, category, shop };
  },
};
</script>

<style lang="scss" scoped></style>

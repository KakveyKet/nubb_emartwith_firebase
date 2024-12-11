<template>
  <div class="w-full p-5">
    <div class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto">
      <div v-if="shop">
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
          <div v-if="shop" class="p-6">
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
                  <a
                    :href="`tel:${shop.Phone_number}`"
                    class="text-16px font-semibold"
                  >
                    {{ shop.Phone_number }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="mx-auto bg-gray-300 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <!-- Cover Image -->
          <div class="relative h-48 md:h-64 overflow-hidden">
            <div class="w-full h-full bg-gray-200"></div>
          </div>
          <!-- Shop Details -->
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
              </div>
            </div>

            <div class="h-3 bg-gray-200 rounded w-full mb-6"></div>
            <div class="h-3 bg-gray-200 rounded w-3/5 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>

            <div
              class="flex items-center justify-between text-16px text-gray-700"
            >
              <div class="flex items-center space-x-2">
                <div class="flex items-center gap-2">
                  <p class="h-3 w-3 bg-gray-200 rounded-full"></p>
                  <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- sort by category -->
        <div class="py-4">
          <h2 class="text-20px font-semibold text-gray-800 mb-4 px-4">
            Sort by category
          </h2>
          <div class="">
            <div
              class="flex overflow-x-auto pb-4 px-4 space-x-3 snap-x hide-scrollbar bg-none"
            >
              <button
                v-for="category in category"
                :key="category.id"
                @click="selectCategory(category)"
                class="flex-shrink-0 snap-start focus:outline-none transition-all duration-300 ease-in-out border"
                :class="[
                  selectedCategory === category.id
                    ? 'bg-primary-6 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-2 hover:text-primary-8',
                  'px-4 py-2 rounded-full text-16px font-medium shadow-md hover:shadow-lg',
                ]"
              >
                {{ category.name }}
              </button>
            </div>
            <div
              class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary-1 to-transparent pointer-events-none"
            ></div>
            <div
              class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary-1 to-transparent pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-full md:mx-auto">
          <!-- cart container -->
          <div
            class="xl:w-fit lg:w-fit md:w-fit w-full xl:gap-8 lg:gap-8 md:gap-8 gap-4 grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 h-fit"
          >
            <div
              v-for="product in product"
              :key="product.id"
              class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fade-up animate-duration-300 group xl:h-fit lg:h-fit md:h-fit h-fit border"
            >
              <!-- Image Container -->
              <div
                class="relative xl:w-[200px] lg:w-[200px] md:w-[150px] w-full xl:h-[180px] lg:h-[180px] md:h-[150px] h-[150px] overflow-hidden"
              >
                <img
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                ></div>
                <div class="absolute top-2 right-2">
                  <span
                    class="bg-primary-6 text-white text-13px font-semibold px-3 py-1 rounded-full"
                  >
                    {{ product.category.name }}
                  </span>
                </div>
                <div class="absolute bottom-2 right-2">
                  <span
                    class="bg-white/90 text-primary-8 text-13px font-semibold px-2 py-1 rounded-md"
                  >
                    {{ product.starting_time }} - {{ product.ending_time }} min
                  </span>
                </div>
              </div>

              <!-- Content Container -->
              <div class="p-4 flex flex-col justify-between h-[140px]">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <h2
                      class="font-semibold text-16px text-gray-800 truncate flex-1"
                    >
                      {{ product.name }}
                    </h2>
                    <div class="flex items-center ml-2">
                      <i class="pi pi-star text-yellow-400"></i>
                      <span class="text-13px text-gray-600 ml-1">{{
                        product.rate
                      }}</span>
                    </div>
                  </div>
                  <p class="text-13px text-gray-600 line-clamp-2">
                    {{ product.description }}
                  </p>
                </div>

                <!-- Price and Action -->
                <div class="flex items-center justify-between mt-3">
                  <div class="flex flex-col">
                    <span class="text-17px font-bold text-primary-8">
                      {{ product.price }} ៛
                    </span>
                    <!-- <span class="text-13px text-gray-500 line-through">
                      {{ Math.round(product.price * 1.2) }} ៛
                    </span> -->
                  </div>
                  <button
                    @click="handleAddToCart(product)"
                    class="bg-primary-5 hover:bg-primary-6 text-white rounded-lg flex items-center justify-center size-10 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-opacity-50"
                  >
                    <i class="pi pi-plus size-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        setTimeout(() => {
          fetchShopsById(route.params.id);
        }, 1000),
      ]);

      currentUser.value = projectAuth.currentUser;
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
    });
    return {
      product,
      cartAdded,
      handleAddToCart,
      category,
      shop,
    };
  },
};
</script>

<style scoped>
/* For modern browsers */
.hide-scrollbar {
  overflow: auto; /* Enables scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>

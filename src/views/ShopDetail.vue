<template>
  <div class="w-full p-5 relative">
    <div class="xl:w-[80%] lg:w-[80%] md:w-[80%] w-full mx-auto">
      <div v-if="shop">
        <div
          class="mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-fade-down animate-once animate-duration-300"
        >
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
                alt=""
                class="w-16 h-16 rounded-full border border-primary-3 shadow-md"
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
      <div
        v-else
        class="mx-auto bg-gray-200 rounded-xl shadow-lg overflow-hidden animate-pulse"
      >
        <!-- Cover Image -->
        <div class="relative h-48 md:h-64 overflow-hidden bg-gray-400">
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          ></div>
          <div
            class="absolute bottom-4 left-4 right-4 flex items-end justify-between"
          >
            <div class="w-1/2 bg-gray-300 rounded h-8"></div>
            <div class="px-3 py-1 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <!-- Shop Details -->
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-gray-300"></div>
            <div>
              <div class="h-6 bg-gray-300 rounded w-32"></div>
              <div class="h-4 bg-gray-300 rounded w-24 mt-2"></div>
            </div>
          </div>
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2 mt-2 mb-2"></div>
          <div
            class="flex items-center justify-between text-16px text-gray-700"
          >
            <div class="flex items-center space-x-2">
              <div class="flex items-center gap-2">
                <div class="h-6 bg-gray-300 rounded w-8"></div>
                <div
                  class="text-16px font-semibold h-6 bg-gray-300 rounded w-20"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="shop">
        <!-- sort by category -->
        <div class="py-4">
          <h2 class="text-20px font-semibold text-gray-800 mb-4 px-4">
            Category
          </h2>
          <div class="">
            <div
              class="flex overflow-x-auto pb-4 px-4 space-x-3 snap-x hide-scrollbar bg-none"
            >
              <!-- viwe all -->
              <button
                @click="selectedCategory = null"
                class="flex-shrink-0 snap-start focus:outline-none transition-all duration-300 ease-in-out border"
                :class="[
                  selectedCategory === null
                    ? 'bg-primary-6 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-2 hover:text-primary-8',
                  'px-4 py-2 rounded-full text-16px font-medium shadow-md hover:shadow-lg',
                ]"
              >
                All
              </button>
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category"
                class="flex-shrink-0 snap-start focus:outline-none transition-all duration-300 ease-in-out border"
                :class="[
                  selectedCategory === category
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
      <div v-else>
        <!-- sort by category -->
        <div class="py-4 animate-pulse">
          <div class="h-5 bg-gray-200 rounded w-1/4 mb-4 px-4"></div>
          <div class="">
            <div
              class="flex overflow-x-auto pb-4 px-4 space-x-3 snap-x bg-none"
            >
              <div class="h-8 bg-gray-200 rounded w-16"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gray-200"></div>
            <div class="absolute right-0 top-0 bottom-0 w-8 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div v-if="product.length > 0">
        <div class="w-full md:mx-auto">
          <!-- cart container -->
          <div
            class="xl:w-fit lg:w-fit md:w-fit w-full xl:gap-8 lg:gap-8 md:gap-8 gap-4 grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 h-fit"
          >
            <!-- opacity 0.5 when shop is close -->
            <div
              v-for="product in product"
              :key="product.id"
              :class="{
                'cursor-not-allowed': isShopClose(
                  shop.openTime,
                  shop.closeTime
                ),
              }"
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
                      {{ formatNumber(product.price) }} ៛
                    </span>
                    <!-- <span class="text-13px text-gray-500 line-through">
                      {{ Math.round(product.price * 1.2) }} ៛
                    </span> -->
                  </div>
                  <button
                    :disabled="isShopClose(shop.openTime, shop.closeTime)"
                    @click="handleAddToCart(product)"
                    :class="{
                      'cursor-not-allowed': isShopClose(
                        shop.openTime,
                        shop.closeTime
                      ),
                    }"
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
      <div v-else-if="product.length > 0 && selectedCategory">
        <!-- sort by category -->
        <div class="py-4 animate-pulse">
          <div class="h-5 bg-gray-200 rounded w-1/4 mb-4 px-4"></div>
          <div class="">
            <div
              class="flex overflow-x-auto pb-4 px-4 space-x-3 snap-x bg-none"
            >
              <div class="h-8 bg-gray-200 rounded w-16"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gray-200"></div>
            <div class="absolute right-0 top-0 bottom-0 w-8 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div v-else-if="product.length === 0 && selectedCategory">
        <div class="flex flex-col items-center justify-center p-8">
          <div class="mb-6">
            <svg
              class="size-14 text-primary-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
          </div>
          <h2
            class="xl:text-24px lg:text-24px md:text-24px text-16px font-bold text-primary-9 mb-2"
          >
            No Data Available
          </h2>
          <p class="text-16px text-primary-7 text-center max-w-md">
            There are currently no items to display in this category. Please try
            selecting a different category or check back later.
          </p>
        </div>
      </div>
    </div>
    <!-- floating cart  and back to cart view-->
    <div class="fixed bottom-5 right-5">
      <button
        @click="handleTab('cart')"
        class="bg-primary-6 text-white rounded-full size-10 hover:bg-primary-7 active:bg-primary-8 animate-bounce animate-once animate-duration-300"
      >
        <i class="pi pi-shopping-cart"></i>
        <span
          class="absolute top-0 right-0 size-4 bg-white rounded-full"
          :class="[
            cartAdded.length
              ? ' text-primary-8 flex items-center justify-center font-bold text-13px border b'
              : 'hidden',
            'animate-bounce animate-once animate-duration-300',
          ]"
        >
          {{ cartAdded.length }}
        </span>
      </button>
    </div>
    <Dialog
      v-model:visible="visible"
      :modal="true"
      :style="{ width: '50vw', position: 'absolute', top: '10vh' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <UserLoginForm />
    </Dialog>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
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
import { useRouter } from "vue-router";
import UserLoginForm from "@/user/UserLoginForm.vue";
// notivue
import { Notivue, Notification, push } from "notivue";
import { formatNumber } from "@/helper/formatCurrecy";
import moment from "moment-timezone";

export default {
  components: {
    UserLoginForm,
    Notivue,
    Notification,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const currentUser = ref(null);
    // get funtion by emit from shop component
    const handleTab = (t) => {
      emit("tab", t);
      router.push("/");
    };
    const visible = ref(false);
    const auth = getAuth();
    const { addDocs } = useCollection("carts");
    const product = ref([]);
    const selectedCategory = ref(null);

    const fetchProducts = async (field, value) => {
      try {
        // Validate inputs
        if (!field || !value) {
          throw new Error("Invalid field or value for query.");
        }

        let conditions = [where(field, "==", value)]; // Add branch filter

        // Add category filter only if selectedCategory is valid
        if (selectedCategory.value && selectedCategory.value.id) {
          conditions.push(
            where("category.id", "==", selectedCategory.value.id)
          );
        } else {
          console.warn("No category selected or category ID is missing.");
        }

        // Fetch data
        await getCollectionQuery("products", conditions, (data) => {
          product.value = data;
        });

        console.log("Filtered Products:", product.value);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const shop = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchShopsById = async (id) => {
      isLoading.value = true;
      error.value = null;

      try {
        const docRef = doc(projectFirestore, "marts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          shop.value = { id: docSnap.id, ...docSnap.data() };
        } else {
          error.value = "No document found with the provided ID.";
        }
      } catch (error) {
        console.error("Error fetching shops by document ID:", error);
        error.value = "An error occurred while fetching the shop.";
      } finally {
        isLoading.value = false;
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
          fetchCartAdded("userId", currentUser.value?.uid);
          push.success("Add to cart success");
          console.log("result", result);
          console.log("cartAdded", cartAdded.value);
        } else {
          visible.value = true;
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    let subscription = ref(null);
    const cartAdded = ref([]);
    const fetchCartAdded = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
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
        console.error("Error fetching cart data:", error);
      }
    };
    const categories = ref([]);
    const fetchCategory = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("subcategories", conditions, (data) => {
          categories.value = data;
        });
        console.log("category", categories.value);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    onMounted(async () => {
      console.log("route", route.params.id);
      await Promise.all([
        fetchShopsById(route.params.id),
        fetchProducts("branch_id", route.params.id),
        fetchCategory("branch_id", route.params.id),
      ]);

      currentUser.value = projectAuth.currentUser;
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
      fetchCartAdded("userId", currentUser.value?.uid);
    });

    // Watch for changes to the selected category and refetch products
    watch(selectedCategory, (newCategory) => {
      console.log("Selected Category Changed:", newCategory);
      fetchProducts("branch_id", route.params.id); // Pass branch ID
    });
    // watch open and close time of shop the button add to cart disable
    const isShopClose = (openTime, closeTime) => {
      // Convert openTime and closeTime to moment objects
      const openTimeFormatted = moment
        .unix(openTime.seconds)
        .tz("Asia/Phnom_Penh")
        .format("HH:mm");
      const closeTimeFormatted = moment
        .unix(closeTime.seconds)
        .tz("Asia/Phnom_Penh")
        .format("HH:mm");

      const currentTime = moment().tz("Asia/Phnom_Penh").format("HH:mm");

      // Compare the current time with open and close times
      return (
        currentTime < openTimeFormatted || currentTime > closeTimeFormatted
      );
    };

    return {
      product,
      cartAdded,
      handleAddToCart,
      categories,
      shop,
      selectedCategory,
      route,
      handleTab,
      visible,
      formatNumber,
      isShopClose,
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

<template>
  <div class="flex justify-center items-start h-fit bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Admin Profile
      </h2>
      <form class="space-y-4">
        <!-- Display Name Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="currentUser.displayName"
            type="text"
            placeholder="Username"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            readonly
          />
        </div>

        <!-- Email Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="currentUser.email"
            type="email"
            placeholder="Email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            readonly
          />
        </div>

        <!-- Role Input
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Role {{ currentUser.role }}</label
          >
          <input
            v-model="currentUser.role"
            type="text"
            placeholder="Role"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            readonly
          />
        </div> -->

        <!-- Marts List (if applicable) -->
        <div v-if="marts.length" class="mt-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            Managed Marts
          </h3>
          <ul class="space-y-2">
            <li
              v-for="mart in marts"
              :key="mart.id"
              class="p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              {{ mart.name }}
            </li>
          </ul>
        </div>
        <div class="flex gap-4 w-full justify-end">
          <button
            @click="logout"
            class="w-fit bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            class="w-fit bg-primary-6 text-white p-2 rounded-lg hover:bg-primary-7"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { projectAuth } from "@/config/config"; // Firebase config import
import { getAuth } from "firebase/auth";
import { where } from "firebase/firestore";
import { getCollectionQuery } from "@/composible/getCollection";

export default {
  setup() {
    const currentUser = ref({});
    const marts = ref([]);

    const fetchMartsForCurrentUser = async () => {
      if (currentUser.value) {
        const userId = currentUser.value?.uid; // Fetch user ID if needed
        const conditions = [where("ownerId", "==", userId)];

        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("Fetched marts:", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser || currentUser.value;
      await fetchMartsForCurrentUser();
    });

    return {
      currentUser,
      marts,
    };
  },
};
</script>

<style scoped>
/* Scoped styles can go here, or you can rely solely on Tailwind CSS */
</style>

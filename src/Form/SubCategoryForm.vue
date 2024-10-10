<template>
  <div class="category-form">
    <form @submit.prevent="handleSubmit">
      <!-- Category Name Input -->
      <div class="flex flex-col space-y-2">
        <label for="category-name">Category Name:</label>

        <InputText
          v-model="categoryName"
          type="text"
          id="category-name"
          placeholder="Enter category name"
          class="!w-full"
        />
      </div>
      <div class="flex items-center justify-end mt-8 gap-3">
        <button class="add_new_button">Cancel</button>
        <button class="add_new_button" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { projectFirestore } from "@/config/config";
import { where } from "firebase/firestore";
import { projectAuth } from "@/config/config";
import { getCollectionQuery } from "@/composible/getCollection";
import { timestamp } from "@/config/config";
export default {
  setup() {
    const categoryName = ref("");
    const selectedBranchId = ref(null);
    const handleSubmit = async () => {
      if (categoryName.value) {
        try {
          // Add the category with the known branch ID
          await addDoc(collection(projectFirestore, "subcategories"), {
            name: categoryName.value,
            branch_id: marts.value[0]?.id,
            status: true,
            created_at: timestamp(),
          });

          // Clear the form fields after submission
          categoryName.value = "";

          alert("Category created successfully!");
        } catch (error) {
          console.error("Error creating category:", error);
          alert("Failed to create category. Please try again.");
        }
      } else {
        alert("Please fill out the category name.");
      }
    };
    const currentUser = ref(null);

    const marts = ref([]);
    const fetchMartsForCurrentUser = async () => {
      if (currentUser?.value) {
        const userId = currentUser.value?.uid;
        const conditions = [where("ownerId", "==", userId)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("data mart", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([fetchMartsForCurrentUser()]);
    });

    return {
      categoryName,
      marts,
      handleSubmit,
      currentUser,
    };
  },
};
</script>

<!-- <style scoped>
/* Add your styles here */
.category-form {
  max-width: 400px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

button {
  background-color: #3490dc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #2779bd;
}
</style> -->

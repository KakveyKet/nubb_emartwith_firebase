<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <!-- Product Name Input -->
      <div class="flex flex-col space-y-2">
        <label for="name">Product Name: </label>
        <InputText
          v-model="productName"
          type="text"
          id="name"
          placeholder="Enter product name"
          class="!w-full"
        />
      </div>

      <!-- Image Input -->
      <div class="flex flex-col space-y-2 mt-4">
        <label for="images">Product Images (1-3 images):</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          class="!w-full"
        />
      </div>
      <Select
        v-model="selectCategory"
        :options="subcategory"
        optionLabel="name"
        placeholder="Select a category"
        class="w-full md:w-56"
      />

      <div class="flex subcategory-center justify-end mt-8 gap-3">
        <button class="add_new_button" type="button">Cancel</button>
        <button class="add_new_button" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import {
  projectFirestore,
  projectStorage,
  timestamp,
  projectAuth,
} from "@/config/config";
import { where } from "firebase/firestore";
import { getCollectionQuery } from "@/composible/getCollection";
import { ref, onMounted } from "vue";
import { getStorage } from "firebase/storage";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  setup() {
    const selectCategory = ref(null);
    const currentUser = ref(null);
    const marts = ref([]);
    const productName = ref(null);
    const productImages = ref([]); // To store the selected image files
    const subcategory = ref([]);

    // Fetch marts for the current user
    const fetchMarts = async (field, value) => {
      if (currentUser?.value) {
        const conditions = [where(field, "==", value)]; // Dynamic condition based on the field and value provided

        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("data mart", marts.value);
        });
      } else {
        console.error("No user is currently logged in.");
      }
    };

    // Handle image selection and store in productImages
    const handleImageUpload = (event) => {
      const files = event.target.files;
      if (files.length > 3) {
        alert("You can only upload up to 3 images.");
        return;
      }
      productImages.value = Array.from(files);
    };
    const uploadImage = async (path, file) => {
      const storage = getStorage(); // Ensure you're using the initialized storage instance
      const storageRefInstance = storageRef(storage, `${path}-${Date.now()}`);

      // Upload the file to Firebase Storage
      await uploadBytes(storageRefInstance, file);

      // Get the URL of the uploaded file
      const downloadUrl = await getDownloadURL(storageRefInstance);

      return downloadUrl;
    };

    // Handle form submission
    const handleSubmit = async () => {
      let productImageUrls = []; // Array to store uploaded image URLs

      // Ensure that the product name and images are provided
      if (!productName.value || productImages.value.length === 0) {
        alert(
          "Please fill out the product name and upload at least one image."
        );
        return;
      }

      // Upload product images
      for (const image of productImages.value) {
        try {
          const productImageUrl = await uploadImage(
            `products/${image.name}`,
            image
          );
          productImageUrls.push(productImageUrl);
        } catch (error) {
          console.error("Error uploading product image:", error);
          alert("Failed to upload product images.");
          return; // Exit if an error occurs
        }
      }

      try {
        // After successfully uploading images, save the product details to Firestore
        await addDoc(collection(projectFirestore, "products"), {
          name: productName.value,
          branch_id: marts.value[0]?.id,
          images: productImageUrls, // Array of uploaded product image URLs
          status: true,
          category: selectCategory.value,
          created_at: timestamp(),
        });

        alert("Product created successfully!");
      } catch (error) {
        console.error("Error creating product:", error);
        alert("Failed to create product. Please try again.");
      }
    };

    const fetchSubCategories = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];

        await getCollectionQuery("subcategories", conditions, (data) => {
          subcategory.value = data;
          console.log("data category", subcategory.value);
        });
      } else {
        console.error("Error fetching data: category data is empty.");
      }
    };
    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([fetchMarts("ownerId", currentUser.value.uid)]);
      if (marts.value.length > 0) {
        await fetchSubCategories("branch_id", marts.value[0].id);
      } else {
        console.error("Error: No marts available for the current user.");
      }
    });

    return {
      productName,
      handleImageUpload,
      handleSubmit,
      subcategory,
      selectCategory,
    };
  },
};
</script>

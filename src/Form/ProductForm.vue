<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 w-full">
    <!-- Product Name Input -->
    <div class="flex flex-col space-y-2">
      <label for="name">Product Name: </label>
      <InputText
        v-model="productName"
        type="text"
        id="name"
        placeholder="Enter product name"
        class="w-full"
      />
    </div>

    <!-- Description Input -->
    <div class="flex flex-col space-y-2">
      <label for="description">Description: </label>
      <Textarea
        v-model="description"
        id="description"
        placeholder="Enter product description"
        class="w-full"
      />
    </div>

    <!-- Product Images Input -->
    <div class="flex flex-col space-y-2 mt-4">
      <label for="images">Product Images (1-3 images):</label>
      <FileUpload
        name="images"
        :customUpload="true"
        :multiple="true"
        accept="image/*"
        :maxFileSize="1000000"
        :maxFiles="3"
        :auto="false"
        @select="onAdvancedUpload"
      >
        <template #empty>
          <span>Drag and drop files here to upload.</span>
        </template>
      </FileUpload>
    </div>

    <!-- Preview of Selected Images -->
    <div v-if="imagePreviews.length" class="flex flex-wrap gap-4 mt-4">
      <div
        v-for="(image, index) in imagePreviews"
        :key="index"
        class="w-24 h-24"
      >
        <img
          :src="image"
          alt="Preview"
          class="object-cover w-full h-full rounded"
        />
      </div>
    </div>

    <!-- Category, Price, and Stock Inputs -->
    <div class="flex gap-4 mt-4">
      <div class="flex flex-col space-y-2">
        <label for="category">Category: </label>
        <Select
          v-model="selectCategory"
          :options="subcategory"
          optionLabel="name"
          placeholder="Select a category"
          filter
          class="w-full"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="price">Price: </label>
        <InputNumber
          v-model="price"
          id="price"
          placeholder="Enter price"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="stock">Stock: </label>
        <InputNumber
          v-model="stock"
          id="stock"
          placeholder="Enter stock"
          class="w-full"
        />
      </div>
    </div>

    <!-- Submit and Cancel Buttons -->
    <div class="flex justify-end mt-8 gap-3">
      <button class="add_new_button" type="button" @click="handleClose">
        Cancel
      </button>
      <button class="add_new_button" type="submit">Save</button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import FileUpload from "primevue/fileupload";
import { addDoc, collection, where } from "firebase/firestore";
import {
  projectFirestore,
  projectStorage,
  timestamp,
  projectAuth,
} from "@/config/config";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getCollectionQuery } from "@/composible/getCollection";

export default {
  components: { FileUpload },
  setup(props, { emit }) {
    const productName = ref("");
    const description = ref("");
    const productImages = ref([]); // Array to hold uploaded files
    const imagePreviews = ref([]); // Array to hold image preview URLs
    const selectCategory = ref(null);
    const subcategory = ref([]);
    const price = ref(0);
    const stock = ref(null);
    const currentUser = ref(null);
    const marts = ref([]);

    // Close the form
    const handleClose = () => {
      emit("close");
    };

    // Handle file selection for upload
    const onAdvancedUpload = (event) => {
      const files = event.files;
      if (files.length > 3) {
        alert("You can only upload up to 3 images.");
        return;
      }

      // Clear previous images if necessary
      productImages.value = [];
      imagePreviews.value = [];

      // Store selected files and create preview URLs
      Array.from(files).forEach((file) => {
        productImages.value.push(file);

        // Create a URL for the preview
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    // Upload image to Firebase storage
    const uploadImage = async (path, file) => {
      const storageRefInstance = storageRef(
        projectStorage,
        `${path}-${Date.now()}`
      );
      await uploadBytes(storageRefInstance, file);
      return getDownloadURL(storageRefInstance);
    };

    // Handle form submission and image upload
    const handleSubmit = async () => {
      if (!productName.value || productImages.value.length === 0) {
        alert("Please enter a product name and upload images.");
        return;
      }

      let productImageUrls = [];
      for (const image of productImages.value) {
        try {
          const productImageUrl = await uploadImage(
            `products/${image.name}`,
            image
          );
          productImageUrls.push(productImageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload product images.");
          return;
        }
      }

      try {
        await addDoc(collection(projectFirestore, "products"), {
          name: productName.value,
          branch_id: marts.value[0]?.id,
          images: productImageUrls,
          status: true,
          category: selectCategory.value,
          price: price.value,
          stock: stock.value,
          description: description.value,
          created_at: timestamp(),
        });
        emit("toast");
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };

    // Fetch marts and subcategories on mount
    const fetchMarts = async (field, value) => {
      if (currentUser?.value) {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
        });
      }
    };

    const fetchSubCategories = async (field, value) => {
      if (marts.value.length > 0) {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery("subcategories", conditions, (data) => {
          subcategory.value = data;
        });
      }
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await fetchMarts("ownerId", currentUser.value.uid);
      if (marts.value.length > 0) {
        await fetchSubCategories("branch_id", marts.value[0].id);
      }
    });

    return {
      productName,
      description,
      onAdvancedUpload,
      handleSubmit,
      imagePreviews,
      selectCategory,
      subcategory,
      price,
      stock,
      handleClose,
    };
  },
};
</script>

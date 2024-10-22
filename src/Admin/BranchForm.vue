<template>
  <div class="product-form">
    <h2>Add New Product</h2>
    <form @submit.prevent="submitForm">
      <!-- Branch ID -->
      <div class="form-group">
        <label for="branch">Branch</label>
        <select v-model="form.branchId" id="branch" required>
          <option disabled value="">Select Branch</option>
          <option
            v-for="branch in branches"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.name }}
          </option>
        </select>
      </div>

      <!-- Sub Category ID -->
      <div class="form-group">
        <label for="subcategory">Sub Category</label>
        <select v-model="form.subCategoryId" id="subcategory" required>
          <option disabled value="">Select Sub Category</option>
          <option
            v-for="subcategory in filteredSubCategories"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.name }}
          </option>
        </select>
      </div>

      <!-- Price -->
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          v-model.number="form.price"
          id="price"
          min="0"
          step="0.01"
          required
        />
      </div>

      <!-- Images -->
      <div class="form-group">
        <label for="images">Images (1-3)</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          :disabled="form.images.length >= 3"
        />
        <div class="image-preview" v-if="imagePreviews.length">
          <img
            v-for="(src, index) in imagePreviews"
            :key="index"
            :src="src"
            alt="Image Preview"
            class="preview-img"
          />
        </div>
        <p v-if="imageErrors" class="error">{{ imageErrors }}</p>
      </div>

      <!-- Product Details -->
      <div class="form-group">
        <label for="details">Product Details</label>
        <textarea
          v-model="form.details"
          id="details"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Product Quantity -->
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="number"
          v-model.number="form.quantity"
          id="quantity"
          min="0"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading">
        {{ loading ? "Submitting..." : "Add Product" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { firestore, storage } from "../config/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "ProductForm",
  setup() {
    // Individual form fields as refs
    const branchId = ref("");
    const subCategoryId = ref("");
    const price = ref(null);
    const images = ref([]);
    const details = ref("");
    const quantity = ref(null);

    // Image previews and errors
    const imagePreviews = ref([]);
    const imageErrors = ref("");

    // Loading state
    const loading = ref(false);

    // Data from Firestore
    const branches = ref([]);
    const subCategories = ref([]);

    // Fetch data on component mount
    onMounted(async () => {
      await fetchBranches();
      await fetchSubCategories();
    });

    // Fetch branches from Firestore
    const fetchBranches = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "marts"));
        branches.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    // Fetch subcategories from Firestore
    const fetchSubCategories = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "subcategories")
        );
        subCategories.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    // Compute filtered subcategories based on selected branch
    const filteredSubCategories = computed(() => {
      if (!branchId.value) return subCategories.value;
      // Adjust the filter condition based on your data model
      return subCategories.value.filter(
        (sub) => sub.branchId === branchId.value
      );
    });

    // Handle image file selection
    const handleImageUpload = (event) => {
      const files = event.target.files;
      const currentImageCount = images.value.length;
      const totalImages = currentImageCount + files.length;

      // Check if total images exceed the limit
      if (totalImages > 3) {
        imageErrors.value = "You can only upload up to 3 images.";
        return;
      }

      imageErrors.value = "";

      // Process each selected file
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          images.value.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreviews.value.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    };

    // Submit the form
    const submitForm = async () => {
      // Validate image count
      if (images.value.length < 1) {
        imageErrors.value = "Please upload at least one image.";
        return;
      }

      loading.value = true;
      try {
        // Upload images to Firebase Storage and get URLs
        const imageUrls = await Promise.all(
          images.value.map(async (image) => {
            const imgRef = storageRef(
              storage,
              `products/${Date.now()}_${image.name}`
            );
            const snapshot = await uploadBytes(imgRef, image);
            const url = await getDownloadURL(snapshot.ref);
            return url;
          })
        );

        // Prepare product data
        const productData = {
          branchId: branchId.value,
          subCategoryId: subCategoryId.value,
          price: price.value,
          images: imageUrls,
          details: details.value,
          quantity: quantity.value,
          createdAt: new Date(),
        };

        // Add product to Firestore
        await addDoc(collection(firestore, "products"), productData);

        // Reset form fields
        branchId.value = "";
        subCategoryId.value = "";
        price.value = null;
        images.value = [];
        details.value = "";
        quantity.value = null;
        imagePreviews.value = [];
        imageErrors.value = "";

        // Notify the user
        alert("Product added successfully!");
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      } finally {
        loading.value = false;
      }
    };

    return {
      branchId,
      subCategoryId,
      price,
      images,
      details,
      quantity,
      branches,
      subCategories,
      filteredSubCategories,
      imagePreviews,
      imageErrors,
      handleImageUpload,
      submitForm,
      loading,
    };
  },
};
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.image-preview {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.error {
  color: red;
  font-size: 0.9rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
</style>

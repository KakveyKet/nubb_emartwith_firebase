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
      <span v-if="isValidateName" class="text-red-500">{{
        isValidateName
      }}</span>
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
        :multiple="true"
        :customUpload="true"
        accept="image/*"
        :maxFileSize="1000000"
        :maxFiles="3"
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
    <span v-if="isValidateImage" class="text-red-500">{{
      isValidateImage
    }}</span>

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
        <span v-if="isValidateCategory" class="text-red-500">{{
          isValidateCategory
        }}</span>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="price">Price: </label>
        <InputNumber
          v-model="price"
          id="price"
          placeholder="Enter price"
          prefix="៛ "
          class="w-full"
        />
        <span v-if="isValidatePrice" class="text-red-500">{{
          isValidatePrice
        }}</span>
      </div>
      <!-- <div class="flex flex-col space-y-2">
        <label for="stock">Stock: </label>
        <InputNumber
          v-model="stock"
          id="stock"
          placeholder="Enter stock"
          class="w-full"
        />
        <span v-if="isValidateStock" class="text-red-500">{{
          isValidateStock
        }}</span>
      </div> -->
    </div>

    <!-- Submit and Cancel Buttons -->
    <div class="flex justify-end mt-8 gap-3">
      <button class="add_new_button" type="button" @click="handleClose">
        Cancel
      </button>
      <button class="add_new_button" type="submit" :disabled="isLoading">
        {{ dataToEdit ? "Update" : "Save" }}
        <span v-if="isLoading" class="loading loading-spinner"></span>
      </button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import FileUpload from "primevue/fileupload";
import { projectStorage, timestamp, projectAuth } from "@/config/config";
import { where } from "firebase/firestore";
import useStorage from "@/composible/useStorage";
import { getCollectionQuery } from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
export default {
  props: ["dataToEdit"],
  components: { FileUpload },
  setup(props, { emit }) {
    const productName = ref("");
    const description = ref("");
    const productImages = ref([]);
    const imagePreviews = ref([]);
    const selectCategory = ref(null);
    const subcategory = ref([]);
    const price = ref(null);
    const stock = ref(null);
    const currentUser = ref(null);
    const marts = ref([]);
    const isLoading = ref(false);

    const isValidateName = ref("");
    const isValidateDescription = ref("");
    const isValidatePrice = ref("");
    const isValidateStock = ref("");
    const isValidateCategory = ref("");
    const isValidateImage = ref("");

    const validateName = () => {
      if (!productName.value) {
        isValidateName.value = "Please enter a product name.";
        return false;
      }
      isValidateName.value = "";
      return true;
    };

    const validateCategory = () => {
      if (!selectCategory.value) {
        isValidateCategory.value = "Please select a category.";
        return false;
      }
      isValidateCategory.value = "";
      return true;
    };

    const validatePrice = () => {
      if (!price.value) {
        isValidatePrice.value = "Please enter a price.";
        return false;
      }
      isValidatePrice.value = "";
      return true;
    };

    const validateStock = () => {
      if (!stock.value) {
        isValidateStock.value = "Please enter a stock.";
        return false;
      }
      isValidateStock.value = "";
      return true;
    };
    const validateImage = () => {
      if (productImages.value.length === 0) {
        isValidateImage.value = "Please upload at least one image.";
        return false;
      }
      isValidateImage.value = "";
      return true;
    };
    watch(stock, () => {
      validateStock();
    });

    watch(selectCategory, () => {
      validateCategory();
    });
    watch(price, () => {
      validatePrice();
    });
    watch(productImages, () => {
      validateImage();
    });
    const { addDocs, updateDocs } = useCollection("products");
    const { uploadImage } = useStorage();

    const handleClose = () => {
      emit("close");
    };

    const onAdvancedUpload = (event) => {
      const files = event.files;
      if (files.length > 3) {
        alert("You can only upload up to 3 images.");
        return;
      }

      productImages.value = [];
      imagePreviews.value = [];

      Array.from(files).forEach((file) => {
        productImages.value.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const handleSubmit = async () => {
      if (!validateName()) {
        return;
      }
      if (!validateCategory()) {
        return;
      }
      // if (!validateDescription()) {
      //   return;
      // }
      if (!validatePrice()) {
        return;
      }
      if (!validateStock()) {
        return;
      }
      if (!validateImage()) {
        return;
      }
      let productImageUrls = [];

      // Upload new images if there are any
      if (productImages.value.length > 0) {
        try {
          productImageUrls = await Promise.all(
            productImages.value.map((image) =>
              uploadImage(`products/${Date.now()}-${image.name}`, image)
            )
          );
          console.log("Uploaded image URLs:", productImageUrls);
        } catch (error) {
          console.error("Error uploading images:", error);
          alert(
            "Failed to upload product images. Please check your network connection and try again."
          );
          return;
        }
      } else if (props.dataToEdit?.images) {
        // Retain existing images if no new images are uploaded
        productImageUrls = [...props.dataToEdit.images];
        console.log("Retaining existing images:", productImageUrls);
      } else {
        alert("Please upload at least one image.");
        return;
      }

      const productData = {
        name: productName.value,
        images: productImageUrls,
        status: true,
        category: selectCategory.value,
        price: price.value,
        description: description.value,
        branch_id: marts.value[0].id,
        created_at: timestamp(),
      };

      console.log("Product data to save:", productData);

      try {
        if (props.dataToEdit) {
          await updateDocs(props.dataToEdit.id, productData);
          console.log("Product updated successfully:", productData);
          isLoading.value = false;
          emit("toast", "update");
          handleClose();
        } else {
          await addDocs(productData);
          console.log("Product added successfully:", productData);
          isLoading.value = false;
          emit("toast", "create");
          handleClose();
        }
      } catch (error) {
        console.error("Error creating or updating product:", error);
        alert("There was an issue saving the product. Please try again.");
        isLoading.value = false;
      }
    };

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
      if (props.dataToEdit) {
        productName.value = props.dataToEdit.name;
        description.value = props.dataToEdit.description;
        price.value = props.dataToEdit.price;
        // stock.value = props.dataToEdit.stock;
        selectCategory.value = props.dataToEdit.category;
        imagePreviews.value = [...props.dataToEdit.images]; // Set initial previews to existing images
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
      isLoading,
      isValidateName,
      isValidateDescription,
      isValidatePrice,
      isValidateStock,
      isValidateCategory,
      isValidateImage,
    };
  },
};
</script>

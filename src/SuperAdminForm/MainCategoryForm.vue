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

      <!-- Image Upload Input using PrimeVue FileUpload -->
      <div class="flex flex-col space-y-2 mt-4">
        <label for="category-image">Upload Image:</label>
        <FileUpload
          name="category-image"
          accept="image/*"
          :customUpload="true"
          :maxFileSize="1000000"
          :auto="true"
          @select="handleImageUpload"
          chooseLabel="Choose"
          uploadLabel="Upload"
          cancelLabel="Cancel"
        />
        <!-- Image Preview -->
        <div v-if="imagePreview" class="mt-4">
          <img
            :src="imagePreview"
            alt="Image Preview"
            class="w-32 h-32 object-cover"
          />
        </div>
      </div>

      <div class="flex items-center justify-end mt-8 gap-3">
        <Button severity="danger" label="Cancel" @click="handleClose" />

        <Button type="submit">{{ dataToEdit ? "Update" : "Save" }}</Button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, doc } from "firebase/firestore";
import { projectFirestore, projectStorage } from "@/config/config";
import { where } from "firebase/firestore";
import { projectAuth } from "@/config/config";
import { getCollectionQuery } from "@/composible/getCollection";
import { timestamp } from "@/config/config";
import useCollection from "@/composible/useCollection";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { FileUpload } from "primevue/fileupload";
import InputText from "primevue/inputtext";

export default {
  components: {
    FileUpload,
    InputText,
  },
  props: ["dataToEdit"],
  setup(props, { emit }) {
    const categoryName = ref("");
    const currentUser = ref(null);
    const imageFile = ref(null);
    const imagePreview = ref(null);
    const handleClose = () => {
      emit("close");
    };
    const handleImageUpload = async ({ files }) => {
      const file = files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const { addDocs, updateDocs } = useCollection("maincategory");
    const handleSubmit = async () => {
      if (categoryName.value) {
        try {
          let imageUrl = null;
          if (imageFile.value) {
            const storageReference = storageRef(
              projectStorage,
              `images/${imageFile.value.name}`
            );
            const snapshot = await uploadBytes(
              storageReference,
              imageFile.value
            );
            imageUrl = await getDownloadURL(snapshot.ref);
          }

          if (props.dataToEdit) {
            const docRef = doc(
              projectFirestore,
              "maincategory",
              props.dataToEdit.id
            );
            await updateDocs(props.dataToEdit.id, {
              name: categoryName.value,
              image_url: imageUrl || props.dataToEdit.image_url,
            });
            emit("toast", "update");
            handleClose();
          } else {
            // Add new document
            await addDocs({
              name: categoryName.value,
              status: true,
              createdAt: timestamp(),
              image_url: imageUrl,
            });
            emit("toast", "create");
            handleClose();
          }
          categoryName.value = "";
          imageFile.value = null;
          imagePreview.value = null;
        } catch (error) {
          console.error("Error saving category:", error);
          //   alert("Failed to save category. Please try again.");
        }
      } else {
        alert("Please fill out the category name.");
      }
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      if (props.dataToEdit) {
        categoryName.value = props.dataToEdit.name;
        imagePreview.value = props.dataToEdit.image_url;
      }
    });
    const handleCancel = () => {
      categoryName.value = "";
      imageFile.value = null;
      imagePreview.value = null;
    };
    return {
      categoryName,
      handleSubmit,
      currentUser,
      handleImageUpload,
      handleCancel,
      imagePreview,
      handleClose,
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

<!-- 
  button:hover {
    background-color: #2779bd;
  }
  </style> -->

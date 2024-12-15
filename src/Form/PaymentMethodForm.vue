<template>
  <div class="category-form">
    <form @submit.prevent="handleSubmit">
      <!-- Select Bank -->
      <div class="flex flex-col space-y-2">
        <label for="category-name">Select Bank</label>
        <Select
          v-model="bankName"
          :options="Bank"
          id="category-name"
          optionLabel="name"
          optionValue="name"
          placeholder="Example: ACELDA , ABA"
          showClear
          class="!w-full"
        />
      </div>

      <!-- Image Upload Input using PrimeVue FileUpload -->
      <div class="flex flex-col space-y-2 mt-4">
        <label for="category-image">Upload Kh Qr Payement Image:</label>
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
        <div v-if="khQrPayementImagePreview" class="mt-4">
          <img
            :src="khQrPayementImagePreview"
            alt="Image Preview"
            class="w-32 h-32 object-cover"
          />
        </div>
      </div>
      <div class="flex flex-col space-y-2 mt-4">
        <label for="category-image">Upload Usd Qr Payement Image:</label>
        <FileUpload
          name="category-image"
          accept="image/*"
          :customUpload="true"
          :maxFileSize="1000000"
          :auto="true"
          @select="handleUsdQrPayementImageUpload"
          chooseLabel="Choose"
          uploadLabel="Upload"
          cancelLabel="Cancel"
        />
        <!-- Image Preview -->
        <div v-if="usdQrPayementImagePreview" class="mt-4">
          <img
            :src="usdQrPayementImagePreview"
            alt="Image Preview"
            class="w-32 h-32 object-cover"
          />
        </div>
      </div>

      <div class="flex items-center justify-end mt-8 gap-3">
        <button
          v-if="dataToEdit"
          class="add_new_button"
          type="button"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button class="add_new_button" type="submit" :disabled="isLoading">
          <span v-if="isLoading">
            <i class="pi pi-spin pi-spinner mr-2"></i>
          </span>
          {{ dataToEdit ? "Update" : "Save" }}
        </button>
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
    const currentUser = ref(null);
    const Bank = ref([
      {
        name: "ABA",
      },
      {
        name: "ACELDA",
      },
      {
        name: "Wing",
      },
      {
        name: "Phillip",
      },
      {
        name: "Canadia",
      },
    ]);
    const marts = ref([]);
    const bankName = ref("");
    const khQrPayementImage = ref(null);
    const usdQrPayementImage = ref(null);
    const khQrPayementImagePreview = ref(null);
    const usdQrPayementImagePreview = ref(null);
    const isLoading = ref(false);
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

    const handleImageUpload = async ({ files }) => {
      const file = files[0];
      if (file) {
        khQrPayementImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          khQrPayementImagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const handleUsdQrPayementImageUpload = async ({ files }) => {
      const file = files[0];
      if (file) {
        usdQrPayementImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          usdQrPayementImagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const { addDocs, updateDocs } = useCollection("payment_methods");
    const handleSubmit = async () => {
      isLoading.value = true;
      if (bankName.value) {
        try {
          let imageUrl = null;
          let usdImageUrl = null;
          // kh qr payement image
          if (khQrPayementImage.value && usdQrPayementImage.value) {
            const storageReference = storageRef(
              projectStorage,
              `images/${khQrPayementImage.value.name}`
            );
            const snapshot = await uploadBytes(
              storageReference,
              khQrPayementImage.value
            );
            imageUrl = await getDownloadURL(snapshot.ref);
          }
          // usd qr payement image
          if (usdQrPayementImage.value) {
            const storageReference = storageRef(
              projectStorage,
              `images/${usdQrPayementImage.value.name}`
            );
            const snapshot = await uploadBytes(
              storageReference,
              usdQrPayementImage.value
            );
            usdImageUrl = await getDownloadURL(snapshot.ref);
          }
          if (props.dataToEdit) {
            const docRef = doc(
              projectFirestore,
              "payment_methods",
              props.dataToEdit.id
            );
            await updateDocs(props.dataToEdit.id, {
              bank_name: bankName.value,
              kh_qr_payement_image:
                imageUrl || props.dataToEdit.kh_qr_payement_image,
              usd_qr_payement_image:
                usdImageUrl || props.dataToEdit.usd_qr_payement_image,
            });
            emit("toast", "payment method updated successfully!", "success");
            emit("close");
          } else {
            // Add new document
            await addDocs({
              bank_name: bankName.value,
              branch_id: marts.value[0]?.id,
              status: true,
              created_at: timestamp(),
              kh_qr_payement_image: imageUrl,
              usd_qr_payement_image: usdImageUrl,
            });
            emit("toast", "payment method created successfully!", "success");
            emit("close");
          }
          khQrPayementImage.value = null;
          khQrPayementImagePreview.value = null;
        } catch (error) {
          console.error("Error saving payment method:", error);
          emit(
            "toast",
            "Failed to save payment method. Please try again.",
            "error"
          );
        }
      } else {
        alert("Please fill out the payment method  name.");
      }
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([fetchMartsForCurrentUser()]);
      if (props.dataToEdit) {
        bankName.value = props.dataToEdit.bank_name;
        khQrPayementImagePreview.value = props.dataToEdit.kh_qr_payement_image;
        usdQrPayementImagePreview.value =
          props.dataToEdit.usd_qr_payement_image;
      }
    });
    const handleCancel = () => {
      bankName.value = "";
      khQrPayementImage.value = null;
      usdQrPayementImage.value = null;
      khQrPayementImagePreview.value = null;
      usdQrPayementImagePreview.value = null;
    };
    return {
      bankName,
      marts,
      handleSubmit,
      currentUser,
      handleImageUpload,
      handleCancel,
      khQrPayementImagePreview,
      usdQrPayementImagePreview,
      handleUsdQrPayementImageUpload,
      Bank,
      isLoading,
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

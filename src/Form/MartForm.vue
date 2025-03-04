<template>
  <div
    class="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-up animate-once animate-duration-300"
  >
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">
      {{ marts.length > 0 ? "Update Mart" : "Create Mart" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-3 gap-6">
      <!-- Mart Name -->

      <div>
        <label for="name" class="block text-gray-600 mb-1"
          >Mart Name <span class="text-red-500"> * </span></label
        >
        <InputText
          v-model="name"
          type="text"
          placeholder="Please Enter Mart Name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Location -->
      <div>
        <label for="location" class="block text-gray-600 mb-1"
          >Location <span class="text-red-500"> * </span></label
        >
        <InputText
          v-model="location"
          type="text"
          placeholder="Please Enter Location"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <!-- Category -->
      <div>
        <label for="category" class="block text-gray-600 mb-1"
          >Category <span class="text-red-500"> * </span></label
        >
        <Select
          v-model="Mart_category"
          :options="items"
          optionLabel="name"
          placeholder="Please Select Category"
          class="w-full"
          id="category"
          showClear
          filter
        />
      </div>
      <!-- Profile Image -->
      <div>
        <label class="block text-gray-600 mb-1"
          >Profile Image (Max 1MB) <span class="text-red-500"> * </span></label
        >
        <input
          type="file"
          @change="handleProfileImage"
          accept="image/*"
          class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <img
          v-if="profileImagePreview"
          :src="profileImagePreview"
          alt="Profile Preview"
          class="mt-2 w-24 h-24 rounded-lg object-cover"
        />
        <span v-if="profileImageError" class="text-red-500 text-sm">{{
          profileImageError
        }}</span>
      </div>

      <!-- Cover Images -->
      <div>
        <label class="block text-gray-600 mb-1"
          >Cover Images (Max 3 images, 1MB each)
          <span class="text-red-500"> * </span></label
        >
        <input
          type="file"
          @change="handleCoverImages"
          accept="image/*"
          multiple
          class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div class="mt-2 grid grid-cols-3 gap-2">
          <img
            v-for="(image, index) in coverImagesPreviews"
            :key="index"
            :src="image"
            alt="Cover Preview"
            class="w-56 h-24 rounded-lg object-cover"
          />
        </div>
        <span v-if="coverImagesError" class="text-red-500 text-sm">{{
          coverImagesError
        }}</span>
      </div>

      <!-- Description -->
      <div class="col-span-3">
        <label for="Mart_Description" class="block text-gray-600 mb-1"
          >Description <span class="text-red-500"> * </span></label
        >
        <textarea
          v-model="Mart_Description"
          id="Mart_Description"
          placeholder="Description"
          rows="4"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Open and Close Time -->
      <div>
        <label class="block text-gray-600 mb-1"
          >Open Time <span class="text-red-500"> * </span></label
        >
        <DatePicker
          v-model="openTime"
          type="time"
          id="datepicker-timeonly"
          timeOnly
          fluid
          placeholder="Open Time"
          showClear
        />
      </div>
      <div>
        <label class="block text-gray-600 mb-1"
          >Close Time <span class="text-red-500"> * </span></label
        >
        <DatePicker
          v-model="closeTime"
          type="time"
          id="datepicker-timeonly"
          timeOnly
          fluid
          placeholder="Close Time"
          showClear
        />
      </div>

      <!-- Phone Number -->
      <div>
        <label for="Phone_number" class="block text-gray-600 mb-1"
          >Phone Number <span class="text-red-500"> * </span></label
        >
        <input
          v-model="Phone_number"
          type="text"
          id="Phone_number"
          placeholder="Phone Number"
          required
          @input="onPhoneNumberInput"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Submit Button -->
      <div class="col-span-3 mt-6">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 bg-primary-5 text-white font-semibold rounded-md hover:bg-primary-5/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span v-if="!isLoading">
            {{ marts.length > 0 ? "Update Mart" : "Create New Mart" }}
          </span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
  <Toast />
</template>

<script>
import { onMounted, ref } from "vue";
import useCollection from "@/composible/useCollection";
import { timestamp } from "@/config/config";
import { getCollectionQuery } from "@/composible/getCollection";
import useStorage from "@/composible/useStorage";

import { where } from "firebase/firestore";
import { projectAuth } from "@/config/config";
import { useToast } from "primevue/usetoast";
import { formatPhoneNumber } from "@/helper/formatCurrecy";
export default {
  setup() {
    const { uploadImage } = useStorage();
    const { addDocs, updateDocs } = useCollection("marts");
    const toast = useToast();
    const onPhoneNumberInput = (event) => {
      Phone_number.value = formatPhoneNumber(event.target.value);
    };
    const showToast = (action, severity) => {
      let summary;
      switch (action) {
        case "create":
          severity = "success";
          summary = "Product Created";
          break;
        case "update":
          severity = "info";
          summary = "Product Updated";
          break;
        case "delete":
          summary = "Product Deleted";
          break;
        default:
          severity = "info";
          summary = "Action Completed";
      }

      toast.add({
        severity: severity,
        summary: summary,
        life: 3000,
      });
    };
    const isLoading = ref(false);
    const name = ref("");
    const location = ref("");
    const martImage = ref(null);
    const martCover = ref([]);
    const Mart_category = ref("");
    const Mart_Description = ref("");
    const Phone_number = ref("");
    const status = ref(true);
    const profileImagePreview = ref(null);
    const coverImagesPreviews = ref([]);
    const openTime = ref("");
    const closeTime = ref("");
    const profileImageError = ref("");
    const coverImagesError = ref("");
    const handleProfileImage = (event) => {
      const file = event.target.files[0];
      if (file && file.size <= 1048576) {
        martImage.value = file;
        profileImagePreview.value = URL.createObjectURL(file);
        profileImageError.value = "";
      } else {
        martImage.value = null;
        profileImageError.value = "Profile image must be under 1MB.";
        profileImagePreview.value = null;
      }
    };
    const currentUser = ref(null);

    const handleCoverImages = (event) => {
      const files = Array.from(event.target.files);
      if (files.length > 3) {
        coverImagesError.value = "You can upload a maximum of 3 cover images.";
        coverImagesPreviews.value = [];
        martCover.value = [];
      } else {
        const validFiles = [];
        const previews = [];
        for (let file of files) {
          if (file.size > 1048576) {
            coverImagesError.value = "Each cover image must be under 1MB.";
            martCover.value = [];
            coverImagesPreviews.value = [];
            return;
          }
          validFiles.push(file);
          previews.push(URL.createObjectURL(file));
        }
        martCover.value = validFiles;
        coverImagesPreviews.value = previews;
        coverImagesError.value = "";
      }
    };

    const handleSubmit = async () => {
      if (profileImageError.value || coverImagesError.value) {
        alert("Please fix the errors before submitting.");
        return;
      }

      if (!currentUser.value) {
        alert("User not authenticated.");
        return;
      }

      // Retain existing profile and cover images
      let profileImageUrl = marts.value[0]?.profileImageUrl || null;
      let coverImageUrls = [...(marts.value[0]?.coverImageUrls || [])];

      // Upload new profile image if provided
      if (martImage.value) {
        try {
          profileImageUrl = await uploadImage(
            `marts/${martImage.value.name}`,
            martImage.value
          );
        } catch (error) {
          console.error("Error uploading profile image:", error);
          alert("Failed to upload profile image.");
          return;
        }
      }

      // Upload new cover images if provided
      if (martCover.value.length > 0) {
        const newCoverImageUrls = [];
        for (const coverImage of martCover.value) {
          try {
            const coverImageUrl = await uploadImage(
              `marts/covers/${coverImage.name}`,
              coverImage
            );
            newCoverImageUrls.push(coverImageUrl);
          } catch (error) {
            console.error("Error uploading cover image:", error);
            alert("Failed to upload cover images.");
            return;
          }
        }
        // Replace existing cover images with newly uploaded ones
        coverImageUrls = newCoverImageUrls;
      }

      // Prepare mart data
      const martData = {
        name: name.value,
        location: location.value,
        Mart_category: Mart_category.value,
        Mart_Description: Mart_Description.value,
        Phone_number: Phone_number.value,
        status: true,
        profileImageUrl: profileImageUrl, // Use new or existing URL
        coverImageUrls: coverImageUrls, // Use new or existing URLs
        createdAt:
          marts.value.length > 0 ? marts.value[0].createdAt : timestamp(),
        ownerId: currentUser.value.uid,
        openTime: openTime.value,
        closeTime: closeTime.value,
      };

      isLoading.value = true;

      try {
        if (marts.value.length > 0) {
          // Update existing mart
          await updateDocs(marts.value[0].id, martData);
          showToast("update", "success");
        } else {
          // Create a new mart
          await addDocs(martData);
          showToast("create", "success");
        }
      } catch (error) {
        console.error("Error submitting mart data:", error);
        showToast(marts.value.length > 0 ? "update" : "create", "error");
      } finally {
        isLoading.value = false;
      }
    };

    // Fetch Main Categories
    const items = ref([]);
    const getData = async () => {
      try {
        await getCollectionQuery(
          "maincategory",
          [],
          (data) => {
            items.value = data;
          },
          true
        );
        console.log("Main Categories:", items.value);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const marts = ref([]);
    const fetchMartsForCurrentUser = async () => {
      if (currentUser?.value) {
        const userId = currentUser.value?.uid; // Get current user's ID
        const conditions = [where("ownerId", "==", userId)];
        await getCollectionQuery("marts", conditions, (data) => {
          marts.value = data;
          console.log("mart data", marts.value);
        });

        if (marts.value.length > 0) {
          const mart = marts.value[0]; // Get the first mart
          Phone_number.value = mart?.Phone_number || null;
          location.value = mart?.location || null;
          name.value = mart?.name || null;

          // Bind existing image URLs
          martCover.value = []; // Reset file input
          martImage.value = null; // Reset file input
          coverImagesPreviews.value = [...(mart?.coverImageUrls || [])];
          profileImagePreview.value = mart?.profileImageUrl;

          Mart_category.value = mart?.Mart_category || null;
          Mart_Description.value = mart?.Mart_Description || null;
          openTime.value = mart?.openTime?.toDate() || null;
          closeTime.value = mart?.closeTime?.toDate() || null;
        }
      } else {
        console.error("No user is currently logged in.");
      }
    };

    onMounted(async () => {
      currentUser.value = projectAuth.currentUser;
      await Promise.allSettled([getData(), fetchMartsForCurrentUser()]);
      if (!currentUser.value) {
        router.push({ name: "login" });
      }
      console.log("currentUser", currentUser.value?.uid);
    });

    return {
      name,
      location,
      martImage,
      martCover,
      Mart_category,
      Mart_Description,
      Phone_number,
      status,
      profileImageError,
      coverImagesError,
      handleProfileImage,
      handleCoverImages,
      handleSubmit,
      items,
      profileImagePreview,
      coverImagesPreviews,
      closeTime,
      openTime,
      marts,
      isLoading,
      onPhoneNumberInput,
    };
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>

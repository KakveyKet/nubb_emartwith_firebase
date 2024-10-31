<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group flex flex-col gap-2">
        <label for="name">Product Name</label>
        <InputText v-model="name" type="text" class="searchInput" />
      </div>
      <div class="form-group flex flex-col gap-2">
        <label for="location">Location</label>
        <InputText v-model="location" type="text" class="searchInput" />
      </div>
      <div class="form-group flex flex-col gap-2">
        <label for="martImage">Profile Image (Max 1MB)</label>
        <FileUpload
          name="images"
          :customUpload="true"
          @select="handleProfileImage"
          accept="image/*"
          :maxFileSize="1000000"
        />
        <span v-if="profileImageError" class="error">{{
          profileImageError
        }}</span>
        <div class="flex gap-2">
          <img
            v-if="profilePreview"
            :src="profilePreview"
            alt="Profile Preview"
            class="w-20 h-20 object-cover"
          />
        </div>
      </div>

      <div class="form-group flex flex-col gap-2">
        <label for="martCover">Cover Images (Max 3 images, 1MB each)</label>
        <FileUpload
          name="images"
          :multiple="true"
          :customUpload="true"
          @select="handleCoverImages"
          accept="image/*"
          :maxFileSize="1000000"
        />
        <span v-if="coverImagesError" class="error">{{
          coverImagesError
        }}</span>
        <div class="flex gap-2">
          <img
            v-for="preview in coverPreview"
            :key="preview"
            :src="preview"
            alt="Cover Preview"
            class="w-20 h-20 object-cover"
          />
        </div>
      </div>

      <div class="form-group flex flex-col gap-2">
        <label for="Mart_category">Category</label>
        <Select
          v-model="Mart_category"
          :options="items"
          optionLabel="name"
          placeholder="Select Category"
          filter
        />
      </div>
      <div class="form-group flex flex-col gap-2">
        <label for="Mart_Description">Description</label>
        <Textarea
          v-model="Mart_Description"
          id="Mart_Description"
          required
        ></Textarea>
      </div>
      <div class="form-group flex flex-col gap-2">
        <label for="Phone_number">Phone Number</label>
        <InputText
          v-model="Phone_number"
          type="text"
          id="Phone_number"
          required
        />
      </div>
      <div class="form-group mt-4">
        <div class="flex justify-end gap-2">
          <Button severity="danger" label="Cancel" @click="handleClose" />
          <Button type="submit">{{ dataToEdit ? "Update" : "Create" }}</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { projectAuth, timestamp } from "@/config/config";
import useCollection from "@/composible/useCollection";
import { getCollectionQuery } from "@/composible/getCollection";
import useStorage from "@/composible/useStorage";
import Button from "primevue/button";
export default {
  props: ["dataToEdit"],
  setup(props, { emit }) {
    const { uploadImage } = useStorage();
    const { addDocs, updateDocs } = useCollection("marts");

    const name = ref("");
    const location = ref("");
    const martImage = ref(null);
    const martCover = ref([]);
    const Mart_category = ref("");
    const Mart_Description = ref("");
    const Phone_number = ref("");
    const status = ref(true);
    const profileImageError = ref("");
    const coverImagesError = ref("");
    const currentUser = ref(null);
    const profilePreview = ref("");
    const coverPreview = ref([]);

    onMounted(() => {
      currentUser.value = projectAuth.currentUser;
      if (!currentUser.value) {
        router.push({ name: "login" });
      }
      if (props.dataToEdit) {
        // Prefill data if editing
        name.value = props.dataToEdit.name;
        location.value = props.dataToEdit.location;
        Mart_category.value = props.dataToEdit.Mart_category;
        Mart_Description.value = props.dataToEdit.Mart_Description;
        Phone_number.value = props.dataToEdit.Phone_number;
        status.value = props.dataToEdit.status;
        profilePreview.value = props.dataToEdit.profileImageUrl || "";
        coverPreview.value = props.dataToEdit.coverImageUrls || [];
      }
    });

    const handleProfileImage = (event) => {
      const file = event.files[0]; // Access file from event
      if (file && file.size <= 1048576) {
        martImage.value = file;
        profileImageError.value = "";
        profilePreview.value = URL.createObjectURL(file); // Set preview
      } else {
        martImage.value = null;
        profileImageError.value = "Profile image must be under 1MB.";
        profilePreview.value = "";
      }
    };

    const handleCoverImages = (event) => {
      const files = Array.from(event.files); // Access files array from event
      if (files.length > 3) {
        coverImagesError.value = "You can upload a maximum of 3 cover images.";
        martCover.value = [];
        coverPreview.value = [];
      } else {
        const validFiles = files.filter((file) => file.size <= 1048576);
        if (validFiles.length < files.length) {
          coverImagesError.value = "Each cover image must be under 1MB.";
          return;
        }
        martCover.value = validFiles;
        coverPreview.value = validFiles.map((file) =>
          URL.createObjectURL(file)
        );
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

      let profileImageUrl = profilePreview.value;
      let coverImageUrls = coverPreview.value;

      if (martImage.value && martImage.value.name) {
        profileImageUrl = await uploadImage(
          `marts/${martImage.value.name}`,
          martImage.value
        );
      } else {
        console.warn("Profile image file is missing or has no name.");
      }

      coverImageUrls = [];
      for (const coverImage of martCover.value) {
        if (coverImage && coverImage.name) {
          const coverImageUrl = await uploadImage(
            `marts/covers/${coverImage.name}`,
            coverImage
          );
          coverImageUrls.push(coverImageUrl);
        } else {
          console.warn("One of the cover images is missing or has no name.");
        }
      }

      const martData = {
        name: name.value,
        location: location.value,
        Mart_category: Mart_category.value,
        Mart_Description: Mart_Description.value,
        Phone_number: Phone_number.value,
        status: true,
        profileImageUrl,
        coverImageUrls,
        createdAt: timestamp(),
        ownerId: currentUser.value.uid,
      };

      try {
        if (props.dataToEdit) {
          await updateDocs(props.dataToEdit.id, martData);
          alert("Mart updated successfully!");
        } else {
          await addDocs(martData);
          alert("Mart created successfully!");
        }
        emit("close");
      } catch (error) {
        console.error("Error creating mart:", error);
        alert("Failed to create Mart.");
      }
    };

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
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    onMounted(() => {
      getData();
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
      profilePreview,
      coverPreview,
    };
  },
};
</script>

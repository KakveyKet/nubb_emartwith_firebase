<template>
  <div class="form-container">
    <h2>Create Product</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input v-model="name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input v-model="location" type="text" id="location" required />
      </div>

      <div class="form-group">
        <label for="martImage">Profile Image (Max 1MB)</label>
        <input
          type="file"
          @change="handleProfileImage"
          accept="image/*"
          required
        />
        <span v-if="profileImageError" class="error">{{
          profileImageError
        }}</span>
      </div>

      <div class="form-group">
        <label for="martCover">Cover Images (Max 3 images, 1MB each)</label>
        <input
          type="file"
          @change="handleCoverImages"
          accept="image/*"
          multiple
          required
        />
        <span v-if="coverImagesError" class="error">{{
          coverImagesError
        }}</span>
      </div>

      <div class="form-group">
        <label for="Mart_category">Category</label>
        <input
          v-model="Mart_category"
          type="text"
          id="Mart_category"
          required
        />
      </div>
      <select v-model="Mart_category">
        <option :value="option.id" :label="option.name" v-for="option in items">
          {{ option.name }}
        </option>
      </select>
      <div class="form-group">
        <label for="Mart_Description">Description</label>
        <textarea
          v-model="Mart_Description"
          id="Mart_Description"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="Phone_number">Phone Number</label>
        <input v-model="Phone_number" type="text" id="Phone_number" required />
      </div>

      <div class="form-group">
        <button type="submit">Create Product</button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useCollection from "@/composible/useCollection";
import { timestamp } from "@/config/config";
import { getCollectionQuery } from "@/composible/getCollection";
import useStorage from "@/composible/useStorage";
export default {
  setup() {
    const { uploadImage } = useStorage();

    const { addDocs } = useCollection("marts");
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

    const handleProfileImage = (event) => {
      const file = event.target.files[0];
      if (file && file.size <= 1048576) {
        // 1MB = 1048576 bytes
        martImage.value = file;
        profileImageError.value = "";
      } else {
        martImage.value = null;
        profileImageError.value = "Profile image must be under 1MB.";
      }
    };

    const handleCoverImages = (event) => {
      const files = event.target.files;
      if (files.length > 3) {
        coverImagesError.value = "You can upload a maximum of 3 cover images.";
        martCover.value = [];
      } else {
        const validFiles = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 1048576) {
            coverImagesError.value = "Each cover image must be under 1MB.";
            martCover.value = [];
            return;
          } else {
            validFiles.push(files[i]);
          }
        }
        martCover.value = validFiles;
        coverImagesError.value = "";
      }
    };

    const handleSubmit = async () => {
      if (profileImageError.value || coverImagesError.value) {
        alert("Please fix the errors before submitting.");
        return;
      }

      let profileImageUrl = null;
      let coverImageUrls = [];

      // Upload profile image
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

      // Upload cover images
      for (const coverImage of martCover.value) {
        try {
          const coverImageUrl = await uploadImage(
            `marts/covers/${coverImage.name}`,
            coverImage
          );
          coverImageUrls.push(coverImageUrl);
        } catch (error) {
          console.error("Error uploading cover image:", error);
          alert("Failed to upload cover images.");
          return;
        }
      }

      const martData = {
        name: name.value,
        location: location.value,
        Mart_category: Mart_category.value,
        Mart_Description: Mart_Description.value,
        Phone_number: Phone_number.value,
        status: true,
        profileImageUrl: profileImageUrl,
        coverImageUrls: coverImageUrls,
        createdAt: timestamp(),
      };

      try {
        const result = await addDocs(martData);
        alert("Mart created successfully!");
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
        console.log("====================================");
        console.log("data", items);
        console.log("====================================");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    onMounted(() => {
      getData();
    });
    // category
    // const category_name = ref("");
    // const cate_status = ref(true);
    // const addCategory = async () => {
    //   try {
    //     const reqBody = {
    //       name: category_name.value,
    //       status: true,
    //       createdAt: timestamp(),
    //     };
    //     const result = await addDocs(reqBody);
    //     console.log("result", result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
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
      // addCategory,
      // cate_status,
      // category_name,
    };
  },
};
</script>

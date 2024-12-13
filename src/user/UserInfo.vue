<template>
  <div
    class="h-screen flex items-center justify-center bg-primary-1 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div v-for="i in user" class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0">
              <img
                v-if="i.image"
                class="mx-auto h-20 w-20 rounded-full border-4 border-white z-10 object-cover"
                :src="i.image"
                :alt="i.username || 'User Avatar'"
              />
              <div
                v-else
                class="mx-auto h-20 w-20 bg-primary-7 rounded-full border-4 border-white flex items-center justify-center relative group"
              >
                <InputText
                  type="file"
                  @change="handleImageUpload"
                  class="w-full h-full opacity-0 cursor-pointer fixed top-0 left-0 z-50"
                />
                <p
                  class="text-13px w-full text-center h-full flex cursor-pointer items-center justify-center rounded-full font-bold text-white bg-black/50 absolute bottom-0 opacity-0 right-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Upload
                </p>
                <p class="text-24px font-bold text-white">
                  {{ i.username[0] || "Loading..." }}
                </p>
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Image Preview"
                  class="w-full h-full object-cover absolute top-0 left-0 rounded-full z-10"
                />
              </div>
            </div>
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p class="text-24px font-bold text-primary-9">
                {{ i.username || "Loading..." }}
              </p>
              <div class="flex-grow">
                <label
                  for="profile-image"
                  class="block text-13px w-full px-4 py-2 font-medium text-primary-6 bg-primary-2 rounded-md cursor-pointer hover:bg-primary-3 transition duration-300 ease-in-out text-center"
                >
                  Choose New Image
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 border-t border-primary-3 pt-6">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-16px font-medium text-primary-8">Username</dt>
              <InputText v-model="username" type="text" class="w-full !h-8" />
            </div>
            <div class="sm:col-span-1">
              <dt class="text-16px font-medium text-primary-8">Email</dt>
              <InputText
                disabled
                v-model="email"
                type="email"
                class="w-full !h-8"
              />
            </div>
            <div class="sm:col-span-1">
              <dt class="text-16px font-medium text-primary-8">Phone</dt>

              <InputText
                v-model="phoneNumber"
                type="text"
                class="w-full !h-8"
              />
            </div>
            <!-- re-upload image -->
          </dl>
        </div>

        <div class="mt-6 flex items-end justify-between space-x-3">
          <div class="sm:col-span-2">
            <label class="text-16px font-medium text-primary-8 mb-2">
              Profile Image
            </label>
            <div class="flex items-center space-x-4">
              <div
                class="relative group size-40 rounded-md border-dashed overflow-hidden bg-primary-2 border-2 border-primary-4 flex items-center justify-center"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Profile Picture Preview"
                  class="w-full h-full object-cover"
                />
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-primary-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <div
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-13px">Change</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-md items-center flex justify-end space-x-3">
            <!-- back btn -->
            <Button
              @click="router.back()"
              severity="secondary"
              class="bg-primary-7 text-white px-4 py-1 rounded-md h-8"
            >
              Back
            </Button>
            <Button
              @click="saveUser()"
              style="background-color: #88bf68; color: #fff"
              class="bg-primary-7 text-white px-4 py-1 rounded-md h-8 !border-none hover:!bg-primary-6"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCollectionQuery } from "@/composible/getCollection";
import { where } from "firebase/firestore";
import useCollection from "@/composible/useCollection";
import { projectStorage } from "@/config/config";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref([]);
    const email = ref(null);
    const phoneNumber = ref(null);
    const username = ref(null);
    const image = ref(null);
    const imagePreview = ref(null);
    const imageFile = ref(null);
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      imagePreview.value = URL.createObjectURL(file);
      imageFile.value = file;
    };
    const { updateDocs } = useCollection("users");
    const fetchUser = async (field, value) => {
      try {
        const conditions = [where(field, "==", value)];
        await getCollectionQuery(
          "users",
          conditions,
          (data) => {
            if (data.length > 0) {
              user.value = data.map((doc) => ({ ...doc, id: doc.id })); // Ensure `id` is included
              email.value = user.value[0].email;
              phoneNumber.value = user.value[0].phoneNumber;
              image.value = user.value[0].image;
              username.value = user.value[0].username;
            } else {
              console.error("No user found with the given ID.");
            }
          },
          true
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const saveUser = async () => {
      try {
        let imageUrl = image.value; // Default to existing image URL

        // Upload new image if one is selected
        if (imageFile.value) {
          const storageReference = storageRef(
            projectStorage,
            `profile_pictures/${Date.now()}_${imageFile.value.name}`
          );
          const snapshot = await uploadBytes(storageReference, imageFile.value);
          imageUrl = await getDownloadURL(snapshot.ref);
          console.log("Image uploaded successfully:", imageUrl);
        }

        // Ensure user ID exists before updating
        if (!user.value[0]?.id) {
          console.error("User ID is missing. Cannot update.");
          return;
        }

        // Update Firestore document
        await updateDocs(user.value[0].id, {
          email: email.value,
          phoneNumber: phoneNumber.value,
          image: imageUrl,
          username: username.value,
        });
        console.log("User updated successfully.");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    onMounted(() => {
      fetchUser("id", route.params.id);
    });

    return {
      user,
      email,
      phoneNumber,
      image,
      router,
      handleImageUpload,
      imagePreview,
      saveUser,
      username,
    };
  },
};
</script>

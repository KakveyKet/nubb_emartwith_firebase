<template>
  <div class="w-full h-screen flex items-center justify-center">
    <form class="space-y-3" @submit.prevent="handleSignUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="displayName"
        type="text"
        placeholder="Display Name"
        required
      />

      <!-- Role Selection -->
      <select v-model="role" required>
        <option value="manager">Manager</option>
        <option value="super admin">Super Admin</option>
        <option value="staff">Staff</option>
      </select>

      <button type="submit" :disabled="isPending">Sign Up</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignUp from "@/composible/SignUp";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const role = ref("manager"); // Default role selection
    const router = useRouter();
    const { error, isPending, signup } = useSignUp();

    const handleSignUp = async () => {
      await signup(email.value, password.value, displayName.value, role.value);
      router.push({ path: "/admindashboard" });
    };

    return {
      email,
      password,
      displayName,
      role,
      error,
      isPending,
      handleSignUp,
    };
  },
};
</script>
<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>

      <!-- Submit Button -->
      <div class="form-group">
        <button type="submit" :disabled="isPending">
          {{ isPending ? "Logging in..." : "Login" }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignIn from "@/composible/SignIn";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, isPending, signin } = useSignIn();

    const handleSubmit = async () => {
      await signin(email.value, password.value);
      router.push({ path: "/dashboard" });
    };

    return {
      email,
      password,
      error,
      isPending,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.login-container {
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

input {
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

button:disabled {
  background-color: #007bff88;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>

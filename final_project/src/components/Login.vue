<template>
  <div class="min-h-screen flex items-center justify-center">

    <form @submit.prevent="handleLogin" class="bg-base-200 p-6 rounded-xl w-80">

      <h2 class="text-xl font-bold mb-4 text-center">Login</h2>

      <input v-model="email" type="email" placeholder="Email"
        class="input input-bordered w-full mb-3" />

      <input v-model="password" type="password" placeholder="Password"
        class="input input-bordered w-full mb-3" />

      <p v-if="error" class="text-error">
        {{ error }}
      </p>

      <button class="btn btn-primary w-full text-white">
        Login
      </button>

    </form>

  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    handleLogin() {
      const auth = useAuthStore();

      
      if (this.email === "admin@gmail.com" && this.password === "1234") {

        auth.login(this.email); 

        this.$router.push("/products");

      } else {
        this.error = "Wrong email or password";
      }
    }
  }
};
</script>
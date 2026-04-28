<template>

<nav class="fixed w-full z-20 top-0 start-0 border-b border-default bg-neutral-primary/60 backdrop-blur-md">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <!-- LOGO -->
    <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/src/assets/logo3.png" class="h-7" />
    </router-link>

    <!-- MENU -->
    <div class="hidden w-full md:block md:w-auto">
      <ul class="font-medium flex flex-col md:flex-row md:space-x-8">

        <li>
          <router-link to="/" class="text-heading">Home</router-link>
        </li>

        <li>
          <router-link to="/products" class="text-heading">Product</router-link>
        </li>

        <li v-if="auth.isLoggedIn">
          <router-link to="/crud" class="text-heading">
            Add Coffee
          </router-link>
        </li>

        <li v-if="!auth.isLoggedIn">
          <router-link to="/login" class="text-fg-brand">
            Login
          </router-link>
        </li>

        <li v-else>
          <button @click="logout" class="text-error">
            Logout
          </button>
        </li>

      </ul>
    </div>

  </div>
</nav>

</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter();

    const logout = () => {
      auth.logout();
      router.push("/login");
    };

    return { auth, logout };
  }
};
</script>
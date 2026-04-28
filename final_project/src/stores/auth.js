import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const saved = localStorage.getItem("auth");

    return {
      isLoggedIn: !!saved,
      user: saved ? JSON.parse(saved) : null,
    };
  },

  actions: {
    login(email) {
      this.isLoggedIn = true;
      this.user = { email };

      localStorage.setItem("auth", JSON.stringify(this.user));
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;

      localStorage.removeItem("auth");
    },
  },
});
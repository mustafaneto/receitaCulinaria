import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async logIn(login, senha) {
      try {
        const response = await fetch("http://localhost:3000/usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, senha }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        console.log(data);

        this.isLoggedIn = true;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    logOut() {
      this.isLoggedIn = false;
    },
    async cadastro(userData) {
      try {
        const response = await fetch(
          "http://localhost:3000/usuarios/cadastrar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const data = await response.json();
        console.log("User registered:", data);
      } catch (error) {
        console.error("Registration error:", error.response.data);
        throw new Error("Registration failed");
      }
    },
  },
});

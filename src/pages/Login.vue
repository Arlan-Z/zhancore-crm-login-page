<template>
  <div class="login-container">
    <Logo class="zhancore-logo"/>

    <Card>
      <div class="login-header">
        <p>Please provide your credentials</p>
      </div>

      <form @submit.prevent="handleLogin">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          v-model="email"
          :error="emailError"
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          v-model="password"
          :error="passwordError"
        />

        <button type="submit" class="login-btn" :class="{ loading }">
          <span class="btn-text">{{ loading ? "Signing in..." : "Sign In" }}</span>
          <span class="btn-loader"></span>
        </button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "../components/Card.vue";
import FormInput from "../components/FormInput.vue";
import Logo from "@/components/Logo.vue";

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const loading = ref(false);
const success = ref(false);

const handleLogin = () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) emailError.value = "Email required";
  if (!password.value) passwordError.value = "Password required";
  if (emailError.value || passwordError.value) return;

  loading.value = true;

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    loading.value = false;

    if (user) {
      success.value = true;
    } else {
      passwordError.value = "Invalid email or password";
    }
  }, 1000);
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 24px auto 0;         
  display: flex;
  flex-direction: column;
  gap: 70px;
}

.zhancore-logo {
  width: 300px;
  align-self: center;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h2 {
  color: var(--darker-blue-color);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.login-header p {
  color: #666;
  font-size: 0.95rem;
}

.login-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background-color: var(--dark-blue-color);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

.login-btn:hover {
  background-color: var(--blue-color);
  transform: translateY(-1px);
}

.login-btn.loading {
  pointer-events: none;
  opacity: 0.7;
}

/* Loader */
.btn-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  opacity: 0;
  animation: spin 1s linear infinite;
  transition: opacity 0.3s ease;
}

.login-btn.loading .btn-text {
  opacity: 0;
}

.login-btn.loading .btn-loader {
  opacity: 1;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 480px) {
  .login-header h2 {
    font-size: 1.6rem;
  }
}
</style>

<template>
  <div class="login-container">
    <Card>
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
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

        <button type="submit" class="login-btn btn" :class="{ loading }">
          <span class="btn-text">{{ loading ? "Signing in..." : "Sign In" }}</span>
          <span class="btn-loader"></span>
        </button>
      </form>

      <div class="success-message" :class="{ show: success }">
        <div class="success-icon">✓</div>
        <h3>Login Successful!</h3>
        <p>Redirecting to your dashboard...</p>
      </div>
    </Card>
  </div>
</template>

<script>
import { ref } from "vue";
import Card from "../components/Card.vue";
import FormInput from "../components/FormInput.vue";

export default {
  components: { Card, FormInput },
  setup() {
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

    return { email, password, emailError, passwordError, loading, success, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 420px;
  perspective: 1000px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.btn {
  background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
}

.btn.loading {
  pointer-events: none;
}

.btn-text {
  transition: opacity 0.3s ease;
}

.btn-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  opacity: 0;
  animation: spin 1s linear infinite;
  transition: opacity 0.3s ease;
}

.btn.loading .btn-text {
  opacity: 0;
}

.btn.loading .btn-loader {
  opacity: 1;
}

.success-message {
  display: none;
  text-align: center;
  padding: 40px 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.success-message.show {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin: 0 auto 20px;
  animation: successPulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.signup-link {
  text-align: center;
}

.signup-link p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.signup-link a {
  color: #06b6d4;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.signup-link a:hover {
  color: white;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes successPulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .login-header h2 {
    font-size: 1.75rem;
  }
}
</style>

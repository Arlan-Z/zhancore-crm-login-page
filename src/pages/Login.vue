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
          <span class="btn-text">{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          <span class="btn-loader"></span>
        </button>
      </form>

      <div class="signup-link">
        <p>
          Haven’t signed up yet?
          <router-link to="/signup">Sign up</router-link>
        </p>
      </div>

      <div class="success-message" :class="{ show: success }">
        <div class="success-icon">✓</div>
        <h3>Login Successful!</h3>
        <p>Redirecting to your dashboard...</p>
      </div>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import Card from '../components/Card.vue'
import FormInput from '../components/FormInput.vue'
import { useRouter } from 'vue-router'

export default {
  components: { Card, FormInput },
  setup() {
    const email = ref('')
    const password = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const loading = ref(false)
    const success = ref(false)
    const router = useRouter()

    const handleLogin = () => {
      emailError.value = ''
      passwordError.value = ''

      if (!email.value) emailError.value = 'Email required'
      if (!password.value) passwordError.value = 'Password required'
      if (emailError.value || passwordError.value) return

      loading.value = true

      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email.value && u.password === password.value)

        loading.value = false

        if (user) {
          success.value = true
          setTimeout(() => router.push('/dashboard'), 1000)
        } else {
          passwordError.value = 'Invalid email or password'
        }
      }, 1000)
    }

    return { email, password, emailError, passwordError, loading, success, handleLogin }
  }
}
</script>

<style scoped>
/* Your existing login styles (container, header, etc.) go here */
</style>

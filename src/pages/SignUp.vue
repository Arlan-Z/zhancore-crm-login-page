<template>
  <div class="signup-container">
    <Card>
      <div class="signup-header">
        <h2>Create Account</h2>
        <p>Sign up to start using your CRM</p>
      </div>

      <form @submit.prevent="handleSignUp">
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
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          v-model="confirmPassword"
          :error="confirmPasswordError"
        />

        <button type="submit" class="signup-btn btn" :class="{ loading }">
          <span class="btn-text">{{ loading ? 'Signing up...' : 'Sign Up' }}</span>
          <span class="btn-loader"></span>
        </button>
      </form>

      <div class="login-link">
        <p>
          Already have an account? 
          <router-link to="/">Log in</router-link>
        </p>
      </div>

      <div class="success-message" :class="{ show: success }">
        <div class="success-icon">✓</div>
        <h3>Sign Up Successful!</h3>
        <p>You can now log in.</p>
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
    const confirmPassword = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('')
    const loading = ref(false)
    const success = ref(false)
    const router = useRouter()

    const handleSignUp = () => {
      emailError.value = ''
      passwordError.value = ''
      confirmPasswordError.value = ''

      if (!email.value) emailError.value = 'Email required'
      if (!password.value) passwordError.value = 'Password required'
      if (password.value !== confirmPassword.value) confirmPasswordError.value = "Passwords don't match"

      if (emailError.value || passwordError.value || confirmPasswordError.value) return

      loading.value = true

      setTimeout(() => {
        loading.value = false
        success.value = true

        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push({ email: email.value, password: password.value })
        localStorage.setItem('users', JSON.stringify(users))

        setTimeout(() => router.push('/'), 1000)
      }, 1000)
    }

    return {
      email,
      password,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      loading,
      success,
      handleSignUp
    }
  }
}
</script>

<style scoped>
/* You can reuse most login CSS here, just adjust .signup-container, .signup-header etc. */
</style>

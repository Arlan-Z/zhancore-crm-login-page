import { ref } from 'vue'

export default function useAuth() {
  const isLoggedIn = ref(false)

  // ✅ Check if user is already logged in (from localStorage)
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isLoggedIn.value = true
  }

  const login = async (email, password) => {
    // Placeholder for future backend call
    /*
      Example:
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) throw new Error('Invalid credentials')
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
      isLoggedIn.value = true
    */

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === '123456') {
          localStorage.setItem('user', JSON.stringify({ email }))
          isLoggedIn.value = true
          resolve()
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')
    isLoggedIn.value = false
  }

  return { login, logout, isLoggedIn }
}

<template>
  <div class="form-input">
    <div class="input-wrapper" :class="{ 'has-error': error }">
      <input
        :id="id"
        :type="showPassword ? 'text' : type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        required
      />
      <label :for="id" :class="{ active: isActive }">{{ label }}</label>

      <!-- Password visibility toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="password-toggle"
        @click="togglePassword"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>

      <span class="focus-border"></span>
    </div>
    <span class="error-message" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    id: String,
    label: String,
    type: { type: String, default: 'text' },
    modelValue: String,
    error: String
  },
  emits: ['update:modelValue'],
  setup(props) {
    const isActive = ref(false)
    const showPassword = ref(false)

    const onFocus = () => (isActive.value = true)
    const onBlur = (e) => {
      if (!e.target.value) isActive.value = false
    }

    watch(
      () => props.modelValue,
      (val) => {
        isActive.value = !!val
      },
      { immediate: true }
    )

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    return { isActive, showPassword, onFocus, onBlur, togglePassword }
  }
}
</script>

<style scoped>
.form-input {
  margin-bottom: 1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 16px 40px 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  outline: none;
  transition: border 0.3s;
}

input:focus {
  border-color: #00bcd4;
}

label {
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  transition: all 0.3s;
}

label.active {
  top: -8px;
  left: 12px;
  font-size: 0.85rem;
  color: #00bcd4;
  background: rgba(0, 0, 0, 0.5);
  padding: 0 4px;
  border-radius: 4px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
}

.error-message {
  display: block;
  margin-top: 4px;
  color: #ff6b6b;
  font-size: 0.85rem;
}

.has-error input {
  border-color: #ff6b6b;
}
</style>

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

      <button
        v-if="type === 'password'"
        type="button"
        class="password-toggle"
        @click="togglePassword"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>
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

    const togglePassword = () => (showPassword.value = !showPassword.value)

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
  padding: 12px 40px 12px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #333;
  background: white;
  outline: none;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: var(--dark-blue-color);
}

label {
  position: absolute;
  left: 12px;
  top: 12px;
  font-size: 0.95rem;
  color: #777;
  background: white;
  padding: 0 4px;
  pointer-events: none;
  transition: all 0.2s ease;
}

label.active {
  top: -8px;
  font-size: 0.8rem;
  color: var(--dark-blue-color);
}

.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 1rem;
}

.error-message {
  display: block;
  margin-top: 4px;
  color: #e63946;
  font-size: 0.85rem;
}

.has-error input {
  border-color: #e63946;
}
</style>

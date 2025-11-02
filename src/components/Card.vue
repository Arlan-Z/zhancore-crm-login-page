<template>
  <div class="login-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
.login-card {
  background-color: var(--black-blue-color);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  max-width: 400px;
  margin: auto;
}
</style>

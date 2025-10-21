<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>

<template>
  <div class="fullscreen bg-amber-50">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>

<template>
  <div class="fullscreen">
    <b-button size="is-small"
              icon-left="github-circle">
      Add
    </b-button>
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

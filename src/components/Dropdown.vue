<template>
  <v-select
    :label="props.label"
    :items="props.items"
    v-model="model"
    variant="underlined"
  />
</template>

<script setup lang="ts">

interface Props {
  label: string,
  items: string[]
}

const props = defineProps<Props>()
const model = defineModel();



</script>

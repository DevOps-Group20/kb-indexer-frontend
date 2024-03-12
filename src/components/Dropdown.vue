<template>
  <div>
    {{label}}
    <select
      @update:model-value="emit('change')" v-model="model" :items="props.items">
      <option v-for="item in items" :key="item" :value="item">
        {{item}}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

interface Props {
  label: string,
  items?: string[],

}

const props = defineProps<Props>()
const model = defineModel();
const emit = defineEmits(['change']);


</script>

<template>
  <div class="flex-container">
    <div class="text">
      {{label}}
    </div>
    <b-select
      @update:model-value="emit('change')" v-model="model" :items="props.items">
      <option v-for="item in items" :key="item" :value="item">
        {{item}}
      </option>
    </b-select>
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

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
}

.text {
  margin-right: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}
</style>

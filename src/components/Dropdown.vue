<template>
  <div class="is-flex is-justify-content-center">
    <div class="text">
      {{ label }}
    </div>
    <b-select
      class="select-field is-info"
      @update:model-value="emit('change')" v-model="model" :items="props.items">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.name }}
      </option>
    </b-select>
  </div>
</template>

<script setup lang="ts">

import DropdownItem from "@/interfaces/DropdownItem";

interface Props {
  label: string,
  items?: DropdownItem[],
}

const props = defineProps<Props>()
const model = defineModel();
const emit = defineEmits(['change']);
</script>

<style scoped>
.text {
  margin-right: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  align-self: center;
}

.select-field {
  min-width: 40%;
}
</style>

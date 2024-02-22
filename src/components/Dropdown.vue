<template>
    <v-select @update:model-value="emit('change')" v-model="model" :label="props.label" :items="props.items"
        variant="solo" />
</template>

<script setup lang="ts">
import { ModelRef } from 'vue';


interface Props {
    label: string,
    items?: string[],

}

const props = defineProps<Props>()
const model: ModelRef<undefined, string> = defineModel();
const emit = defineEmits(['change']);



</script>

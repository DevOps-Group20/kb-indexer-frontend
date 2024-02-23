<template>
    <v-btn :icon="iconText" size="32px" @click="emit('toggle')"></v-btn>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
    isStop: {type: Boolean, default: false}
})

const emit = defineEmits(['toggle']);

const iconText = computed(() => props.isStop ? 'mdi-stop' : 'mdi-play');

</script>

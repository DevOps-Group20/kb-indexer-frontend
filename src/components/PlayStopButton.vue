<template>
    <v-btn :icon="iconText" size="32px" @click="toggle"></v-btn>
</template>

<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
    isStop: {type: Boolean, default: false}
})

const isStop = ref(props.isStop)

const toggle = () => isStop.value = !isStop.value

const iconText = computed(() => isStop.value ? 'mdi-stop' : 'mdi-play')

</script>

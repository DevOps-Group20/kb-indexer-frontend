<template>
    <b-button @click="emit('toggle')">{{isStop}}</b-button>
</template>

<script setup>
import VButton from "@/components/VButton.vue";

defineProps({
    isStop: {type: Boolean, default: false}
})

const emit = defineEmits(['toggle']);

</script>

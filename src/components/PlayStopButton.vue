<template>
    <VButton @click="emit('toggle')">{{isStop}}</VButton>
</template>

<script setup>
import VButton from "@/components/VButton.vue";

defineProps({
    isStop: {type: Boolean, default: false}
})

const emit = defineEmits(['toggle']);

</script>

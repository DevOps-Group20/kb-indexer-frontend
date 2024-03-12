<template>
    <button @click="emit('toggle')">{{isStop}}</button>
</template>

<script setup>

defineProps({
    isStop: {type: Boolean, default: false}
})

const emit = defineEmits(['toggle']);

</script>

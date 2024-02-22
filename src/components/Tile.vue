<template>
    <div class="tile">
        <div>
            Title
        </div>
        <div>
            <play-stop-button />
        </div>
    </div>
</template>

<script setup lang="ts">
import PlayStopButton from '@/components/PlayStopButton.vue'
</script>

<style scoped>
.tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 48px;
    height: 70px;
    margin-bottom: 12px;
    width: 100%;
    background-color: lightgray;
    border-radius: 15px;
}
</style>

<template>
  <div class="tile">
    <div>
      {{ props.title }}
    </div>
    <div class="right-controls">
      <status-indicator :status="props.status"/>
      <play-stop-button
        :is-stop="props.status === 'Running'"
        @toggle="emit('toggle')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayStopButton from '@/components/PlayStopButton.vue'
import StatusIndicator from "@/components/StatusIndicator.vue";

// Set disabled to true when waiting for server response to prevent user for spamming button
interface Props {
  title: string
  status: 'Ready' | 'Running' | 'Completed' | 'Failed'
}

const props = defineProps<Props>();
const emit = defineEmits(['toggle']);

</script>

<style scoped>
.tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  height: 70px;
  margin-bottom: 12px;
  background-color: lightgray;
  border-radius: 15px;
}

.right-controls {
  display: flex;
  align-items: center;
}
</style>

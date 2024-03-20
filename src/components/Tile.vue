<template>
  <div class="tile notification is-info is-light">
    <div>
      {{ props.title }}
    </div>
    <div class="right-controls">
      <b-tooltip
        v-if="cronSchedule"
        multilined
        :label="timeDescription">
        <b-icon
          icon="calendar-check"
        >
        </b-icon>
      </b-tooltip>
      <status-indicator :status="props.status"/>
      <restart-button
        class="restart-button"
        v-if="status == 'Failed'"
        @click="emit('restart')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RestartButton from '@/components/RestartButton.vue'
import StatusIndicator from "@/components/StatusIndicator.vue";
import cronstrue from 'cronstrue';
import {computed} from "vue";

// Set disabled to true when waiting for server response to prevent user for spamming button
interface Props {
  title: string
  status: 'Running' | 'Completed' | 'Failed',
  cronSchedule?: string //Cron
}

const props = defineProps<Props>();
const emit = defineEmits(['restart']);
const timeDescription = computed(() => props.cronSchedule ? cronstrue.toString(props.cronSchedule) : null)

</script>

<style scoped>
.tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  height: 70px;
  margin-bottom: 12px;
  border-radius: 15px;
}

.right-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

</style>

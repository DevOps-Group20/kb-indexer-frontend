<template>
  <div
    class="tile notification is-light"
    :class="{
      'is-warning': status === 'Running',
      'is-success': status === 'Completed',
      'is-danger': status === 'Failed',
      'is-info': status === 'Schedule'
    }"
  >
    <div>
      {{ props.title }}
    </div>
    <div class="right-controls">
      <b-tooltip
        v-if="cronSchedule"
        multilined
        type="is-success"
        :label="timeDescription">
        <b-icon
          icon="calendar-check"
        >
        </b-icon>
      </b-tooltip>
      <status-indicator v-if="status && status !== 'Schedule'" :status="props.status"/>
      <restart-button
        class="restart-button"
        v-if="status && status == 'Failed'"
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
import {JobStatus} from "@/interfaces/Job";

// Set disabled to true when waiting for server response to prevent user for spamming button
interface Props {
  title: string
  status?: JobStatus,
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
  padding: 0 34px;
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

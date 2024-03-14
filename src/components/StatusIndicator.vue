<template>
  <div class="status-indicator">
    <div>
      {{ text }}
    </div>
    <div class="circle-indicator"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

interface Props {
  status: 'Ready' | 'Running' | 'Completed' | 'Failed'
}

const props = defineProps<Props>()

const text = computed(() => {
  if (props.status === 'Ready') {
    return 'Ready';
  }
  if (props.status === 'Running') {
    return 'Running';
  }
  if (props.status === 'Completed') {
    return 'Completed';
  }
  if (props.status === 'Failed') {
    return 'Failed';
  }
  return '';
})

const indicator = computed(() => {
    if (props.status === 'Ready') {
      return 'white';
    }
    if (props.status === 'Running') {
      return 'yellow';
    }
    if (props.status === 'Completed') {
      return 'green';
    }
    if (props.status === 'Failed') {
      return 'red';
    }
    return 'unset';

})
</script>

<style scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 12px;
}

.circle-indicator {
    width: 5px;
    height: 5px;
    border-radius: 12px;
    background-color: v-bind(indicator);
}
</style>

<template>
  <b-button :type="buttonType" @click="handleClick">
    <slot></slot>
  </b-button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  buttonType: String,
  buttonAction: {
    type: Function,
    default: () => { console.log('No action defined'); },
  },
});

const handleClick = () => {
  console.log('Button clicked: ', props.buttonAction.name);
  props.buttonAction();
};
</script>

<template>
  <div class="source-selector-wrapper">
    <div class="source-selector">
      <div class="dropdown-wrapper">
        <dropdown
          class="dropdown"
          label="Indexer"
          v-model="model.indexer"
          :items="indexerItems"
          @change="onIndexerChange"
        />
        <dropdown
          class="dropdown"
          label="Sources"
          v-model="model.source"
          :items="sourceItems"
        />
      </div>
      <div class="right-buttons">
        <b-checkbox v-model="isScheduled">
          Schedule
        </b-checkbox>
        <div class="start-button-wrapper">
          <!-- TODO: put the isScheduled in a v-if with a transition inside. add transition to crontab -->
          <b-button
            :type="isScheduled ? 'is-warning' : 'is-success'"
            :icon-right="isScheduled ? 'clock' : 'play'"
            @click="startJob"
          >
            {{ isScheduled ? 'Schedule' : 'Start' }} Job
          </b-button>
        </div>
      </div>

    </div>
    <cron-light v-if="isScheduled" v-model="cron"/>
  </div>
</template>
<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import Dropdown from "@/components/Dropdown.vue";
import {computed, ComputedRef, ModelRef, Ref, ref, watch} from "vue";
import {toUpperCase} from "@/utils/string";
import {displayToast} from "@/utils/toast";
import DropdownItem from "@/interfaces/DropdownItem";
import {CronLight} from "@vue-js-cron/light";

interface Props {
  indexers: Indexer[]
}

interface Model {
  indexer: string | undefined;
  source: string | undefined
}

const props = defineProps<Props>();
const model: ModelRef<Model> = defineModel({default: {indexer: undefined, source: undefined}});
const emit = defineEmits(['startJob']);

const isScheduled = ref(false);
const cron: Ref<string | undefined> = ref(undefined);

watch(isScheduled, val => cron.value = val ? '* * * * *' : undefined);


const indexerItems: ComputedRef<DropdownItem[]> = computed(() => props.indexers.map(indexer => ({
  name: toUpperCase(indexer.name),
  value: indexer.name
})));

const sourceItems: ComputedRef<DropdownItem[] | undefined> = computed(() => {
  if (model.value.indexer) {
    return props.indexers.find(
      indexer => indexer.name === model.value.indexer
    )?.sources.map(source => ({name: toUpperCase(source.name), value: source.uuid}))
  }
})

function onIndexerChange() {
  model.value.source = undefined;
}

const currentJobTitle = computed(() => {
  const indexerTitle = indexerItems.value.find(indexer => indexer.value === model.value.indexer)?.name ?? '';
  const sourceTitle = sourceItems.value?.find(source => source.value === model.value.source)?.name ?? '';
  return `${indexerTitle} ${sourceTitle}`;
})


function startJob() {
  if (!model.value.indexer || !model.value.source) {
    displayToast('To start a Job an Indexer and a Source must be selected');
    return;
  }
  emit('startJob', currentJobTitle.value, model.value.source, cron.value);
}
</script>

<style scoped>
.source-selector-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.source-selector {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
}

.dropdown-wrapper {
  display: flex;
  gap: 10px;
}

.right-buttons {
  display: flex;
}
.start-button-wrapper {
  width: 160px;
  display: flex;
  justify-content: right;
}
</style>

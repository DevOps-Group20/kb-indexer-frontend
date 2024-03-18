<template>
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
    <b-button
      type="is-success"
      icon-right="play"
      @click="startJob"
    >
      Start Job
    </b-button>


  </div>
</template>
<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import Dropdown from "@/components/Dropdown.vue";
import {computed, ComputedRef, ModelRef} from "vue";
import {toUpperCase} from "@/utils/string";
import {defaultToast} from "@/utils/toast";
import {runIndexingPipeline} from "@/utils/endpoints";
import DropdownItem from "@/interfaces/DropdownItem";

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


function startJob(){
  if(!model.value.indexer || !model.value.source) {
    defaultToast('To start a Job an Indexer and a Source must be selected');
    return;
  }
  console.log(model.value.source);
  emit('startJob', currentJobTitle.value, model.value.source);
}
</script>

<style scoped>
.source-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px;
  border-radius: 10px;
}

.dropdown-wrapper {
  display: flex;
  gap: 10px;
}

</style>

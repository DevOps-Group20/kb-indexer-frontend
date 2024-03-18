<template>
  <div class="source-selector">
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
    <b-button
      type="is-info"
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
import {computed, ComputedRef, ModelRef, watch} from "vue";
import {toUpperCase} from "@/utils/string";
import {defaultToast} from "@/utils/toast";
import {runIndexingPipeline} from "@/utils/endpoints";

interface Props {
  indexers: Indexer[]
}

interface Model {
  indexer: string | undefined;
  source: string | undefined
}

const props = defineProps<Props>();
const model: ModelRef<Model> = defineModel({default: {indexer: undefined, source: undefined}});

const indexerItems: ComputedRef = computed(() => props.indexers.map(indexer => ({
  name: toUpperCase(indexer.name),
  value: indexer.name
})));

const sourceItems: ComputedRef = computed(() => {
  if (model.value.indexer) {
    return props.indexers.find(
      indexer => indexer.name === model.value.indexer
    )?.sources.map(source => ({name: toUpperCase(source.name), value: source.uuid}))
  }
})

function onIndexerChange() {
  console.log(model.value.indexer);
  model.value.source = undefined;
}


function startJob(){
  if(!model.value.indexer || !model.value.source) {
    defaultToast('To start a Job an Indexer and a Source must be selected');
    return;
  }
  console.log(model.value.indexer, model.value.source);
  runIndexingPipeline("aaa", "bbb");
}
</script>

<style scoped>
.source-selector {
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

</style>

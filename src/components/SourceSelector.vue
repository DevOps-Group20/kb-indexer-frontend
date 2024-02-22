<template>
  <div class="source-selector">
    <dropdown label="Indexer" v-model="currentIndexer" :items="indexerItems"/>
    <dropdown label="Sources" v-model="currentSource" :items="sourceItems"/>
  </div>
</template>
<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import Dropdown from "@/components/Dropdown.vue";
import {computed, ComputedRef, Ref, ref, watch} from "vue";

interface Props {
  indexers: Indexer[]
}

const props = defineProps<Props>();

const currentIndexer: Ref = ref(undefined);
const indexerItems: ComputedRef = computed(() => props.indexers.map(indexer => indexer.name));

const currentSource: Ref = ref(undefined);
const sourceItems: ComputedRef = computed(() => {
  if (currentIndexer.value) {
    return props.indexers.find(indexer => indexer.name === currentIndexer.value).sources
  }
})

watch(currentIndexer, () => currentSource.value = undefined)

</script>
<style scoped>
.source-selector{
  display: flex;
  gap: 30px;
}

</style>


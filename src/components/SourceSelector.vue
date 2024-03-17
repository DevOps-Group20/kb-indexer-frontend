<template>
    <div class="source-selector">
        <dropdown @change="onIndexerChange" class="dropdown" label="Indexer" v-model="model.indexer"
            :items="indexerItems" />
        <dropdown class="dropdown" label="Sources" v-model="model.source" :items="sourceItems" />
    </div>
</template>
<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import Dropdown from "@/components/Dropdown.vue";
import { computed, ComputedRef, Ref, ref, watch } from "vue";

interface Props {
    indexers: Indexer[]
}

const props = defineProps<Props>();
const model = defineModel({ default: { indexer: undefined, source: undefined } });

const indexerItems: ComputedRef = computed(() => props.indexers.map(indexer => indexer.name));
const sourceItems: ComputedRef = computed(() => {
    if (model.value.indexer) {
        return props.indexers.find(
            indexer => indexer.name === model.value.indexer
        )?.sources
    }
})

function onIndexerChange() {
    model.value.source = undefined;
}
</script>

<style scoped>
.source-selector {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

.dropdown {
  max-width: 50%;
  min-width: 200px;
}
</style>

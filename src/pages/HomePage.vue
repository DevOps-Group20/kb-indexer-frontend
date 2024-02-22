<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <source-selector :indexers="indexers"/>
      <tile/>
      <tile/>
      <tile/>
      <tile/>
      <tile/>

    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import Indexer from '../interfaces/Indexer'
import SourceSelector from "@/components/SourceSelector.vue";
import Tile from "@/components/Tile.vue";


const indexers: Indexer[] = [
  {
    name: 'indexer1',
    sources: ['1 - source1', '1 - source2', '1 - source3']
  },
  {
    name: 'indexer2',
    sources: ['2 - source1', '2 - source2', '2 - source3']
  },
  {
    name: 'indexer3',
    sources: ['3 - source1', '3 - source2', '3 - source3']
  },
  {
    name: 'indexer4',
    sources: ['4 - source1', '4 - source2', '4 - source3']
  },

]

</script>

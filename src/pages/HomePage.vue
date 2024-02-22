<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
            <dropdown />

        </v-responsive>
    </v-container>
</template>
  
<script setup lang="ts">
import Dropdown from '../components/Dropdown'
import Indexer from '../interfaces/Indexer'


const indexers: Indexer[] = [
    {
        name: 'indexer1',
        sources: ['source1', 'source2', 'source3']
    },
    {
        name: 'indexer2',
        sources: ['source1', 'source2', 'source3']
    },
    {
        name: 'indexer3',
        sources: ['source1', 'source2', 'source3']
    },
    {
        name: 'indexer4',
        sources: ['source1', 'source2', 'source3']
    },

]

</script>
  
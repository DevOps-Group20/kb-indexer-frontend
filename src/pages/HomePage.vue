<template>
  <div class="limit-row-width">
    <source-selector :indexers="indexers" v-model=currentValue />
    <tile
        title="TILE 1"
        status="Ready"
        @toggle="console.log('toggle1')"
    />
    <tile
        title="TILE 2"
        status="Running"
        @toggle="console.log('toggle2')"
    />
    <tile
        title="TILE 3"
        status="Completed"
        @toggle="console.log('toggle3')"
    />
    <tile
        title="TILE 4"
        status="Failed"
        @toggle="console.log('toggle4')"
    />
    <tile
        title="TILE 5"
        status="Completed"
        @toggle="console.log('toggle5')"
    />
    <div class="is-flex is-justify-content-center">
    <ActionButton type="is-primary" :buttonAction="logout">Logout</ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import SourceSelector from "@/components/SourceSelector.vue";
import Tile from "@/components/Tile.vue";
import ActionButton from "@/components/ActionButton.vue";
import { reactive } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import { router } from '@/router';

const currentValue = reactive({ indexer: undefined, source: undefined });

// This data needs to be queried from the backend when the app starts
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

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('signOut successful');
    await router.push('/login')
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.limit-row-width {
  width: 60%;
  max-width: 800px;
  margin: auto;
}
</style>

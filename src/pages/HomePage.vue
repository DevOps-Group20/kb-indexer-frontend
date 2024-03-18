<template>
  <div class="limit-row-width">
    <source-selector :indexers="indexers" v-model=currentValue />
    <tile
        v-for="(job, index) in jobs"
        :title="job.title"
        :status="job.status"
        @restart="restartJobAtIndex(index)"
    />
    <div class="is-flex is-justify-content-center">
    <ActionButton type="is-danger is light" :buttonAction="logout">Log out</ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import SourceSelector from "@/components/SourceSelector.vue";
import Tile from "@/components/Tile.vue";
import ActionButton from "@/components/ActionButton.vue";
import { ref, reactive } from 'vue';
import { firebaseLogout as logout } from "@/utils/firebase";
import {getIndexers} from "@/utils/endpoints";
import Job from "@/interfaces/Job";

const currentValue = reactive({ indexer: undefined, source: undefined });

const indexers = ref<Indexer[]>([]);
const jobs = ref<Job[]>([
  {title: 'Job1', status: 'Running'},
  {title: 'Job2', status: 'Failed'},
  {title: 'Job3', status: 'Completed'}
]);

getIndexers().then(res => {
  if(res){
    indexers.value = res;
  }
});


function restartJobAtIndex(index: number){
  console.log("Restart Job Called", `index is: ${index}`);
}


</script>

<style scoped>
.limit-row-width {
  width: 60%;
  max-width: 800px;
  margin: auto;
}
</style>

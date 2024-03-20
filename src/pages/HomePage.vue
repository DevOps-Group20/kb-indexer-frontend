<template>
  <div class="limit-row-width">
    <source-selector :indexers="indexers" v-model=currentValue @start-job="startJob"/>
    <tile
      v-for="(job, index) in jobs"
      :title="job.title"
      :status="job.status"
      @restart="restartJobAtIndex(index)"
    />
    <div class="is-flex is-justify-content-center">
      <b-button type="is-danger is light" @click="logout">Log out</b-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import SourceSelector from "@/components/SourceSelector.vue";
import Tile from "@/components/Tile.vue";
import {ref, reactive} from 'vue';
import {firebaseLogout as logout} from "@/utils/firebase";
import {getIndexers, subscribeToEvents, runIndexingPipeline} from "@/utils/endpoints";
import Job from "@/interfaces/Job";
import {displayToast} from "@/utils/toast";

const currentValue = reactive({indexer: undefined, source: undefined});

const indexers = ref<Indexer[]>([]);
const jobs = ref<Job[]>([]);

getIndexers().then(res => {
  if (res) {
    indexers.value = res;
  }
});

subscribeToEvents(jobs, indexers);

async function startJob(title: string, sourceId: string) {
  const res = await runIndexingPipeline(sourceId);
  if(res){
    displayToast(res.message, 'is-success', 'is-top');
    jobs.value.push({
      id: sourceId,
      title,
      status: 'Running'
    });
  }

}

//TODO: actually implement this
function restartJobAtIndex(index: number) {
  displayToast(`Restarted "${jobs.value[index].title}" successfully`, 'is-success', 'is-top');
  jobs.value[index].status = 'Running';
}


</script>

<style scoped>
.limit-row-width {
  width: 60%;
  max-width: 800px;
  margin: auto;
}
</style>

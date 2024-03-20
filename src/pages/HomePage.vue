<template>
  <div class="wrapper is-fullwidth">
  <div class="job-selector">
    <source-selector v-model="sourceSelectorModel" :indexers="indexers" @start-job="startJob"/>
  </div>
    <div v-if="jobs.length === 0" class="mx-5 notification is-warning is-light">No Active Jobs</div>
    <tile
      v-else
      v-for="(job, index) in jobs"
      :title="job.title"
      :status="job.status"
      :cron-schedule="job.cronSchedule"
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
import { CronLight } from '@vue-js-cron/light'
import Tile from "@/components/Tile.vue";
import {ref, reactive} from 'vue';
import {firebaseLogout as logout} from "@/utils/firebase";
import {getIndexers, subscribeToEvents, runIndexingPipeline} from "@/utils/endpoints";
import Job from "@/interfaces/Job";
import {displayToast} from "@/utils/toast";

const sourceSelectorModel = reactive({indexer: undefined, source: undefined});

const indexers = ref<Indexer[]>([]);
const jobs = ref<Job[]>([]);


getIndexers().then(res => {
  if (res) {
    indexers.value = res;
  }
});

subscribeToEvents(jobs, indexers);

async function startJob(title: string, sourceId: string, cronString?: string) {
  console.log(title, sourceId, cronString);
  const res = await runIndexingPipeline(sourceId, cronString);
  if(res){
    displayToast(res.message, 'is-success', 'is-top');
    const existingJob = jobs.value.find(job => job.id === sourceId);
    if(existingJob){
      existingJob.status = 'Running';
    } else {
      jobs.value.push({
        id: sourceId,
        title,
        status: 'Running',
        cronSchedule: cronString
      });
    }

  }

}


async function restartJobAtIndex(index: number) {
  // const res = await runIndexingPipeline(jobs.value[index].id);
  displayToast(`Restarted "${jobs.value[index].title}" successfully`, 'is-success', 'is-top');
  jobs.value[index].status = 'Running';
}


</script>

<style scoped>
.wrapper {
  max-width: 80%;
  margin: auto;
}

.job-selector {
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

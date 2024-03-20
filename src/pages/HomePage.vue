<template>
  <div class="wrapper is-fullwidth">
  <div class="job-selector">
    <source-selector v-model="sourceSelectorModel" :indexers="indexers" @start-job="startJob"/>
  </div>
    <span class="title is-flex mb-4">Single Jobs</span>
    <tile v-if="!jobs.length" title="No Active Jobs"/>
    <tile
      v-else
      v-for="(job, index) in jobs"
      :title="job.title"
      :status="job.status"
      :cron-schedule="job.cronSchedule"
      @restart="restartJobAtIndex(index)"
    />
    <span v-if="cronJobs.length" class="title is-flex mb-4">Scheduled Jobs</span>
    <tile
      v-for="job in cronJobs"
      :title="job.title"
      status="Schedule"
      :cron-schedule="job.cronSchedule"
    />
    <div class="is-flex is-justify-content-center mt-5">
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
const cronJobs = ref<Job[]>([]);


getIndexers().then(res => {
  if (res) {
    indexers.value = res;
  }
});

subscribeToEvents(jobs, cronJobs, indexers);

function addJob(sourceId: string, title: string, cronString?: string) {
  const existingJob = jobs.value.find(job => job.id === sourceId);
  if(existingJob){
    existingJob.status = 'Running';
  } else if (cronString){
    cronJobs.value.push({
      id: sourceId,
      title,
      status: 'Schedule',
      cronSchedule: cronString
    })
  }
  else {
    jobs.value.push({
      id: sourceId,
      title,
      status: 'Running',
    });
  }
}

async function startJob(title: string, sourceId: string, cronString?: string) {
  console.log(title, sourceId, cronString);
  const res = await runIndexingPipeline(sourceId, cronString);
  if(res) {
    displayToast(res.message, 'is-success', 'is-top');
    addJob(sourceId, title, cronString);
  }
}


async function restartJobAtIndex(index: number) {
  const res = await runIndexingPipeline(jobs.value[index].id, jobs.value[index].cronSchedule);
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

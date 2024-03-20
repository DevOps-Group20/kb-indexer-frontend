import Job, {JobStatus} from "@/interfaces/Job";
import Indexer from "@/interfaces/Indexer";
import {Ref} from "vue";
import {toUpperCase} from "@/utils/string";
import {en} from "cronstrue/dist/i18n/locales/en";

function parseTitleFromIndexersById(pipelineId: string, indexers: Indexer[]) {
  for (const indexer of indexers) {
    const source = indexer.sources.find(source => source.uuid === pipelineId);
    if (source) {
      return toUpperCase(indexer.name) + ' ' + toUpperCase(source.name);
    }
  }
  return '';
}


export interface JobEntry {
  name: string,
  pipeline_id: string,
  status: object,
  schedule: string
}

export function parseJob(entry: JobEntry, indexers: Ref<Indexer[]>): Job {
  let status: JobStatus = 'Completed';

  if(entry.status){
    const statusKeys = Object.keys(entry.status);
    if(statusKeys.includes('failed')){
      status = 'Failed';
    } else if (statusKeys.includes('active')){
      status = 'Running';
    }
  }
  return {
    id: entry.pipeline_id,
    title: parseTitleFromIndexersById(entry.pipeline_id, indexers.value),
    status,
    cronSchedule: entry.schedule
  }
}

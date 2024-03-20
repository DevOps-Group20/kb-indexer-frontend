import Job, {JobStatus} from "@/interfaces/Job";
import Indexer from "@/interfaces/Indexer";
import {Ref} from "vue";
import {toUpperCase} from "@/utils/string";

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
  status: object
}

export function parseJob(entry: JobEntry, indexers: Ref<Indexer[]>): Job {
  let status: JobStatus;
  const statusKeys = Object.keys(entry.status);
  if(statusKeys.includes('failed')){
    status = 'Failed';
  } else if (statusKeys.includes('active')){
    status = 'Running';
  } else {
    status = 'Completed';
  }
  return {
    id: entry.pipeline_id,
    title: parseTitleFromIndexersById(entry.pipeline_id, indexers.value),
    status
  }
}

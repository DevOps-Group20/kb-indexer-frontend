import {getBearerTokenHeader} from "@/utils/firebase";
import axios from "axios";
import {displayToast} from "@/utils/toast";
import Job from "@/interfaces/Job";
import {Ref} from "vue";
import Indexer from "@/interfaces/Indexer";
import {JobEntry, parseJob} from "@/utils/parse";

const serverUrl = 'http://98.67.208.65:8090/'
const axiosInstance = axios.create({baseURL: serverUrl})

const getHeaders = async (contentType?: string) => ({
  'Authorization': await getBearerTokenHeader(),
  'Content-Type': contentType ?? 'application/json',
})

const getConfigWithHeaders = async (contentType?: string) => ({
  headers: await getHeaders(contentType)
})

export const getIndexers = async () => {
  const res =  await axiosInstance.get(
    'indexers',
    await getConfigWithHeaders()
  ).catch(function () {
    displayToast('Could not get Indexers from server');
  })
  return res ? res.data : undefined;
}

export const runIndexingPipeline = async (sourceId: string, cronString?: string) => {
  const res = await axiosInstance.post(
    'index',
    {
      pipeline_id: sourceId,
      schedule: cronString
    },
    await getConfigWithHeaders()
  ).catch(function (error) {
    if (error.response) {
      displayToast(`Error: ${error.response.data.message}`, 'is-danger', 'is-top');
    } else {
      displayToast(error.message, 'is-danger', 'is-top');
    }
  });
  return res ? res.data : undefined;
}

//TODO: once its established how the data is passed to this event listener parse it and update some ref in the home page
export const subscribeToEvents = async (jobs: Ref<Job[]>, indexers: Ref<Indexer[]>) => {
  const subscription = new EventSource(`${serverUrl}events`);
  subscription.addEventListener('connected', (message) => {
    const entries: JobEntry[] = JSON.parse(message.data);
    console.log(entries);
    jobs.value = entries.map(entry => parseJob(entry, indexers));
  });
  subscription.addEventListener('jobStatusChanged', (message) => {
    const entry = JSON.parse(message.data);
    jobs.value.find(job => job.id === entry.metadata.uid)
    console.log(entry);
  });
  subscription.addEventListener('error', (error) => {
    console.error(error);
  });
};


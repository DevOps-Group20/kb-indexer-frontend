import {getBearerTokenHeader} from "@/utils/firebase";
import axios from "axios";
import {defaultToast} from "@/utils/toast";

const serverUrl = 'http://localhost:8090/'
const axiosInstance = axios.create({baseURL: serverUrl})

const getHeaders = async (contentType?: string) => ({
  'Authorization': await getBearerTokenHeader(),
  'Content-Type': contentType ?? 'application/json',
})

const getConfigWithHeaders = async (contentType?: string) => ({
  headers: await getHeaders(contentType)
})

export const getIndexers = async () => {
  try {
    const res = await axiosInstance.get(
      'indexers',
      await getConfigWithHeaders()
    )
    if(res.status === 200){
      return res.data
    }
    return null;
  } catch (error) {
    defaultToast('Could not get Indexers from server');
  }
}

export const runIndexingPipeline = async (sourceId: string) => {
  try {
    const res = await axiosInstance.post(
      'index',
      {
          pipeline_id: sourceId
      },
      await getConfigWithHeaders()
    )
    if(res.status === 200){
      return res.data
    }
    return null;
  } catch (error) {
    defaultToast('Failed Running the Job');
  }
}

//TODO: once its established how the data is passed to this event listener parse it and update some ref in the home page
export const subscribeToEvents = async () => {
  const subscription = new EventSource(`${serverUrl}events`);
  subscription.addEventListener('connected', (message) => {
    console.log(message.data);
  });
  subscription.addEventListener('jobStatusChanged', (message) => {
    console.log(message.data)
  });
  subscription.addEventListener('error', (error) => {
    console.error(error);
  });
}


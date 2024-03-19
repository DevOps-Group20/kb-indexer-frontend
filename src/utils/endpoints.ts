import {getBearerTokenHeader} from "@/utils/firebase";
import axios from "axios";
import {defaultToast} from "@/utils/toast";

const serverUrl = 'http://192.168.49.2:31364/'
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

//TODO Handle 409 and 200 responses
export const runIndexingPipeline = async (sourceId: string) => {
    const res = await axiosInstance.post(
      'index',
      {
          pipeline_id: sourceId
      },
      await getConfigWithHeaders()
    )
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  
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


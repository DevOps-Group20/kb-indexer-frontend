import {getBearerTokenHeader} from "@/utils/firebase";
import axios from "axios";
import {defaultToast} from "@/utils/toast";

const axiosInstance = axios.create({baseURL: 'http://localhost:8090/'})

const getHeaders = async () => ({
  'Authorization': await getBearerTokenHeader(),
  'Content-Type': 'application/json',
})

const getConfigWithHeaders = async () => ({
  headers: await getHeaders()
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

export const runIndexingPipeline = async (indexerId: string, sourceId: string) => {
  try {
    const res = await axiosInstance.post(
      'index',
      {
        indexer_id: indexerId,
        source_id: sourceId
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

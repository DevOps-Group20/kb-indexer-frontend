import {getBearerTokenHeader} from "@/utils/firebase";
import {getAuth} from "firebase/auth";
import axios from "axios";

const getConfigWithHeaders = async () => ({
  headers: {
    'Authorization': await getBearerTokenHeader(),
    'Content-Type': 'application/json',
    'Request-Private-Network': true
  }
})

export const getIndexers = async () => {
  const res = await axios.get(
    'http://localhost:8090/indexers',
    await getConfigWithHeaders()
  )
  if(res.status === 200){
    return res.data
  }
  return null;
}

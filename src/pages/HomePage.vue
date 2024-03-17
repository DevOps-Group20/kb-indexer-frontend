<template>
  <div class="limit-row-width">
    <source-selector :indexers="indexers" v-model=currentValue />
    <tile
        title="TILE 1"
        status="Ready"
        @toggle="console.log('toggle1')"
    />
    <tile
        title="TILE 2"
        status="Running"
        @toggle="console.log('toggle2')"
    />
    <tile
        title="TILE 3"
        status="Completed"
        @toggle="console.log('toggle3')"
    />
    <tile
        title="TILE 4"
        status="Failed"
        @toggle="console.log('toggle4')"
    />
    <tile
        title="TILE 5"
        status="Completed"
        @toggle="console.log('toggle5')"
    />
    <div class="is-flex is-justify-content-center">
    <ActionButton type="is-primary" :buttonAction="logout">Logout</ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Indexer from '@/interfaces/Indexer'
import SourceSelector from "@/components/SourceSelector.vue";
import Tile from "@/components/Tile.vue";
import ActionButton from "@/components/ActionButton.vue";
import { ref, reactive } from 'vue';
import { getAuth } from "firebase/auth";
import { firebaseLogout as logout } from "@/utils/firebase";
import axios from "axios";
import {getBearerTokenHeader} from "@/utils/firebase";

const currentValue = reactive({ indexer: undefined, source: undefined });

//TODO: update indexers.value with response from backend
//TODO: ideally format the data the same on the backend as the frontend so we only need to set the
//TODO: value in the frontend
const indexers = ref<Indexer[]>([]);



const getIndexers = async () => {
  const user = getAuth().currentUser;

  const res = await axios.get('http://localhost:8090/indexers',{
    headers: {
      'Authorization': await getBearerTokenHeader(),
      'Content-Type': 'application/json',
    }
  })
  console.log(res);
}

getIndexers();


</script>

<style scoped>
.limit-row-width {
  width: 60%;
  max-width: 800px;
  margin: auto;
}
</style>

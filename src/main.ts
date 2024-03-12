/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Components
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { router } from '@/router'
import { createApp } from 'vue'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi8x3VJ0PB_3HDJkPDEN6khc0gc1yXw-w",
  authDomain: "devops-kb-indexer.firebaseapp.com",
  projectId: "devops-kb-indexer",
  storageBucket: "devops-kb-indexer.appspot.com",
  messagingSenderId: "409763762968",
  appId: "1:409763762968:web:654a6e99b35f37cab4446d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')

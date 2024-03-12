<template>
  <div class="container fill-height">
    <div class="responsive align-center text-center fill-height">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2">
          <div class="toolbar deep-purple accent-4 dark flat">
            <div class="toolbar-title headline text-uppercase">
              <span class="font-weight-bold">Login to Index Database Sources</span>
            </div>
          </div>
          <div class="spacer"></div>
          <div>
            <input
              type="text"
              placeholder="Username"
              v-model="username"
              required
            >
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              required
            >
          </div>
          <VButton class="btn deep-purple accent-4 mt-4" @click="login">Login</VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {router} from '@/router';
import VButton from "@/components/VButton.vue";

const username = ref('');
const password = ref('');

const login = async () => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, username.value, password.value);
    await router.push('/')
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.spacer {
  height: 20px;
}
</style>

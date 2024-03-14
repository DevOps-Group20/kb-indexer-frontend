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
            <b-field label="Username">
              <b-input type="username" v-model="username"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password" v-model="password"></b-input>
            </b-field>
          </div>
          <ActionButton type="is-primary" :buttonAction="login">Login</ActionButton>        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import ActionButton from "@/components/ActionButton.vue";

import {ref} from 'vue';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {router} from '@/router';

const username = ref('');
const password = ref('');

const login = async () => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, username.value, password.value);
    console.log('signInWithEmailAndPassword successful');
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

<template>
  <div class="container fill-height d-flex align-center">
    <div class="responsive text-center">
      <div class="row limit-row-width">
        <div class="col-12 col-sm-8 offset-sm-2">
          <div class="mt-5 has-text-weight-bold">
            <div class="toolbar-title headline text-uppercase is-align-content-center is-flex is-justify-content-center">
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
          <div class="spacer"></div>
          <div class="is-flex is-justify-content-center">
            <ActionButton type="is-primary" :buttonAction="login">Login</ActionButton>
          </div>
        </div>
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

.limit-row-width {
  max-width: 400px;
  margin: auto;
}
</style>

<template>
    <div class="is-responsive is-center">
      <div class="limit-row-width">
            <div class="mt-5 is-align-content-center is-flex is-justify-content-center">
              <span class="has-text-weight-bold">Login to Index Database Sources</span>
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
            <b-button type="is-primary" @click="login">Log in</b-button>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {firebaseLogin} from "@/utils/firebase";

const username = ref('');
const password = ref('');
const  login = () => firebaseLogin(username.value, password.value);

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

<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
            <v-row>
                <v-col cols="12" sm="8" offset-sm="2">
                    <v-toolbar color="deep-purple accent-4" dark flat>
                        <v-toolbar-title class="headline text-uppercase">
                            <span class="font-weight-bold">Login to Index Database Sources</span>
                        </v-toolbar-title>
                    </v-toolbar>
                    <div class="spacer"></div>
                    <v-form class="mx-4" @submit.prevent="login">
                        <v-text-field
                            label="Username"
                            v-model="username"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            v-model="password"
                            required
                        ></v-text-field>
                        <v-btn color="deep-purple accent-4" class="mt-4" type="submit">Login</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from '@/router';

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

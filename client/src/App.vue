<template>
  <v-app>

    <v-app-bar color="primary" v-if="!$route.meta.hideNavbar">

      <router-link to="/" class="mx-4">
        <img
          alt="Logo"
          src="@/assets/hospitalLogo.png"
          width="40"
          transition="scale-transition"
        />
      </router-link>

      <v-btn rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/home">Home</v-btn>
      <v-btn rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/appointment">Appointments</v-btn>

      <v-spacer></v-spacer>
      
      <v-btn rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/">Logout</v-btn>


    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView :doGet="doGet" :doPost="doPost" />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="2500">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";

export default {

  data() {
    return {
      location: undefined,
      session: undefined,
      snackbar: false,
      snackbarText: '',
    }
  },

  created() {
    // Simulate fetching user data
    this.user = {
      username: 'admin',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      address: '123 Main St',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
    };
  },

  methods: {

    async doRequest(req, retry) {

      let resp = null;
      let options = { ...req, validateStatus: status => [ 200, 201, 400, 401, 403 ].includes(status) };
      if(retry) {
        try {
          resp = await axios(options);
        } catch(e) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return await this.doRequest(req, retry - 1);
        }
      } else {
        resp = await axios(options);
      }

      if(resp.status == 401) {
        document.cookie = 'sessionId=; path=/;';
        window.location.reload();
      } else if(resp.status == 201 || resp.status == 400 || resp.status == 403) {
        while(this.snackbar)
          await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = resp.data;
        this.snackbar = true;
      } else {
        return resp.data;
      }

    },

    async doGet(api, query = {}, retry = 3) {
      return await this.doRequest({ method: 'get', url: api, params: query }, retry);
    },

    async doPost(api, body = {}, retry = 0) {

      let data = await this.doRequest({ method: 'post', url: api, data: body }, retry);

      if(data && data.message) {
        while(this.snackbar)
          await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = data.message;
        this.snackbar = true;
      }

      return data;

    }

  }

};
</script>
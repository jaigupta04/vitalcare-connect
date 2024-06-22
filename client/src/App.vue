<template>
  <v-app>

    <v-app-bar density="compact" color="primary" >

      <router-link to="/" class="mx-4">
        <img
          alt="Logo"
          src="@/assets/logo.svg"
          width="40"
          transition="scale-transition"
        />
      </router-link>

      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" to="/">Home</v-btn>
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" to="/about">About</v-btn>

      <v-spacer></v-spacer>

      <div ref="GoogleLoginButton" class="mr-4" style="display:none;"></div>

    </v-app-bar>

    <v-main class="bg-grey">
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

  async mounted() {

    navigator.geolocation.watchPosition(position => {
      this.location = {
        coords: {
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy : position.coords.accuracy
        },
        timestamp: position.timestamp
      }
    });

    for(let cookie of document.cookie.split(';')) {
      cookie = cookie.trim();
      if(cookie.startsWith('sessionId=') && cookie != 'sessionId=') {
        this.session = { id: cookie.substring('sessionId='.length) };
        break;
      }
    }

    if(this.session) {
      this.session = await this.doGet('/api/user/session');
    } else {
      this.session = await this.doPost('/api/user/session', { userAgent: navigator.userAgent });
      document.cookie = `sessionId=${ this.session.id }; path=/;`;
    }

    if(this.session.status == 'active') {
      this.$refs['GoogleLoginButton'].style.display = '';
      window.google.accounts.id.initialize({
        client_id: '220251834863-p6gimkv0cgepodik4c1s8cs471dv9ioq.apps.googleusercontent.com',
        callback: async (resp) => {
          await this.doPost('/api/user/google-login', { idToken: resp.credential });
          window.location.reload();
        },
        auto_select: true
      });
      window.google.accounts.id.renderButton(this.$refs['GoogleLoginButton'], {});
      window.google.accounts.id.prompt();
    } else if(this.session.status == 'loggedin') {
      setInterval(() => {
        this.doPost('/api/user/session/ping', { userAgent: navigator.userAgent, location: this.location });
      }, 60 * 1000);
    }

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

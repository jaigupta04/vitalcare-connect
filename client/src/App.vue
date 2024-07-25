<template>
  <v-app>

    <v-app-bar color="primary" v-if="isLoggedIn">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"  
          >
            <v-icon size="32">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
              <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
              <v-list-item-subtitle>Username: {{ user.id }}</v-list-item-subtitle>
              <v-list-item-subtitle>Date of Birth: {{ user.dob }}</v-list-item-subtitle>
              <v-list-item-subtitle>Address: {{ user.address }}</v-list-item-subtitle>
              <v-list-item-subtitle>Email: {{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>Contact: {{ user.contactNumber }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/home">Home</v-btn>
      <v-btn rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/appointment">Appointments</v-btn>

      <v-spacer></v-spacer>
      
      <v-btn 
        rounded="xl" 
        :exact="true" 
        variant="flat" 
        :ripple="false" 
        class="ml-4" 
        @click="logout" 
        color="red"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Auth 
          v-if="!isLoggedIn" 
          @loggedIn="handleLogin"
          :doGet="doGet" :doPost="doPost"
        />
        <RouterView 
          v-if="isLoggedIn"
          :doGet="doGet" :doPost="doPost" 
          :user="user" 
          :departments="departments" :nurses="nurses" :physicians="physicians"
        />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="2500">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from "axios";
import Auth from './views/AuthPage.vue';

export default {

  components: {
    RouterLink,
    RouterView,
    Auth
  },

  data() {
    return {
      location: undefined,
      session: undefined,
      snackbar: false,
      snackbarText: '',
      isLoggedIn: false,
      user: {},
      departments: [],
      nurses: [],
      physicians: [],
    };
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    
    async doRequest(req, retry) {
      let resp = null;
      let options = { ...req, validateStatus: status => [200, 201, 400, 401, 403].includes(status) };
      if (retry) {
        try {
          resp = await axios(options);
        } catch (e) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return await this.doRequest(req, retry - 1);
        }
      } else {
        resp = await axios(options);
      }

      if (resp.status == 401) {
        document.cookie = 'sessionId=; path=/;';
        window.location.reload();
      } else if (resp.status == 201 || resp.status == 400 || resp.status == 403) {
        while (this.snackbar)
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

      if (data && data.message) {
        while (this.snackbar)
          await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = data.message;
        this.snackbar = true;
      }

      return data;
    },

    async fetchData() {

      let [ Depts, Nurses, Phys ] = await Promise.all([
        this.doGet('/api/getall', { collection: 'DEPTS' }),
        this.doGet('/api/getall', { collection: 'NURSES' }),
        this.doGet('/api/getall', { collection: 'PHYS' }),
      ]);

      this.departments = Depts;

      this.nurses = Nurses.map(nurse => ({
        ...nurse,
        did: this.getDepartmentName(nurse.did._path.segments[1]),
        name: `${nurse.fname} ${nurse.lname}`,
      }));

      this.physicians = Phys.map(physician => ({
        ...physician,
        did: this.getDepartmentName(physician.did._path.segments[1]),
        name: `${physician.fname} ${physician.lname}`,
      }));
    },

    getDepartmentName(departmentId) {
      const department = this.departments.find(d => d.id === departmentId);
      return department ? department.name : '';
    },

    handleLogin(userData) {
      this.user = userData;
      this.isLoggedIn = true;
    },

    logout() {
      this.$router.push('/');
      this.isLoggedIn = false;
    }
  }
};
</script>
<template>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">

          <v-card>

            <v-card-title>
              <h1>Login</h1>
            </v-card-title>

            <v-card-text>
              <v-form @submit.prevent="login">

                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>

                <v-btn type="submit" color="primary">Login</v-btn>

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn text @click="$router.push('/signup')">Sign Up</v-btn>
            </v-card-actions>

          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </template>
  
<script>

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },

    props: {
      doGet: Function,
      doPost: Function,
    },

    methods: {
      async login() {

        let response = await this.doGet('/api/getall', {
          collection: 'PROFILES'
        })

        let success = false;

        for (let login in response) {
          if (response[login].id === this.username && response[login].password === this.password) {
            success = true
            this.$router.push('/home');
          }
        }
        if (!success) alert('Invalid credentials');
      },
    },
  };

</script>
  
<style scoped>
/* Add some styles if needed */
</style>
  
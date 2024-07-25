<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          
          <v-card-title>
            <v-row justify="space-between" align="center">
              <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
              <v-btn rounded text @click="toggleAuth">{{ isLogin ? 'Sign Up' : 'Login' }}</v-btn>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="isLogin ? login() : signup()">

              <v-text-field
                v-if="!isLogin"
                v-model="firstName"
                label="First Name"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
                v-model="lastName"
                label="Last Name"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
                v-model="dob"
                label="Date of Birth"
                type="date"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
                v-model="address"
                label="Address"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
                v-model="contactNumber"
                label="Contact Number"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="username"
                label="Username"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :type="passwordVisible ? 'text' : 'password'"
                append-inner-icon="mdi-eye"
                @click:append="togglePasswordVisibility"
                variant="outlined"
                required
              ></v-text-field>

              <v-btn type="submit" color="success" rounded>{{ isLogin ? 'Login' : 'Sign Up' }}</v-btn>

            </v-form>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      isLogin: true,
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
      email: '',
      contactNumber: '',
      username: '',
      password: '',
      profile: null,
      passwordVisible: false,
    };
  },

  props: {
    doGet: Function,
    doPost: Function,
  },

  methods: {
    toggleAuth() {
      this.isLogin = !this.isLogin;
    },

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    async login() {
      let response = await this.doGet('/api/getall', {
        collection: 'PROFILES',
      });

      let success = false;

      for (let login in response) {
        if (response[login].id === this.username && response[login].password === this.password) {
          success = true;
          this.profile = response[login];
          this.$emit('loggedIn', this.profile);
          this.$router.push('/home');
        }
      }
      if (!success) alert('Invalid credentials');
    },

    async signup() {
      await this.doPost('/api/signup', {
        firstName: this.firstName,
        lastName: this.lastName,
        dob: this.dob,
        address: this.address,
        email: this.email,
        contactNumber: this.contactNumber,
        username: this.username,
        password: this.password,
      });

      alert('Signup successful');
      this.isLogin = true; 
    },
  },
};
</script>

<style scoped>
/* Add some styles if needed */
</style>

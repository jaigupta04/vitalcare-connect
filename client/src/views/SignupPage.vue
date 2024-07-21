<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>

            <v-card-title>
              <h1>Sign Up</h1>
            </v-card-title>

            <v-card-text>
              <v-form @submit.prevent="signup">

                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="dob"
                  label="Date of Birth"
                  type="date"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="address"
                  label="Address"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="contactNumber"
                  label="Contact Number"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Create Password"
                  type="password"
                  required
                ></v-text-field>

                <v-btn type="submit" color="primary">Sign Up</v-btn>

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn text @click="$router.push('/')">Back to Login</v-btn>
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
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        email: '',
        contactNumber: '',
        password: '',
      };
    },

    props: {
      doGet: Function,
      doPost: Function,
    },

    methods: {
      async signup() {
        // Handle the signup logic here

        await this.doPost('/api/', {
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          address: this.address,
          email: this.email,
          contactNumber: this.contactNumber,
          username: this.username,
          password: this.password,
        })
        
        alert('Signup successful');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add some styles if needed */
  </style>
  
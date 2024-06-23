<template>
  <v-card class="github-form" max-width="400px" style="margin: 0 auto;">
    <v-card-text>
      <v-form @submit.prevent="submit">

        <v-text-field
          v-model="githubId"
          label="GitHub ID"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="repoName"
          label="Repository Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="branchName"
          label="Branch Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="fileName"
          label="File Name"
          variant="outlined"
          required
          class="white-text-field"
        />

      <v-divider color="white"></v-divider>

      <div class="button-wrapper white-text-field">
        <v-btn type="submit" color="#4969ED" rounded>
          Generate README
        </v-btn>
      </div>

    </v-form>
  </v-card-text>

  <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Response</v-card-title>
        <v-card-text>
          <pre>{{ response }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

  </v-card>
</template>



<script>

export default {

  props: {
    doGet: Function,
    doPost: Function,
  },

  data() {
    return {
      githubId: null,
      repoName: null,
      branchName: null,
      fileName: null,
      dialog: false,
      response: '',
      loading: false,
      timeout: null
    };
  },

  methods: {
    async submit() {
      if (this.githubId === null || this.repoName === null || this.branchName === null || this.fileName === null) {
        alert('Please Fill Amount Properly.');
        return; 
      }

      console.log('jai')

      this.loading = true;

      this.timeout = setTimeout(() => {
        alert('Request timed out.');
      }, 20000); 

      try {
        const resp = await this.doGet('/api/generate', {
          githubId: this.githubId,
          repoName: this.repoName,
          branchName: this.branchName,
          fileName: this.fileName,
        });

        console.log('gupta')

        clearTimeout(this.timeout);
        this.response = resp; 
        this.dialog = true; 
      } catch (error) {
        clearTimeout(this.timeout);
        alert('An error occurred while fetching the data.');
      } finally {
        this.loading = false;
      }
    },
  },
};

</script>



<style scoped>

.github-form {
  background-color: #040D21;
  border-radius: 6px;
  padding: 20px;
  border-radius: 10px !important;
}

.btn-primary {
  background-color: #4969ED;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button-wrapper {
  margin-top: 15px; 
  display: flex;
  justify-content: center;
}

.white-text-field {
  color: white;
  font-weight: bold;
}

</style>

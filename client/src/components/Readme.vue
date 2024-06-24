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
        <v-btn type="submit" color="#26a641" rounded>
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

    <v-overlay :model-value="loading" class="loading-overlay">
      <div class="loading-content">
        <v-progress-circular color="#26a641" size="64" indeterminate></v-progress-circular>
        <div class="loading-text">Generating your Readme...</div>
      </div>
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
      timeout: null,
    };
  },

  methods: {
    async submit() {
      if (this.githubId === null || this.repoName === null || this.branchName === null || this.fileName === null) {
        alert('Please Fill Amount Properly.');
        return; 
      }

      this.loading = true;

      const resp = await this.doGet('/api/generate', {
        githubId: this.githubId,
        repoName: this.repoName,
        branchName: this.branchName,
        fileName: this.fileName,
      });

      this.response = resp; 
      this.dialog = true; 
      this.loading = false;
    },
  },
};

</script>



<style scoped>

.github-form {
  background-color: #0d1117;
  border-radius: 6px;
  padding: 20px;
  border-radius: 10px !important;
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

.loading-overlay {
  background-color: rgba(0, 0, 0, 0.7) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  margin-top: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
}

</style>

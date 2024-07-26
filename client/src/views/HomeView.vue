<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card rounded elevation="0" class="elevation-10">

          <v-card-title>
            <h2>Departments</h2>
          </v-card-title>

          <v-card-text class="rounded-table">
            <v-data-table-virtual
              :headers="departmentHeaders"
              :items="departments"
              class="elevation-5"
              rounded
            ></v-data-table-virtual>
          </v-card-text>
          
        </v-card>
      </v-col>

      <v-col cols="12" md="10">
        <v-card rounded elevation="0" class="elevation-10">

          <v-card-title>
            <h2>Nurses</h2>
          </v-card-title>

          <v-card-text class="rounded-table">
            <v-data-table-virtual
              :headers="nurseHeaders"
              :items="nurses"
              class="elevation-5"
            ></v-data-table-virtual>
          </v-card-text>

        </v-card>
      </v-col>

      <v-col cols="12" md="10">
        <v-card rounded elevation="0" class="elevation-10">

          <v-card-title>
            <h2>Physicians</h2>
          </v-card-title>

          <v-card-text class="rounded-table">
            <v-data-table-virtual
              :headers="physicianHeaders"
              :items="physicians"
              class="elevation-5"
            ></v-data-table-virtual>
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
      departmentHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Location', value: 'loc' },
        { title: 'Contact', value: 'contact' },
      ],
      nurseHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Department', value: 'did' },
        { title: 'Contact', value: 'contact' },
        { title: 'Mail', value: 'mail' },
      ],
      physicianHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Department', value: 'did' },
        { title: 'Contact', value: 'contact' },
        { title: 'Mail', value: 'mail' },
      ],
    };
  },

  props: {
    doGet: Function,
    doPost: Function,
    user: Object,
    departments: Array,
    nurses: Array,
    physicians: Array,
  },


  methods: {},
};

</script>

<style scoped>

.v-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.rounded-table {
  border-radius: 10px;
}

</style>

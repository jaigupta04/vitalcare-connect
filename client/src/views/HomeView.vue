<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>

          <v-card-title>
            <h2>Departments</h2>
          </v-card-title>

          <v-card-text>
            <v-data-table-virtual
              :headers="departmentHeaders"
              :items="departments"
              class="elevation-1"
            ></v-data-table-virtual>
          </v-card-text>
          
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>

          <v-card-title>
            <h2>Nurses</h2>
          </v-card-title>

          <v-card-text>
            <v-data-table-virtual
              :headers="nurseHeaders"
              :items="nurses"
              class="elevation-1"
            ></v-data-table-virtual>
          </v-card-text>

        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>

          <v-card-title>
            <h2>Physicians</h2>
          </v-card-title>

          <v-card-text>
            <v-data-table-virtual
              :headers="physicianHeaders"
              :items="physicians"
              class="elevation-1"
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
      departments: [],
      nurses: [],
      physicians: [],
      departmentHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Location', value: 'loc' },
        { title: 'Contact', value: 'contact' },
      ],
      nurseHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Department', value: 'department' },
        { title: 'Contact', value: 'contact' },
        { title: 'Mail', value: 'mail' },
      ],
      physicianHeaders: [
        { title: 'ID', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Department', value: 'department' },
        { title: 'Contact', value: 'contact' },
        { title: 'Mail', value: 'mail' },
      ],
    };
  },

  props: {
    doGet: Function,
    doPost: Function,
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {

      // Department
      let response = await this.doGet('/api/', {
        collection: 'DEPTS'
      })
      
      this.departments = response;

      // Nurses
      response = await this.doGet('/api/', {
        collection: 'NURSES'
      })

      this.nurses = response.map(nurse => ({
        ...nurse,
        name: `${nurse.fname} ${nurse.lname}`,
      }));

      // Physicians
      response = await this.doGet('/api/', {
        collection: 'PHYS'
      })

      this.physicians = response.map(physician => ({
        ...physician,
        name: `${physician.fname} ${physician.lname}`,
      }));
    },
  },
};

</script>

<style scoped>
/* Add styles if needed */
</style>

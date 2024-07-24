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
  },

  async created() {
    await this.fetchData();
  },

  methods: {
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
  },
};

</script>

<style scoped>
/* Add styles if needed */
</style>

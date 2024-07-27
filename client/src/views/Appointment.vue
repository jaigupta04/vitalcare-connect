<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-card rounded elevation="10" class="elevation-10">

          <v-card-title>
            <h1>Book Appointment</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="bookApp">
          
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="bookingDate"
                    label="Appointment Date"
                    type="date"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="bookingTime"
                    label="Appointment Time"
                    type="time"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-select 
                label="Department" 
                v-model="department" 
                :items="departments" 
                item-title="name" 
                item-value="id" 
                variant="outlined"
                required
              ></v-select>

              <v-btn rounded type="submit" color="success">Book</v-btn>

            </v-form>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="8">
        <v-card rounded elevation="0" class="elevation-10">

          <v-card-title>
            <h2>Booked Appointments</h2>
          </v-card-title>

          <v-card-text class="rounded-table">
            <v-data-table-virtual
              :headers="appointmentHeaders"
              :items="appointments"
              class="elevation-5"
            >
            </v-data-table-virtual>
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
      bookingDate: new Date().toISOString().split('T')[0],
      bookingTime: new Date().toISOString().split('T')[1].substring(0, 5),
      department: null,
      Appointments: [],
      appointments: [],
      appointmentHeaders: [
        { title: 'Date', value: 'date' },
        { title: 'Time', value: 'time' },
        { title: 'Department', value: 'department' },
        { title: 'Status', value: 'status' },
      ],
    };
  },

  props: {
    doGet: Function,
    doPost: Function,
    departments: Array,
    user: Object,
  },

  async mounted() {
    const Apts = await this.doGet('/api/apts', { profileId: this.user.id});

    this.appointments = Apts.map(appointment => ({
        ...appointment,
        department: this.getDepartmentName(appointment.did),
      }));
  },

  methods: {

    async bookApp() {
      const appointment = {
        date: this.bookingDate,
        time: this.bookingTime,
        did: this.department,
        pid: this.user.id,
        status: 'Pending'
      };

      await this.doPost('/api/apts', appointment);

      this.appointments.push({
        date: this.bookingDate,
        time: this.bookingTime,
        department: this.department ? this.getDepartmentName(this.department) : '-',
        status: 'Pending'
      });

      this.bookingDate = new Date().toISOString().split('T')[0];
      this.bookingTime = new Date().toISOString().split('T')[1].substring(0, 5);
      this.department = null;
    },

    getDepartmentName(departmentId) {
      const department = this.departments.find(d => d.id === departmentId);
      return department ? department.name : '';
    },
  },
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

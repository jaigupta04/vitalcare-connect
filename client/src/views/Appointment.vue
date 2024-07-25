<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>

          <v-card-title>
            <h1>Book Appointment</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="bookApp">
              
              <v-text-field
                v-model="bookingDate"
                label="Appointment Date"
                type="date"
                required
              ></v-text-field>

              <v-text-field
                v-model="bookingTime"
                label="Appointment Time"
                type="time"
                required
              ></v-text-field>

              <v-select 
                label="Department" 
                v-model="department" 
                :items="departments" 
                item-title="name" 
                item-value="id" 
                required
              ></v-select>

              <v-btn type="submit" color="primary">Book</v-btn>

            </v-form>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="8">
        <v-card>

          <v-card-title>
            <h2>Booked Appointments</h2>
          </v-card-title>

          <v-card-text>
            <v-data-table-virtual
              :headers="appointmentHeaders"
              :items="appointments"
              class="elevation-1"
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
      bookingDate: null,
      bookingTime: null,
      department: null,
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
  },

  methods: {
    async bookApp() {
      const appointment = {
        date: this.bookingDate,
        time: this.bookingTime,
        department: this.department,
        status: 'Pending'
      };

      await this.doPost('/api/apts', appointment);

      // Update the appointments array with the new appointment
      this.appointments.push({
        date: this.bookingDate,
        time: this.bookingTime,
        department: this.getDepartmentName(this.department),
        status: 'Pending'
      });

      // Clear the form fields
      this.bookingDate = null;
      this.bookingTime = null;
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
/* Add some styles if needed */
</style>

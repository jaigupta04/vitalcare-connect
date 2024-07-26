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
                    :value="formattedDate"
                    required
                    variant="outlined"
                    outline
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="bookingTime"
                    label="Appointment Time"
                    type="time"
                    :value="formattedTime"
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
      bookingTime: new Date(),
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
    user: Object,
  },

  computed: {
    formattedDate() {
      // return this.convertGMTtoIST(new Date(this.bookingDate), 'date');
      const date = new Date(this.bookingDate);
      return date.toISOString().split('T')[0];
    },
    formattedTime() {
      // return this.convertGMTtoIST(new Date(this.bookingTime), 'time');
      const time = new Date(this.bookingTime);
      return time.toISOString().split('T')[1].substring(0, 5);
    },
  },

  methods: {

    convertGMTtoIST(date, type) {
      const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedDate = new Date(date).toLocaleString('en-US', options);

      if (type === 'date') {
        return this.bookingDate;
      } else if (type === 'time') {
        return formattedDate.split(', ')[1].substring(0, 5);
      }
    },

    async bookApp() {
      const appointment = {
        date: this.convertGMTtoIST(this.bookingDate, 'date'),
        time: this.convertGMTtoIST(this.bookingTime, 'time'),
        did: this.department,
        pid: this.user.id,
        status: 'Pending'
      };

      await this.doPost('/api/apts', appointment);

      // Update the appointments array with the new appointment
      this.appointments.push({
        date: this.convertGMTtoIST(this.bookingDate, 'date'),
        time: this.convertGMTtoIST(this.bookingTime, 'time'),
        department: this.department ? this.getDepartmentName(this.department) : '-',
        status: 'Pending'
      });

      // Clear the form fields
      this.bookingDate = new Date().toISOString().split('T')[0];
      this.bookingTime = formattedTime();
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

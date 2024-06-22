<template>
    <main>
      <Readme :doGet="doGet" :doPost="doPost" />
    </main>
  </template>
  
  <script>
  import Readme from '../components/Readme.vue'
  
  export default {
    components: {
      Readme
    },
  
    props: {
      doGet: Function,
      doPost: Function
    },
  
    data() {
      return {};
    },
  }
  </script>
<template>
  <div class="ns-container">
    <div class="ns-wrapper content">
      <h2>No tables in this database.</h2>
      <button v-on:click="addDatabase" class="button is-primary">Add table now</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notSetTables',
    methods: {
      addDatabase() {
      }
    }
  }
</script>

<style scoped>
  .ns-container {
    display: flex;
    min-height: 90vh;
  }
  .ns-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
</style>

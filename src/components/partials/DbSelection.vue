<template>
  <div class="nav-item">
    <span class="select">
      <select v-model="selected" v-on:change="changeDbSelection">
        <option v-for="database in databases">{{database.Database}}</option>
      </select>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'tableNav',
    props: [
      'selectedDb',
      'databases'
    ],
    computed: {
      selected () {
        return this.selectedDb;
      }
    },
    methods: {
      changeDbSelection(event) {
        this.$emit('databaseChange', event.target.value);
      }
    }
  }
</script>

<style scoped>
  .nav-item {
    padding: 12px 0;
  }
</style>

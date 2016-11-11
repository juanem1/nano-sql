<template>
  <div class="nav-item">
    <span class="select">
      <select v-model="selected" v-on:change="changeDbSelection">
        <option v-for="database in databases">{{database}}</option>
      </select>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'tableNav',
    computed: {
      selected () {
        return this.$store.state.selectedDatabase;
      },
      databases () {
        return this.$store.state.databases;
      }
    },
    methods: {
      changeDbSelection(event) {
        this.$store.commit('setSelectedDb', event.target.value);
      }
    }
  }
</script>

<style scoped>
  .nav-item {
    padding: 12px 0;
  }
</style>

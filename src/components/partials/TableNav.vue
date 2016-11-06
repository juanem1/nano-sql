<template>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left nav-menu">
          <div class="nav-item is-tab">
            <span class="select">
              <select v-model="selected" v-on:change="changeDbSelection">
                <option v-for="database in databases">{{database.Database}}</option>
              </select>
            </span>
          </div>
        </div>
        <div class="nav-right nav-menu">
          <span class="nav-item is-tab">
            <router-link class="button" :to="{ name: 'tableStructure', params: { name: tableName }}" active-class="is-primary">
              <span>Structure</span>
            </router-link>
            <router-link class="button" :to="{ name: 'tableContent', params: { name: tableName }}" active-class="is-primary">
              <span>Content</span>
            </router-link>
            <router-link class="button" :to="{ name: 'tableInfo', params: { name: tableName }}" active-class="is-primary">
              <span>Table Info</span>
            </router-link>
          </span>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    name: 'tableNav',
    props: [
      'tableName',
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
  .nav {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
</style>
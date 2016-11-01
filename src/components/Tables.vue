<template>
  <div id="app">
    <div class="columns">
      <div class="column is-2">
        <aside class="menu">
          <p class="menu-label">Tables</p>
          <ul class="menu-list">
            <li v-for="table in tables">
              <router-link :to="{ name: 'tableStructure', params: { name: table.name }}" active-class="is-active">
                {{ table.name }}
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
var Tables = require('../services/Tables');
var tables = new Tables();
export default {
  name: 'dashboard',
  data () {
    return {
      tables: []
    }
  },  

  methods: {
    getTables () {
      tables.getTables().then((resp) => {
        this.tables = resp;
      });
    }
  },

  created() {
    this.getTables();
  }
}
</script>

<style>
</style>

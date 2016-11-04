<template>
  <div id="app">
    <div class="columns is-gapless">
      <TableNav 
        v-if="$route.params.name"
        v-on:databaseChange="databaseChange"
        v-bind:table-name="$route.params.name"
        v-bind:selected-db="selectedDatabase"
        v-bind:databases="databases">
      </TableNav>
      <div class="left-column">
        <aside class="menu">
          <p class="menu-label">Tables</p>
          <ul class="menu-list">
            <li v-for="table in tables" v-bind:title="table.name">
              <router-link :to="{ name: 'tableStructure', params: { name: table.name }}" active-class="is-active">
                <span class="icon">
                  <i class="fa fa-table" aria-hidden="true"></i>
                </span>
                {{ table.name }}
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="right-column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TableNav from './partials/TableNav.vue';
var DB = require('../services/DbService');
export default {
  name: 'tables',
  data () {
    return {
      selectedDatabase: DB.config.database,
      tables: [],
      databases: []
    }
  },  
  components: {
    TableNav
  },
  methods: {
    // Event trigger from child
    databaseChange(newDbName) {
      DB.config.database = newDbName; 
      this.selectedDatabase = newDbName; 
      this.loadTables();
    },
    loadDatabases () {
      DB.getDatabases().then((resp) => {
        if (resp.length > 0) {
          this.databases = resp;
        }
      });
    },
    loadTables () {
      DB.getTables().then((resp) => {
        if (resp.length > 0) {
          this.tables = resp;
          this.$router.push(`/tables/${resp[0].name}/structure`);
        }
      });
    },
    loadAll () {
      this.loadDatabases();
      this.loadTables();
    }
  },
  created() {
    this.loadAll();
  }
}
</script>

<style scoped>
  .columns {
    min-height: 100vh;
  }
  .left-column {
    border-right: 2px solid rgba(0,0,0,0.20);
    height: 100%;
    left: 0;
    overflow: auto;
    padding: 10px;
    position: fixed;
    top: 54px;
    width: 210px;
  }
  .left-column .menu {
    margin-bottom: 60px;
  }
  .left-column li {
    white-space: nowrap;
  }
  .right-column {
    height: 100%;
    left: 210px;
    overflow: auto;
    position: fixed;
    padding-bottom: 54px;
    right: 0;
    top: 54px;
  }
</style>

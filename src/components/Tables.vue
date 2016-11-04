<template>
  <div id="app">
    <div class="columns is-gapless">
      <div class="left-column">
        <div class="control">
          <span class="select">
            <select v-model="selectedDatabase">
              <option v-for="database in databases">{{database.Database}}</option>
            </select>
          </span>
        </div>
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
      <TableNav v-if="$route.params.name" v-bind:table-name="$route.params.name"></TableNav>
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
  watch: {
    selectedDatabase: function(newSelection) {
      DB.config.database = newSelection; 
      this.loadTables();
    }
  },
  methods: {
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
    width: 210px;
  }
  .left-column select {
    width: 100%;
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

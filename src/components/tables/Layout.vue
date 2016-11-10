<template>
  <div id="app">
    <div class="columns is-gapless">
      <TableNav :table-name="$route.params.name"></TableNav>
      <div class="left-column">
        <DbSelection
          v-on:databaseChange="databaseChange"
          :selected-db="selectedDatabase"
          :databases="databases"
          >
        </DbSelection>
        <TableList :tables="tables" v-show="selectedDatabase"></TableList>
        <NoDbSelected v-show="!selectedDatabase"></NoDbSelected>
      </div>
      <div class="right-column">
        <router-view></router-view>
      </div>
    </div>
    <AddDbModal v-on:databaseAdded="databaseAdded"><AddDbModal>
  </div>
</template>

<script>
  import TableNav from '../partials/TableNav.vue';
  import DbSelection from '../partials/DbSelection.vue';
  import TableList from '../partials/TableList.vue';
  import NoDbSelected from '../partials/NoDbSelected.vue';
  import AddDbModal from '../partials/AddDbModal.vue';

  const DB = require('../../services/DbService');

  export default {
    name: 'tables',
    data () {
      return {
        selectedDatabase: '',
        tables: [],
        databases: [] 
      }
    },
    components: {
      TableNav,
      DbSelection,
      TableList,
      NoDbSelected,
      AddDbModal
    },
    methods: {
      // Event trigger from child
      databaseChange(selectedDb) {
        this.selectedDatabase = selectedDb; 
        this.loadTables();
      },
      // Event trigger from child
      databaseAdded(dbName) {
        this.databases.push(dbName);
        this.selectedDatabase = dbName;
        this.loadTables();
      },
      loadDatabases () {
        DB.getDatabases().then((resp) => {
          this.databases = resp;
        });
      },
      loadTables () {
        if (this.selectedDatabase === '') {
          this.tables = [];
        } else {
          DB.getTables().then((resp) => {
            this.tables = resp;
            if (resp.length > 0) {
              this.$router.push(`/tables/${resp[0].name}/structure`);
            } else {
              this.$router.push('/tables/not-set');
            }
          });
        }
      },
      loadAll () {
        this.loadDatabases();
        this.loadTables();
      }
    },
    created() {
      this.loadAll();
    }
  };
</script>

<style scoped>
  .columns {
    min-height: 100vh;
  }
  .left-column {
    background-color: #fff;
    border-right: 2px solid rgba(0,0,0,0.20);
    height: 100%;
    left: 0;
    overflow: auto;
    padding: 10px;
    position: fixed;
    top: 0;
    width: 210px;
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

<template>
  <div class="content">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <h2>Available Databases</h2>
        <div class="box">
          <table class="table is-marginless">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(database, index) in databases">
                <td>
                  <a v-on:click="goToDatabase(database)">{{database}}</a>
                </td>
                <td class="is-icon">
                  <a v-on:click="deleteDatabase(database, index)" class="button is-small is-danger is-outlined">
                    <span class="icon is-small">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const DB = require('../../services/DbService');
  const NS = require('../../services/NotificationService');
  
  export default {
    name: 'databaseList',
    computed: {
      databases () {
        return this.$store.state.databases;
      }
    },
    methods: {
      goToDatabase (dbName) {
        this.$store.commit('setSelectedDb', dbName);
        this.$router.push('/tables');
      },
      deleteDatabase (dbName, index) {
        let msg = {
          type:'info', 
          title:'Delete Database', 
          buttons:['OK', 'Cancel'], 
          message: `Are you sure to delete "${dbName}" ?`, 
          detail: 'This action cannot be undone'
        };
        let selection = this.$electron.remote.dialog.showMessageBox(msg);
        if (selection === 0) {
          DB.deleteDatabase(dbName).then((response) => {
            this.$store.commit('removeDatabase', index);
            NS.success('Delete', 'Database was deleted');
          });
        }
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-top: 40px;
  }
  .content a:not(.button) {
    border-bottom: none;
  }
  .button .icon:last-child {
    margin-left: -2px;
  }
  .table td.is-icon .fa {
    font-size: inherit;
    height: 16px;
    line-height: inherit;
    width: 12px;
  }
</style>

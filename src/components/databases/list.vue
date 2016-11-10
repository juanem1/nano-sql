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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(database, index) in databases">
                <td>
                  <a v-on:click="goToDatabase(database)">{{database}}</a>
                </td>
                <td class="is-icon">
                  <a class="button is-small is-info is-outlined is-disabled">
                    <span class="icon is-small">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                  </a>
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
  export default {
    name: 'databaseList',
    data () {
      return {
        databases: []
      }
    },
    methods: {
      goToDatabase (dbName) {
        DB.selectedDatabase = dbName;
        this.$router.push('/tables');
      },
      deleteDatabase (dbName, index) {
        if (confirm(`Are you sure to delete "${dbName}" ?`)) {
          DB.deleteDatabase(dbName).then((response) => {
            this.databases.splice(index, 1);
          });
        }
      }
    },
    created () {
      DB.getDatabases().then((response) => {
        this.databases = response;
      });
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

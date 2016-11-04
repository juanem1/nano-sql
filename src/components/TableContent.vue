<template>
  <div>
    <table class="table is-striped is-narrow">
      <thead>
        <tr>
          <th v-for="column in columns">{{column}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in content">
          <td v-for="(val, key) in row">{{val}}</td>
        </tr>
      </tbody>
    </table>
    <div class="status-bar">
      <nav class="nav">
        <div class="container">
          <div class="nav-right">
            <div class="control has-addons">
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </a>
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  const DB = require('../services/DbService');
  export default {
    name: 'tableContent',
    data () {
      return {
        columns: [],
        content: []
      }
    },
    methods: {
      getContent(tableName) {
        DB.getTableContent(tableName).then((resp) => {
          this.columns = Object.keys(resp[0]);
          this.content = resp;
        });
      }
    },
    created() {
      this.getContent(this.$route.params.name);
    }
  }
</script>

<style scoped>
  .table {
    margin-bottom: 52px;
  }
  .table td {
    vertical-align: middle;
  }
  .status-bar {
    bottom: 0;
    box-shadow: 0 -2px 3px rgba(10,10,10,.1);
    left: 210px;
    position: fixed;
    right: 0;
  }
  .status-bar .control {
    padding: 10px;
  }
</style>
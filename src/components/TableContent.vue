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
          <div class="nav-left">
            <span class="nav-item is-tab">{{rowsLabel}}</span>
            <span class="nav-item" v-if="showPaginationControls">Page {{currentPage}} of {{paginationPages}}</span>
          </div>
          <div class="nav-right" v-if="showPaginationControls">
            <div class="control has-addons">
              <a v-bind:class="{'is-disabled':firstPage}" class="button" v-on:click="prevPage">
                <span class="icon is-small">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </a>
              <a v-bind:class="{'is-disabled':lastPage}" class="button" v-on:click="nextPage">
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
  const PS = require('../services/PaginationService');
  export default {
    name: 'tableContent',
    data () {
      return {
        columns: [],
        content: [],
        totalRows: 0,
        rowsLabel: '',
        showPaginationControls: false,
        paginationPages: 0,
        currentPage: 1,
        firstPage: true,
        lastPage: false
      }
    },
    methods: {
      getContent() {
        DB.getTableContent(this.$route.params.name, this.currentPage).then((resp) => {
          if (resp.length) {
            this.columns = Object.keys(resp[0]);
            this.content = resp;
          }
        });
      },
      getTotalRows() {
        DB.getTotalRows(this.$route.params.name).then((r) => {
          this.totalRows = r[0].rows;
          this.rowsLabel = PS.rowsLabel(r[0].rows);
          this.showPaginationControls = PS.showControls(r[0].rows);
          this.paginationPages = PS.getPages(r[0].rows);
        });
      },
      nextPage() {
        if (this.currentPage < this.paginationPages) {
          this.currentPage++;
          this.$router.push({ query: { page: this.currentPage }});
          this.getContent();
          this.firstPage = false;
          if (this.currentPage == this.paginationPages) {
            this.lastPage = true;
          }
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.$router.push({ query: { page: this.currentPage }});
          this.getContent();
          this.lastPage = false;
          if (this.currentPage == 1) {
            this.firstPage = true;
          }
        }
      }
    },
    created() {
      this.getContent();
      this.getTotalRows();
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
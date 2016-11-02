<template>
  <div id="app">
    <div class="columns is-gapless">
      <div class="column is-2">
        <aside class="menu">
          <p class="menu-label">Tables</p>
          <ul class="menu-list">
            <li v-for="table in tables">
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
      <div class="column is-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
var DB = require('../services/DbService');
export default {
  name: 'tables',
  data () {
    return {
      tables: []
    }
  },  

  methods: {
    getTables () {
      DB.getTables().then((resp) => {
        this.tables = resp;
      });
    }
  },

  created() {
    this.getTables();
  }
}
</script>

<style scoped>
  .columns {
    min-height: 100vh;
  }
  .column.is-2 {
    border-right: 2px solid rgba(0,0,0,0.20);
    padding: 10px;
  }
</style>

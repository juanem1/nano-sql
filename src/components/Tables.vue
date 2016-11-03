<template>
  <div id="app">
    <div class="columns is-gapless">
      <div class="left-column">
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
      tables: []
    }
  },  
  components: {
    TableNav
  },
  methods: {
    getTables () {
      DB.getTables().then((resp) => {
        this.tables = resp;
        if (resp.length > 0) {
          this.$router.push(`tables/${resp[0].name}/structure`);
        }
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
  .left-column {
    border-right: 2px solid rgba(0,0,0,0.20);
    height: 100%;
    left: 0;
    padding: 10px;
    position: fixed;
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

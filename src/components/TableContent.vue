<template>
  <div>
    <TableNav v-bind:table-name="$route.params.name"></TableNav>
    <table class="table">
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
  </div>
</template>

<script>
  import TableNav from './partials/TableNav.vue';
  const DB = require('../services/DbService');
  export default {
    name: 'tableContent',
    data () {
      return {
        columns: [],
        content: []
      }
    },
    components: {
      TableNav
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

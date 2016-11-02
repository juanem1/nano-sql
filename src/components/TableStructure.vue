<template>
  <div>
    <TableNav v-bind:table-name="$route.params.name"></TableNav>
    <table class="table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Length</th>
          <th>Unsigned</th>
          <th>Allow Null</th>
          <th>Key</th>
          <th>Default</th>
          <th>Extra</th>
          <th>Collation</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in structure">
          <td>{{row.COLUMN_NAME}}</td>
          <td>{{row.DATA_TYPE}}</td>
          <td>{{ getRowLength(row) }}</td>
          <td>{{ getUnsigned(row) }}</td>
          <td>{{row.IS_NULLABLE}}</td>
          <td>{{row.COLUMN_KEY}}</td>
          <td>{{row.COLUMN_DEFAULT}}</td>
          <td>{{row.EXTRA}}</td>
          <td>{{row.COLLATION_NAME}}</td>
          <td>{{row.COLUMN_COMMENT}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TableNav from './partials/TableNav.vue';
  const DB = require('../services/DbService');
  export default {
    name: 'tableStructure',
    data () {
      return {
        structure: {}
      }
    },
    components: {
      TableNav
    },
    watch: {
      '$route' (to, from) {
        this.getStructure(to.params.name);
      }
    },
    methods: {
      getStructure (tableName) {
        DB.getTableStructure(tableName).then((resp) => {
          this.structure = resp;
        });
      },
      getRowLength(row) {
        switch(row.DATA_TYPE) {
          case 'int':
            return row.NUMERIC_PRECISION;
          case 'varchar':
            return row.CHARACTER_MAXIMUM_LENGTH;
        }
      },
      getUnsigned(row) {
        return row.COLUMN_TYPE.slice(-8) === 'unsigned' ?
          'YES' : 'NO';
      }
    },
    created() {
      this.getStructure(this.$route.params.name);
    }
  }
</script>

<style>
</style>
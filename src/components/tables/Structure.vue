<template>
  <div>
    <table class="table is-striped is-narrow">
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
  const DB = require('../../services/DbService');
  export default {
    name: 'tableStructure',
    data () {
      return {
        structure: {}
      }
    },
    watch: {
      '$route' (to, from) {
        this.getStructure(to.params.name);
      }
    },
    methods: {
      getStructure (tableName) {
        let db = this.$store.state.selectedDatabase;
        DB.getTableStructure(db, tableName).then((resp) => {
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
  .table td {
    vertical-align: middle;
  }
</style>

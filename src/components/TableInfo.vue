<template>
  <div>
    <TableNav v-bind:table-name="$route.params.name"></TableNav>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3"><strong>Schema:</strong> {{info.TABLE_SCHEMA}}</div>
          <div class="column is-9"><strong>Table name:</strong> {{info.TABLE_NAME}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Type:</strong> {{info.ENGINE}}</div>
          <div class="column is-9"><strong>Created at:</strong> {{info.CREATE_TIME}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Encoding:</strong></div>
          <div class="column is-9"><strong>Updated at:</strong> {{info.UPDATE_TIME}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Collation:</strong> {{info.TABLE_COLLATION}}</div>
          <div class="column is-9"></div>
        </div>
      </div>
    </section>
    <hr>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3"><strong>Number of rows:</strong> {{info.TABLE_ROWS}}</div>
          <div class="column is-9"><strong>Data size:</strong> {{info.DATA_LENGTH}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Row format:</strong> {{info.ROW_FORMAT}}</div>
          <div class="column is-9"><strong>Max data size:</strong> {{info.MAX_DATA_LENGTH}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Avg. row legth:</strong> {{info.AVG_ROW_LENGTH}}</div>
          <div class="column is-9"><strong>Index size:</strong> {{info.INDEX_LENGTH}}</div>
        </div>
        <div class="columns">
          <div class="column is-3"><strong>Auto increment:</strong> {{info.AUTO_INCREMENT}}</div>
          <div class="column is-9"><strong>Free data size:</strong> {{info.DATA_FREE}}</div>
        </div>
      </div>
    </section>
    <hr>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-10">
            <label class="label">Comments:</label>
            <p class="control">
              <textarea class="textarea" placeholder="Comments">{{info.TABLE_COMMENT}}</textarea>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import TableNav from './partials/TableNav.vue';
  const DB = require('../services/DbService');
  export default {
    name: 'tableInfo',
    data () {
      return {
        info: {}
      }
    },
    components: {
      TableNav
    },
    methods: {
      getInfo () {
        DB.getTableInfo(this.$route.params.name).then((resp) => {
          this.info = resp[0];
        });
      }
    },
    created() {
      this.getInfo();
    }
  }
</script>

<style scoped>
  hr {
    margin: 0;
  }
  textarea {
    width: 100%;
  }
</style>
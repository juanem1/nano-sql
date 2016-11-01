<template>
  <div>
    <TableNav v-bind:table-name="$route.params.name"></TableNav>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Instrument</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Misty Abbott</td>
          <td>Bass Guitar</td>
          <td class="is-icon">
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </td>
          <td class="is-icon">
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TableNav from './partials/TableNav.vue';
  const Tables = require('../services/Tables');
  const tables = new Tables();
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
    methods: {
      getStructure () {
        tables.getTableStructure(this.$route.params.name).then((resp) => {
          this.structure = resp;
          console.log(resp);
        });
      }
    },
    created() {
      this.getStructure();
    }
  }
</script>

<style>
</style>
<template>
  <div>
    <TableNav v-bind:table-name="$route.params.name"></TableNav>
    <h1>Table Content {{$route.params.name}}</h1>
  </div>
</template>

<script>
  import TableNav from './partials/TableNav.vue';
  export default {
    name: 'tableContent',
    data () {
      return {
        tables: []
      }
    },
    components: {
      TableNav
    }
  }
</script>

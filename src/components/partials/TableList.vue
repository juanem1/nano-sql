<template>
  <aside class="menu" v-show="tables.length">
    <p class="menu-label">Tables</p>
    <ul class="menu-list">
      <li v-for="table in tables" :title="table.name">
        <router-link :to="{ name: 'tableStructure', params: { name: table.name }}" active-class="is-active">
          <span class="icon">
            <i class="fa fa-table" aria-hidden="true"></i>
          </span>
          {{ table.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'tableList',
    props: ['tables']
  }
</script>

<style scoped>
  .menu {
    margin-bottom: 60px;
  }
  .menu .menu-label {
    padding: 0 10px;
  }
  .menu-list a {
    border-radius: 0;
  }
  li {
    white-space: nowrap;
  }
</style>

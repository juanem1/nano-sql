<template>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-right">
          <router-link class="nav-item is-tab" :to="{ name: 'tableStructure', params: { name: tableName }}" active-class="is-active">
            Structure
          </router-link>
          <router-link class="nav-item is-tab" :to="{ name: 'tableContent', params: { name: tableName }}" active-class="is-active">
            Content
          </router-link>
          <router-link class="nav-item is-tab" :to="{ name: 'tableInfo', params: { name: tableName }}" active-class="is-active">
            Table Info
          </router-link>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    name: 'tableNav',
    props: ['tableName']
  }
</script>
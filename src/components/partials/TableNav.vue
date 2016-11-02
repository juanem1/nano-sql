<template>
    <nav class="nav">
      <div class="container">
        <div class="nav-right nav-menu">
          <span class="nav-item is-tab">
            <router-link class="button" :to="{ name: 'tableStructure', params: { name: tableName }}" active-class="is-active">
              <span>Structure</span>
            </router-link>
            <router-link class="button" :to="{ name: 'tableContent', params: { name: tableName }}" active-class="is-active">
              <span>Content</span>
            </router-link>
            <router-link class="button" :to="{ name: 'tableInfo', params: { name: tableName }}" active-class="is-active">
              <span>Table Info</span>
            </router-link>
          </span>
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

<style scoped>
  .nav {
    border-bottom: 2px solid rgba(0,0,0,0.20);
  }
</style>
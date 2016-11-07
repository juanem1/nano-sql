<template>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-right nav-menu">
          <span class="nav-item is-tab">
            <router-link class="button" :class="{'is-disabled':!tableName}" :to="{ name: 'tableStructure', params: { name: path }}" active-class="is-primary">
              <span>Structure</span>
            </router-link>
            <router-link class="button" :class="{'is-disabled':!tableName}" :to="{ name: 'tableContent', params: { name: path }}" active-class="is-primary">
              <span>Content</span>
            </router-link>
            <router-link class="button" :class="{'is-disabled':!tableName}" :to="{ name: 'tableInfo', params: { name: path }}" active-class="is-primary">
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
    props: ['tableName'],
    computed: {
      path() {
        return ( ! this.tableName) ? '#' : this.tableName;
      }
    }
  }
</script>

<style scoped>
  .nav {
    left: 210px;
    position: fixed;
    right: 0;
    top: 0;
  }
</style>

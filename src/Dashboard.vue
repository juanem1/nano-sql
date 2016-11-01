<template>
  <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-right">
          <a class="nav-item is-tab is-active">Structure</a>
          <a class="nav-item is-tab">Content</a>
          <a class="nav-item is-tab">Table Info</a>
          <a class="nav-item is-tab">Disconect</a>
        </div>
      </div>
    </nav>  
    <div class="columns">
      <div class="column is-2">
        <pre>
          {{tables}}
        </pre>
      </div>
      <div class="column is-10">
        
      </div>
    </div>
  </div>
</template>

<script>
var Tables = require('./Tables');
var tables = new Tables();
export default {
  name: 'dashboard',
  data () {
    return {
      tables: {}
    }
  },  

  mounted () {
    tables.getTables().then((resp) => {
      this.tables = resp;
    });
  },

  methods: {
    
  }
}
</script>

<style>
</style>

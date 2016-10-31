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
        tables
      </div>
      <div class="column is-10">
        content
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      form: {}
    }
  },

  methods: {
    connectOnSubmit () {
      console.log(this.form);
      console.log(this);
    }
  }
}
</script>

<style>
</style>

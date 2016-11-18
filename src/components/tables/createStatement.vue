<template>
  <div class="modal" :class="{'is-active':isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create statement for: {{tableName}}</p>
        <button class="delete" v-on:click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <pre>{{createStatement}}</pre>
      </section>
      <footer class="modal-card-foot">
        <a class="button" v-on:click="closeModal">Close</a>
      </footer>
    </div>
  </div>
</template>

<script>
  const DB = require('../../services/DbService');
  export default {
    name: 'createStatement',
    data () {
      return {
        isActive: false,
        createStatement: ''
      }
    },
    props: ['tableName'],
    mounted () {
      // Listen when the os menu is clicked
      this.$electron.ipcRenderer.on('show-create-table', (arg) => {
        this.isActive = true;
      });
    },
    updated () {
      let db = this.$store.state.selectedDatabase;
      DB.getCreateStatement(db, this.tableName).then(response => {
        this.createStatement = response[0]['Create Table'];
      });
    },
    methods: {
      closeModal() {
        this.isActive = false;
      }
    }
  }
</script>

<style scoped>
  pre {
    background-color: #fff;
    font-size: .9rem;
  }
</style>

<template>
  <div class="modal" :class="{'is-active':isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Database</p>
        <button class="delete" v-on:click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <form v-on:submit.prevent="addDatabase">
          <div class="notification is-danger" v-if="error">
            Invalid Database name. Only allow characters "a-z", "A-Z", "0-9", "_" and "-"
          </div>
          <label class="label">Database Name:</label>
          <p class="control">
            <input class="input" type="text" placeholder="Database Name" v-model="name" />
          </p>
          <label class="label">Database Encoding:</label>
          <p class="control">
            <span class="select is-disabled">
              <select>
                <option value="0">UTF-8 Unicode (utf8)</option>
              </select>
            </span>
          </p>
          <label class="label">Database Collation:</label>
          <p class="control">
            <span class="select is-disabled">
              <select>
                <option value="0">Default (utf8_general_ci)</option>
              </select>
            </span>
          </p>
        </form>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" v-on:click="addDatabase">Add Database</a>
        <a class="button" v-on:click="closeModal">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
  const DB = require('../../services/DbService');
  
  export default {
    name: 'addDbModal',
    data () {
      return {
        name: '',
        error: false,
        isActive: false
      }
    },
    mounted() {
      // Listen when the os menu is clicked
      this.$electron.ipcRenderer.on('add-database', (arg) => {
        this.isActive = true;
      });
    },
    methods: {
      addDatabase() {
        // TODO: Add validations
        DB.createDatabase(this.name).then((resp) => {
          this.$emit('databaseAdded', this.name);
          this.closeModal();
        }).catch((error) => {
          this.error = true;
        });
      },
      closeModal() {
        this.name = '';
        this.isActive = false;
        this.error = false;
      }
    }
  }
</script>

<style scoped>
  label {
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
    width: 25%;
  }
  .label:not(:last-child) {
    margin-bottom: 0;
  }
  .control {
    display: inline-block;
    width: 70%;
  }
  span.select, 
  select {
    width: 100%;
  }
</style>

<template>
  <div class="connect-comp">
    <aside class="menu">
      <p class="menu-label">
        Connections
      </p>
      <ul class="menu-list">
        <li v-for="conn in connections">
          <a v-on:click="loadConfig(conn.name)">{{conn.name}}</a>
        </li>
      </ul>
    </aside>
    <div class="connect-comp-container">
      <div v-show="notification" class="notification is-danger">
        Unable to connect to host because access was denied.
      </div>
      <form class="box" v-on:submit.prevent="connectOnSubmit">
        <label class="label">Name:</label>
        <p class="control">
          <input class="input" type="text" placeholder="Connection Name (optional)" v-model="form.name" />
        </p>
        <label class="label">Type:</label>
        <p class="control">
          <span class="select is-fullwidth">
            <select v-model="form.type">
              <option>mysql</option>
              <option>mssql</option>
            </select>
          </span>
        </p>
        <label class="label">Host:</label>
        <p class="control">
          <input class="input" type="text" placeholder="Host" v-model="form.host" />
        </p>
        <label class="label">User:</label>
        <p class="control">
          <input class="input" type="text" placeholder="User" v-model="form.user" />
        </p>
        <label class="label">Password:</label>
        <p class="control">
          <input class="input" type="password" placeholder="Password" v-model="form.password" />
        </p>
        <label for="" class="label">Database:</label>
        <p class="control">
          <input class="input" type="text" placeholder="Optional" v-model="form.database" />
        </p>
        <label for="" class="label">Port:</label>
        <p class="control">
          <input class="input" type="text" placeholder="Port" v-model="form.port" />
        </p>
        <p class="control">
          <button v-bind:class="{ 'is-loading': btnIsLoading }" type="submit" class="button is-primary">
            <span class="icon">
              <i class="fa fa-plug" aria-hidden="true"></i>
            </span>
            <span>Connect</span>
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

  const DB = require('../services/DbService')
  const SS = require('../services/StorageService')
  const _  = require('lodash')
  
  export default {
    name: 'connect',
    data () {
      return {
        btnIsLoading: false,
        notification: false,
        connections: [],
        form: {
          type: 'mysql'
        }
      }
    },
    methods: {
      connectOnSubmit () {
        this.btnIsLoading = true;
        DB.connect(this.form).then(() => {
          this.$router.push('/tables');
          if (this.form.database) {
            this.$store.commit('setSelectedDb', this.form.database);
          }
          // Save connection config in the store
          if (this.form.name !== '') {
            if (_.findIndex(this.connections, {name: this.form.name}) === -1) {
              this.connections.push(this.form);
              SS.setItem('connections', JSON.stringify(this.connections));
            } else {
              // update 
            }
          }
          
          // Enable menu items
          this.$electron.ipcRenderer.send('enable-menu-item', 'add-database');
          this.$electron.ipcRenderer.send('enable-menu-item', 'disconnect');
          this.$electron.ipcRenderer.send('enable-menu-item', 'manage-databases');
          this.$electron.ipcRenderer.send('enable-menu-item', 'show-create-table');
        }).catch((error) => {
          this.notification = true;
        }).then(() => {
          this.btnIsLoading = false;
        });
      },
      loadConfig(name) {
        let idx = _.findIndex(this.connections, {name: name})
        this.form = this.connections[idx];
      }
    },
    created () {
      let conns = SS.getItem('connections');
      if (conns !== null) {
        this.connections = JSON.parse(conns);
      }
    }
  }
</script>

<style scoped>
  .connect-comp {
    display: flex;
    min-height: 100vh;
  }
  .connect-comp-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  .box {
    width: 33%;
  }
  .menu {
    margin-left: 20px;
    padding-top: 40px;
    width: 200px;
  }
</style>

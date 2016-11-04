<template>
  <div class="connect-comp">
    <div class="connect-comp-container">
      <div v-show="notification" class="notification is-danger">
        Unable to connect to host because access was denied.
      </div>
      <form class="box" v-on:submit.prevent="connectOnSubmit">
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
          <input class="input" type="text" placeholder="Database" v-model="form.database" />
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
const DB = require('../services/DbService');
export default {
  name: 'connect',
  data () {
    return {
      btnIsLoading: false,
      notification: false,
      form: {
        host: '192.168.10.10',
        user: 'homestead',
        password: 'secret',
        database: 'nninmobiliaria',
        port: 3306
      }
    }
  },

  methods: {
    connectOnSubmit () {
      this.btnIsLoading = true;
      DB.connect(this.form).then(() => {
        this.$router.push('/tables');
      }).catch((error) => {
        this.notification = true;
      }).then(() => {
        this.btnIsLoading = false;
      });
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
</style>

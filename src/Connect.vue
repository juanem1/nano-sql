<template>
  <div class="connect-comp">
    <div class="connect-comp-container">
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
          <button type="submit" class="button is-primary">Connect</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'connect',
  data () {
    return {
      form: {}
    }
  },

  methods: {
    connectOnSubmit () {
      console.log(this.$router.push('dashboard'))
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
    justify-content: center;
    width: 100%;
  }
  .box {
    width: 33%;
  }
</style>

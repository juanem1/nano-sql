<template>
  <div class="main-layout">
    <router-view></router-view> 
  </div>
</template>

<script>
  const DB = require('../services/DbService');
  export default {
    name: 'mainLayout',
    mounted() {
      // Listen when the os menu is clicked
      this.$electron.ipcRenderer.on('disconnect', (arg) => {
        DB.disconnect();
        this.$router.push('/connect');
        this.$electron.ipcRenderer.send('disable-menu-item', 'add-database');
        this.$electron.ipcRenderer.send('disable-menu-item', 'disconnect');
        this.$electron.ipcRenderer.send('disable-menu-item', 'manage-databases');
      });
    }
  }
</script>

<style scoped>
</style>

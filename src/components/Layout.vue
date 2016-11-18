<template>
  <div class="main-layout">
    <router-view></router-view> 
    <AddDbModal><AddDbModal>
  </div>
</template>

<script>
  import AddDbModal from './databases/AddModal.vue';
  
  const DB = require('../services/DbService');
  const NS = require('../services/NotificationService');

  export default {
    name: 'mainLayout',
    components: {
      AddDbModal
    },
    mounted() {
      // Listen when the os menu is clicked
      this.$electron.ipcRenderer.on('disconnect', (arg) => {
        DB.disconnect();
        this.$router.push('/connect');
        this.$electron.ipcRenderer.send('disable-menu-item', 'add-database');
        this.$electron.ipcRenderer.send('disable-menu-item', 'disconnect');
        this.$electron.ipcRenderer.send('disable-menu-item', 'manage-databases');
        this.$electron.ipcRenderer.send('disable-menu-item', 'show-create-table');
        NS.success('Disconnect', 'Disconnected from service');
      });
      // Listen when the os menu is clicked
      this.$electron.ipcRenderer.on('manage-databases', (arg) => {
        this.$router.push('/databases');
      });
    }
  }
</script>

<style scoped>
</style>

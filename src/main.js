'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueElectron from 'vue-electron';
import routes from './routes';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueElectron);

const store = new Vuex.Store({
  state: {
    selectedDatabase: '',
    databases: []
  },
  mutations: {
  	setSelectedDb (state, dbName) {
      state.selectedDatabase = dbName;
    },
    setDatabases (state, dbList) {
      dbList.forEach(item => state.databases.push(item));
    },
    addDatabase (state, newName) {
      state.databases.push(newName);
      state.selectedDatabase = newName;
    },
    removeDatabase (state, index) {
      state.databases.splice(index, 1);
    }
  }
});

const router = new VueRouter({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

const app = new Vue({
  store,
  router
}).$mount('#app');

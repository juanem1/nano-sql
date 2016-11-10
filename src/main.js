'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueElectron from 'vue-electron';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueElectron);

const router = new VueRouter({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

const app = new Vue({
  router
}).$mount('#app');

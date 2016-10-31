'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Connect from './Connect.vue';
import Dashboard from './Dashboard.vue';

const routes = [
  { path: '/', component: Connect },
  { path: '/dashboard', component: Dashboard }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes // short for routes: routes
});

const app = new Vue({
  router
}).$mount('#app');

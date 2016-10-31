'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

const Bar = { template: '<div>bar</div>' };

const routes = [
  { path: '/foo', component: App },
  { path: '/bar', component: Bar }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes // short for routes: routes
});

const app = new Vue({
  router
}).$mount('#app');

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Connect from './components/Connect.vue';
import Tables from './components/Tables.vue';
import TableStructure from './components/TableStructure.vue';
import TableContent from './components/TableContent.vue';
import TableInfo from './components/TableInfo.vue';

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Connect 
  }, { 
    path: '/tables', 
    name: 'tables', 
    component: Tables,
    children: [
      { path: ':name/structure', name: 'tableStructure', component: TableStructure },
      { path: ':name/content', name: 'tableContent', component: TableContent },
      { path: ':name/info', name: 'tableInfo', component: TableInfo }
    ] 
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes // short for routes: routes
});

const app = new Vue({
  router
}).$mount('#app');

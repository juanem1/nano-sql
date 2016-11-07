'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Connect from './components/Connect.vue';
import Layout from './components/Layout.vue';
import TableStructure from './components/tables/Structure.vue';
import TableContent from './components/tables/Content.vue';
import TableInfo from './components/tables/Info.vue';

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Connect 
  }, { 
    path: '/tables', 
    name: 'tables', 
    component: Layout,
    children: [
      { path: ':name/structure', name: 'tableStructure', component: TableStructure },
      { path: ':name/content', name: 'tableContent', component: TableContent },
      { path: ':name/info', name: 'tableInfo', component: TableInfo }
    ] 
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

const app = new Vue({
  router
}).$mount('#app');

'use strict';

import Layout from './components/Layout.vue';
import Connect from './components/Connect.vue';
import TablesLayout from './components/tables/TablesLayout.vue';
import TableStructure from './components/tables/Structure.vue';
import TableContent from './components/tables/Content.vue';
import TableInfo from './components/tables/Info.vue';
import TableNotSet from './components/tables/NotSet.vue';
import Databases from './components/databases/list.vue';

export default [
  { 
    path: '/', 
    name: 'home', 
    component: Layout,
    redirect: '/connect',
    children: [
      {
        path: 'connect', 
        name: 'connect', 
        component: Connect,
      }, {
        path: 'tables', 
        name: 'tables', 
        component: TablesLayout,
        children: [
          { path: ':name/structure', name: 'tableStructure', component: TableStructure },
          { path: ':name/content', name: 'tableContent', component: TableContent },
          { path: ':name/info', name: 'tableInfo', component: TableInfo },
          { path: 'not-set', name: 'tableNotSet', component: TableNotSet }
        ]
      }, {
        path: 'databases', 
        name: 'databases', 
        component: Databases
      }
    ] 
  }
];

/*export default [
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
      { path: ':name/info', name: 'tableInfo', component: TableInfo },
      { path: 'not-set', name: 'tableNotSet', component: TableNotSet }
    ]
  }, {
    path: '/databases', 
    name: 'databases', 
    component: Databases
  }
];*/

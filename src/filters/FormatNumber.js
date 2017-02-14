'use strict'

import Vue from 'vue'

Vue.filter('formatNumber', function (value) {
  return Intl.NumberFormat().format(value)
})

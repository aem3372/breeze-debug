addEventListener('DOMContentLoaded', function () {
  'use strict';
  //var json = require("./jsbridge.json");
  //console.log(json);
  window.onerror = function(e) {
    window.alert(e);
  }
  //import opt from "./jsbridge.vue";//其实不用写完，会自动查找。
  var opt = require('./jsbridge.vue');
  var app = new Vue(opt).$mount('#app');
});
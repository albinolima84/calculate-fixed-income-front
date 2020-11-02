import App from './App.vue';
import Vue from 'vue'
import axios from 'axios';

Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  render: h => h(App),
});

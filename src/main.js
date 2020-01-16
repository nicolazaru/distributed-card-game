/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'

import VueSocketio from 'vue-socket.io';
// Change IP address here
let ip = '10.20.5.120';
Vue.use(VueSocketio, 'http://'+ ip +':8070');

Vue.config.productionTip = false;
//Vue.config.disableHostCheck = true;

new Vue({
  render: h => h(App)
}).$mount('#app');


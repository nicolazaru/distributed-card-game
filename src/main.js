/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'

import VueSocketio from 'vue-socket.io';
// Change IP address here

Vue.use(VueSocketio, 'http://'+ '192.168.0.82' +':8070');

Vue.config.productionTip = false;
//Vue.config.disableHostCheck = true;

new Vue({
  render: h => h(App)
}).$mount('#app');


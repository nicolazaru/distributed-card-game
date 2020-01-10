/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'

import VueSocketio from 'vue-socket.io';
// Change IP address here

Vue.use(VueSocketio, 'http://'+ '10.0.0.45' +':8010');

Vue.config.productionTip = false;
//Vue.config.disableHostCheck = true;

new Vue({
  render: h => h(App)
}).$mount('#app');


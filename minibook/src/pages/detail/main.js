import Vue from 'vue'
import App from './detail'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch);
Vue.config.productionTip = false;
const app = new Vue(App);
app.$mount();

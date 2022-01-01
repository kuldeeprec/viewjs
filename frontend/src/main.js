import Vue from 'vue';
import App from './App.vue';
import './plugins/filters';
import VueTailwind from 'vue-tailwind/dist/full';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import events from './plugins/events';
import interceptor from './plugins/interceptor';
import VueMeta from 'vue-meta';
import router from './routes/index';
import { store } from './store/store';

import VueTailwindSettings from './plugins/vue-tailwind';
import './plugins/validate';
import './assets/tailwind.css';

Vue.use(VueTailwind, VueTailwindSettings);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(VueMeta);
Vue.prototype.$bus = events;
Vue.prototype.$http = interceptor;

Vue.config.productionTip = false;

Vue.prototype.$loading = {
  show: () => {
    Vue.prototype.$bus.emit('show_loading');
  },
  hide: () => {
    Vue.prototype.$bus.emit('hide_loading');
  },
};

Vue.prototype.$toast = {
  show: (message) => {
    Vue.prototype.$bus.emit('add_toast', message);
  },
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

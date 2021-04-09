import Vue from 'vue';
import App from './App.vue';
import router from './router/router';

import stringFunctions from '../src/functions/stringFunctions';

Vue.config.productionTip = false

String.prototype.capitalize = stringFunctions.capitalize;

new Vue({
    router,
    el: '#app',
    render: h => h(App),
}).$mount('#app')

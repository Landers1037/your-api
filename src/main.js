import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import VScrollLock from 'v-scroll-lock'

Vue.use(VScrollLock);
Vue.use(VueCodeMirror);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data: function(){
    return{
      api_tool: "fetch"
    }
  },
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

Vue.config.debug = true

new Vue({
    el: '#container',
    render: h => h(App)
})
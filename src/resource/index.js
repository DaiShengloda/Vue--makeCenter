import Vue from 'vue'
import VueResource from 'vue-resource';
import Config from '@/assets/js/config'
const _ = require('lodash');

Vue.use(VueResource);
Vue.http.interceptors.push(function(request, next) {
    // request.url = Config.urlPrefix+request.url;
    if(!_.startsWith(request.url,'/')){
        request.url = '/'+request.url;
    }
    // console.log(request);
    next(function(response) {
        // console.log(response.data);
        if(response.data.error){
            console.log(response.data);
        }
        return response
    })
})
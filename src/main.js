// require('./assets/js/jquery-vendor')
require('./assets/js/datatables-vendor');

// require('./assets/css/smartadmin-production.min.css')
// require('./assets/css/smartadmin-production-plugins.min.css')
require.ensure([], function(){
	// require('./assets/css/bootstrap.min.css')
	// require('./assets/css/font-awesome.min.css')
	require('../node_modules/icheck/skins/square/green.css')
	require('../node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css')
	require('../node_modules/bootstrap-daterangepicker/daterangepicker.css')
	require('../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css')

	
	// require('../node_modules/datatables.net-bs/css/dataTables.bootstrap.css')
	// require('../node_modules/datatables.net-select-bs/css/select.bootstrap.css')
	// require('../node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.css')
	// require('../node_modules/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css')
	// require('../node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.css')
	// require('../node_modules/datatables.net-scroller-bs/css/scroller.bootstrap.css')
	
	
},'vendorCss')


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import resource from './resource'

// import VueResource from 'vue-resource';

// Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

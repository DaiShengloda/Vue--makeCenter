import Vue from 'vue';
import Vuex from 'vuex';

import sideMenu from './modules/sideMenu';
import model from './modules/model';
import project from './modules/project';
import modelType from './modules/modelType';
import industry from './modules/industry';
import category from './modules/category';
import relation from './modules/relation';
import user from './modules/user';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		sideMenu,
		model,
		project,
		modelType,
		industry,
		category,
		relation,
		user
	},
	strict: debug
});
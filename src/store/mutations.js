import * as types from './mutation-type'

const mutations = {
	[types.RECEIVE_MODULES](state, {modules}){
		state.modules = modules || {};
	},
	auth(state, {auth}){
		state.auth = auth;
	},
	messageBox(state, {show}){
		state.showMessage = show;
	}

}
export default mutations;
import module from '../mock/module';
import * as types from './mutation-type'

const actions = {
	getModules({commit, state}){
		if(state.modules && Object.keys(state.modules).length){
			return;
		}
		module.getModules(modules => {
			commit(types.RECEIVE_MODULES, {modules});
		});
	}
}
export default actions;
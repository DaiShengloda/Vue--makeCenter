import menu from '../../mock/menu';
import * as types from '../mutation-type'

const state = {
	menus: []
}

const getters = {
	menus: state => state.menus
}

const actions = {
	getMenus({commit}){
		menu.getMenus(menus => {
			commit(types.RECEIVE_MENUS, {menus});
		});
	},
	toggleShowMenu({commit}, menu){
		commit(types.SHOW_MENU, menu)
	},
	selectMenuChildren({commit}, item){
		commit(types.SELECTED_MENU_CHILDREN, item)
	}
}

const mutations = {
	[types.RECEIVE_MENUS](state, {menus}){
		state.menus = menus;
	},
	[types.SHOW_MENU](state, {index, last}){
		if(last>-1 && index != last){
			let menu = state.menus[last];
			menu.active = !menu.active;
		}
		let menu = state.menus[index];
		menu.active = !menu.active;
	},
	/**
	* index 选中的孩子的index
	* last 上一次选中的menu
	*/ 
	[types.SELECTED_MENU_CHILDREN](state, {index, last, lastItem}){
		// 获取menu
		let menu = state.menus[last];
		// 根据index获取孩子
		if(menu && menu.children){
			var child = menu.children[index];
			if(child){
				child.active = !child.active;
			}
			var lastChild = menu.children[lastItem];
			if(lastChild){
				lastChild.active = !lastChild.active;
			}
		}
	},
}

export default {
    state, 
    getters,
    actions,
    mutations
}
let menus = [
	{
		id: 'dashboard',
		text: 'Dashboard', 
		icon: 'fa-home',
		active: false,
	},
	{
		id: 'models',
		text: 'Models', 
		icon: 'fa-list',
		active: false,
		children: [
			{id: 'model', text: '模型',active: false},
			{id: 'category', text: '分类',active: false},
			{id: 'industry', text: '行业',active: false},
			{id: 'modelType', text: '模型类型',active: false},
			
		]
	},
	{
		id: 'projects',
		text: 'Projects', 
		icon: 'fa-file-text-o',
		active: false,
		children: [
			{id: 'project', text: '项目',active: false},
			{id: 'relation', text: '项目的模型',active: false}
		]
	},
	{
		id: 'import',
		text: 'Import', 
		icon: 'fa-truck',
		active: false,
		children: [
			{id: 'model', text: '模型导入',active: false},
		]
	},
	{
		id: 'users',
		text: 'Users', 
		icon: 'fa-user-o',
		active: false,
		children: [
			{id: 'user', text: '用户',active: false}
		]
	},
]

export default {
    getMenus(cb){
    	setTimeout(() => {
    		cb (menus)
    	},100);
    }  
}
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import Hello from '@/components/Hello'


Vue.use(Router)

const routes = [
	{
		path:'/login',
		component: function(resolve){
			require.ensure(['../components/auth/Auth.vue'], function(){
				resolve(require('../components/auth/Auth.vue'));
			},'dashboard');
		}
	},
	{
		path:'/',
		component: function(resolve){
			require.ensure(['../components/Content.vue'], function(){
				resolve(require('../components/Content.vue'));
			},'dashboard');
		},
		meta: { requiresAuth: true },
		children: [
			{
				path:'dashboard',
				component: function(resolve){
					require.ensure(['../components/dashboard/Dashboard.vue'], function(){
						resolve(require('../components/dashboard/Dashboard.vue'));
					},'dashboard');
				}
			},
			{
				path:'models/model',
				component: function(resolve){
					require.ensure(['../components/model/Model.vue'], function(){
						resolve(require('../components/model/Model.vue'));
					},'model');
				}
			},
			{
				path:'models/category',
				component: function(resolve){
					require.ensure(['../components/model/Category.vue'], function(){
						resolve(require('../components/model/Category.vue'));
					},'model');
				}
			},
			{
				path:'models/industry',
				component: function(resolve){
					require.ensure(['../components/model/Industry.vue'], function(){
						resolve(require('../components/model/Industry.vue'));
					},'model');
				}
			},
			{
				path:'models/modelType',
				component: function(resolve){
					require.ensure(['../components/model/ModelType.vue'], function(){
						resolve(require('../components/model/ModelType.vue'));
					},'model');
				}
			},
			{
				path:'projects/project',
				component: function(resolve){
					require.ensure(['../components/project/Project.vue'], function(){
						resolve(require('../components/project/Project.vue'));
					},'project');
				}
			},
			{
				path:'projects/relation',
				component: function(resolve){
					require.ensure(['../components/project/Relation.vue'], function(){
						resolve(require('../components/project/Relation.vue'));
					},'project');
				}
			},
			{
				path:'import/model',
				component: function(resolve){
					require.ensure(['../components/import/Model.vue'], function(){
						resolve(require('../components/import/Model.vue'));
					},'project');
				}
			},
			{
				path:'users/user',
				component: function(resolve){
					require.ensure(['../components/user/User.vue'], function(){
						resolve(require('../components/user/User.vue'));
					},'user');
				}
			},
			// {
			// 	path:'module/:id',
			// 	component: function(resolve){
			// 		require.ensure(['../components/Common.vue'], function(){
			// 			resolve(require('../components/Common.vue'));
			// 		},'module');
			// 	}
			// },
			{ path: '', redirect: '/dashboard'},
		]
	},
	// { path: '/', redirect: '/dashboard' },
	// catch all redirect
    // { path: '*', redirect: '/login' }
];
const router = new Router({
  routes
})



router.beforeEach((to, from, next) => {
  	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.state.auth) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
  	} else {
    	next() // 确保一定要调用 next()
  	}
})

export default router;
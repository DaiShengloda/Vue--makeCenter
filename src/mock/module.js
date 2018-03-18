let modules = {
	"user":{
		username : {
		    primaryKey:true,
			type: 'string',
			searchable:true,
		},
		password : {
			type: 'string',
		},
		email :{
		    type: 'string',
		    searchable:true,
		},
		department:{
		    type: 'string',
		    searchable:true,
		},
		gender : {
		    type: ['male','female'],
		},
		name:{
		    type: 'string',
		    searchable:true,
		},
		salt : {
		    type: 'string',
		}
	}
};

export default {
	getModules(cb){
		setTimeout(() => {
			cb (modules)
		},100);
	}
}
import * as types from '../mutation-type'

const state = {
    primaryKey: 'username',
    columns: [
        {
			name: 'username',
			type: 'string',
			formType: 'text',
			required: true,
			searchable:true,
			primaryKey: true
		},
		{
			name: 'email',
			type: 'string',
			formType: 'email',
			required: true,
			searchable:true,
		},
		{
			name: 'password',
			type: 'string',
			formType: 'password',
			required: true,
            visible: false,
		}
	]
}

export default {
    state
}
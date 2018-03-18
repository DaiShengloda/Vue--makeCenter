import * as types from '../mutation-type'

const state = {
    columns: [
        {
			name: 'id',
			type: 'string',
			formType: 'text',
			required: true,
			searchable:true,
			primaryKey: true
		},
		{
			name: 'name',
			type: 'string',
			formType: 'text',
			required: true,
			searchable:true,
		},
		{
			name: 'description',
		    type: 'text',
		    formType: 'textarea',
		}
	]
}

export default {
    state
}
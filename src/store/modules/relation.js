import * as types from '../mutation-type'

const state = {
    columns: [
		{
			name: 'id',
			type: 'string',
			formType: 'text',
			// required: true,
			// searchable:true,
			visible: false
		},
		{
			name: 'projectName',
		    type: 'text',
		    formType: 'text',
		    required: true,
		    searchable:true,
		},
		{
			name: 'modelId',
		    type: 'text',
		    formType: 'text',
		    required: true,
		    searchable:true,
		},
	]
}

export default {
    state
}
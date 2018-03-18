import * as types from '../mutation-type'

const state = {
    columns: [
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
		},
		{
			name: 'participants',
		    type: 'text',
		    formType: 'textarea',
		},
		{
			name: 'level',
		    type: 'number',
		    formType: 'select',
			items:[
				{name:"1",value:1},
				{name:"2",value:2},
                {name:"3",value:3},
				{name:"4",value:4},
				{name:"5",value:5},
                {name:"6",value:6},
				{name:"7",value:7},
				{name:"8",value:8},
                {name:"9",value:9},
                {name:"10",value:10},
			],
		    searchable:true,
			required: true,
		},
        {
			name: 'status',
		    type: 'string',
		    formType: 'select',
			items:[
				{name:"demo",value:'demo'},
				{name:"deal",value:'deal'},
				{name:"impl",value:'impl'},
                {name:"close",value:'close'}
			],
		    searchable:true,
			required: true,
		},
		{
			name: 'startTime',
		    type: 'date',
		    formType: 'date',
		    required: true,
		    searchable:true,
		},
		{
			name: 'deliveryTime',
		    type: 'date',
		    formType: 'date',
			required: true,
		    searchable:true,
		}
	]
}

export default {
    state
}
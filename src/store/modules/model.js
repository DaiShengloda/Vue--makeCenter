import * as types from '../mutation-type'

const state = {
    columns: [
    	{
			name: 'thumbnail',
			type: 'string',
			required: false,
			searchable:false,
			visible: true,
			"orderable": false,
	        "data": null,
	        "defaultContent": "",
			"createdCell": function (td, cellData, rowData, row, col) {
		      if ( rowData.path ) {
		      	var url = '/';
		      	url += rowData.path+rowData.id+'/icon.png'
		        $(td).html('<img src="'+url+'">');
		      }
		    }
		},
		{
			name: 'id',
			type: 'string',
			formType: 'text',
			required: true,
			searchable:true,
			visible: true,
			className: 'detailLink',
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).html('<a href="javascirpt:void">'+cellData+'</a>');
		    }
		},
		{
			name: 'name',
			type: 'string',
			formType: 'text',
			required: true,
			searchable:true,
			visible: true
		},
		{
			name: 'description',
		    type: 'text',
		    formType: 'textarea',
		    visible: true
		},
		{
			name: 'manufacturer',
		    type: 'string',
		    formType: 'text',
		    searchable:true,
		    visible: true
		},
		{
			name: 'model',
		    type: 'string',
		    formType: 'text',
		    searchable:true,
		    visible: true
		},
		{
			name: 'type',
		    type: 'string',
		    formType: 'text',
			url: '/modelTypes',
		    required: true,
		    searchable:true,
		    visible: true,
			render: function(data, type, row, meta) {
                return typeof(data) == 'string'?data:data.name;
            }
		},
		{
			name: 'industry',
		    type: 'string',
		    formType: 'text',
			url: '/industrys',
			required: true,
		    searchable:true,
		    visible: true,
			render: function(data, type, row, meta) {
                return typeof(data) == 'string'?data:data.name;
            }
		},
		{
			name: 'category',
		    type: 'string',
		    formType: 'text',
			url: '/categorys',
			required: true,
		    searchable:true,
		    visible: true,
			render: function(data, type, row, meta) {
                return typeof(data) == 'string'?data:data.name;
            }
		},
		{
			name: 'path',
		    type: 'string',
		    formType: 'text',
		    visible: false
		},
		{
			name: 'showShadow',
		    type: 'boolean',
		    formType: 'checkbox',
		    // searchable:true,
		    visible: false
		},
		{
			name: 'shadowImage',
		    type: 'boolean',
		    formType: 'select',
			items:[
				{name:"图片",value:true},
				{name:"内置",value:false},
			],
		    // searchable:true,
		    visible: false
		},
		{
			name: 'shadowType',
		    type: 'boolean',
		    formType: 'select',
			items:[
				{name:"矩形",value:0},
				{name:"圆形",value:1},
			],
		    // searchable:true,
		    visible: false
		},
		{
			name: 'status',
		    type: 'number',
		    formType: 'select',
			items:[
				{name:"未上传",value:"0"},
				{name:"已上传",value:"1"},
			],
		    searchable:true,
		    visible: false
		},
		{
			name: 'modelType',
		    type: 'string',
		    formType: 'select',
		    required: true,
			url: 'modelType',
			items:[
				{name:"wrapModel",value:'wrapModel'},
				{name:"objModel",value:'objModel'},
				{name:"rackModel",value:'rackModel'},
				{name:"equipmentModel",value:'equipmentModel'}
			],
		    searchable:true,
		    visible: true
		},
		{
			name: 'width',
		    type: 'number',
		    formType: 'number',
		    visible: false
		},
		{
			name: 'height',
		    type: 'number',
		    formType: 'number',
		    visible: false
		},
		{
			name: 'depth',
		    type: 'number',
		    formType: 'number',
		    visible: false
		},
		{
			name: 'frontData',
		    type: 'text',
		    formType: 'textarea',
		    visible: false
		},
		{
			name: 'backData',
		    type: 'text',
		    formType: 'textarea',
		    visible: false
		},
		{
			name: 'innerWidth',
		    type: 'number',
		    formType: 'number',
		    visible: false
		},
		{
			name: 'doorLucency',
		    type: 'number',
		    formType: 'number',
		    visible: false
		},
		{
			name: 'doorColor',
		    type: 'string',
		    formType: 'color',
		    visible: false
		}
	]
}

export default {
    state
}
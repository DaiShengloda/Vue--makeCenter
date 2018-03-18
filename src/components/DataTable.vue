<template>
<div class="tw-datatable" :class="{'row withFooter':showCheck}" >
	<inline-form :properties="fields" @query="query($event)"></inline-form>
	<table :id="genId" class="table table-striped table-bordered table-hover" width="100%">
		<thead>
			<tr>
				<!-- 用于勾选 -->
				<th v-if="showCheck">
					<input type="checkbox" id='checkAll'>
				</th>
				<!-- 用于显示详情 -->
				<th v-if="showDetail"></th>
				<th v-for="col in cols">
					{{col.name}}
				</th>
			</tr>
		</thead>
		<tbody>
			<!-- <tr v-for="item in items">
				<td v-for="col in cols">
					{{item[col]}}
				</td>
			</tr> -->
		</tbody>
	</table>
</div>
</template>
<script>
import InlineForm from './InlineForm';
import { mapState } from 'vuex'

// require('script-loader!smartadmin-plugins/datatables-bundle/datatables.min.js');
const _ = require('lodash');
import ColumnVisible from './ColumnVisible'
export default {
	name: 'DataTable',
	props: {
		action: {
			type: String,
			// required: true
		},
		module:{
			type: String,
			required: true
		},
		showCheck: {
			type: Boolean,
			default: false
		},
		showDetail: {
			type: Boolean,
			default: false
		},
		serverSide: {
			type: Boolean,
			default: false
		},
	},
	data: function(){
		return {
			items:[],
			selectedItems: {},
			myDt: null,
			offset: 1, 
			limit: 10, 
			order: '',
			lastQueryParams: {},
		}
	},
	computed: {
		genId: function(){
			return 'datatable-'+this.module;
		},
		...mapState({
			cols: function(state){
				return state[this.module].columns;
			}
		}),
		fields: function(){
			if(this.cols){
				return this.cols.filter(col => col.searchable);
			}
			return [];
		},
		tableCols: function(){
			let clone = _.cloneDeep(this.cols);
			clone = clone.map(col => {
				let tCol = {data:col.name,visible:col.visible};
				if(col.createdCell)tCol.createdCell = col.createdCell
				if(col.data!==undefined)tCol.data = col.data;
				if(col.defaultContent!==undefined)tCol.defaultContent = col.defaultContent;
				if(col.orderable!==undefined)tCol.orderable = col.orderable;
				if(col.render)tCol.render = col.render;
				if(col.className)tCol.className = col.className;
				return tCol;
			});
			if(this.showDetail){
				clone.splice(0,0,{
	                "class": "details-control",
	                "orderable": false,
	                "data": null,
	                "defaultContent": ""
	            });
			}
			if(this.showCheck){
				clone.splice(0,0,{
	                "orderable": false,
	                "data": null,
	                "defaultContent": "",
	                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
		                $(nTd).html("<input type='checkbox' name='checkList' value='"+oData.id+"'>");
		 
		            }
	            });
			}
			return clone;
		}
	},
	methods: {
		query: function(params, callback){
			const vm = this;
			let opt = {};
			if(params){
				params.forEach(param => {
					opt[param.name] = param.value;
				});
				vm.lastQueryParams = opt;
			}
			if(vm.serverSide){
				vm.myDt.draw();
			} else {
				vm.search(opt);
			}
			
		},
		search: function(opt, callback){
			const vm = this;
			vm.selectedItems = {};
			vm.$emit('change:selected',Object.values(vm.selectedItems));
			
			if(vm.serverSide){
				opt.offset = vm.offset;
				opt.limit = vm.limit;
				if(vm.order)opt.order = vm.order;

			}
			console.log(opt.limit);
			vm.$http.get("/"+this.module+"s", {params: opt}).then((res)=>{
				// this.items = res.data;
				// vm.$set(this.items, res.data)
				if(callback){
					callback(res.data);
				} else {
					vm.items = res.data;
				}
			});
		},
		refresh: function(){
            this.query();
        },
        format: function ( d ) {
        	let vm = this, result="";
        	vm.cols.forEach(col => {
        		result += col.name+" : " +d[col.name]+"<br>";
        	});
        	return result;
		},
		getCheckedItems: function(){
			let modelIds = [];
			$("input[name='checkList']:checked").each(function (i, o) {
			    modelIds.push($(this).val());
			});
			return modelIds;
		},
		showCols: function(col){
			const vm = this;
			vm.myDt.column(col.index).visible(col.show);
			vm.myDt.columns.adjust().draw(false);
		}
	},
	created(){
		// 获取数据
		
	},
	mounted(){
		// 初始化Datatable, 此watcher放在option中添加在实例化Datatable的时候列还没有渲染到dom中，
		// 但是这里添加不会出现，这个响应稍慢可能没有出现这个问题，但是这是一个潜在的问题，最好的解决方案是
		// 不用vue同步到dom中，而让datatable去做此工作
		let vm = this, orderCols=[];
		let $el = $(this.$el);
		if(vm.showCheck && vm.showDetail){
			orderCols = [[2, 'asc']];
		} else if(vm.showCheck || vm.showDetail){
			orderCols = [[1, 'asc']];
		}
		
		let tableOpt = {
			// dom: 'Blfrtip',
			"dom": "<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 col-xs-12 hidden-xs'f>r>"+
						"t"+
						"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
			columns: _.cloneDeep(vm.tableCols),
			autoWidth : true,
			// responsive: true,
			select: true,
			scrollCollapse: true,
			scrollX: true,
			fixedColumns: true,
			"order": orderCols,
		};
		if(vm.serverSide){
			tableOpt.serverSide = true;
			tableOpt.ajax = function(data, callback, settings) {
				
                if (vm.serverSide) {
					
					let start = parseInt(data.start);
					let len = parseInt(data.length);
                    vm.offset = start/len || 1;
                    vm.limit = len;
                    var orders = data.order;
                    if (orders.length > 0) {
						console.log(orders);
                        var order = orders[0];
                        var col = data.columns[order.column];
                        if (col.data) {
                            vm.order = col.data + ' ' + order.dir;
                        }
                    }
					vm.search(vm.lastQueryParams, function(value){
						
                        //封装返回数据，这里仅演示了修改属性名
                        var returnData = {};
                        returnData.draw = data.draw; //这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = value.total;
                        returnData.recordsFiltered = value.total; //后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = value.list;
                        //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
					});
                }
			}
		}

		let table = $('table',$el).DataTable(tableOpt);
		vm.myDt = table;
		// 选中一行
		table.on( 'select', function ( e, dt, type, indexes ) {
		    if ( type === 'row' ) {
		    	let items = {};
		       	for(let i =0; i<indexes.length;i++){
		       		let index = indexes[i];
		       		var data = table.rows( [index] ).data();
		       		vm.selectedItems[index] = data[0];
		       	}
		       vm.$emit('change:selected',Object.values(vm.selectedItems));
		    }
		});
		// 取消选中一行
		table.on( 'deselect', function ( e, dt, type, indexes ) {
		    if ( type === 'row' ) {
		        // var data = table.rows( indexes ).data().pluck( 'id' );
		 		for(let i =0; i<indexes.length;i++){
		       		let index = indexes[i];
		       		delete vm.selectedItems[index];
		       }
		       vm.$emit('change:selected',Object.values(vm.selectedItems));
		    }
		} );

		//checkbox全选 不起作用
		$("#checkAll").click(function(event) {
			if ($(this).is(':checked')) {
		        $("input[name='checkList']").attr("checked", 'checked');
		    } else {
		        $("input[name='checkList']").removeAttr("checked");
		    }
		});

		// 点击id
		$('#'+vm.genId+' tbody').on( 'click', 'tr td.detailLink', function (e) {
			var tr = $(this).closest('tr');
			var row = dt.row( tr );
			vm.$emit('detailLink', row.data());
	    } );

		/******* detail start *********/
		// Array to track the ids of the details displayed rows
	    let detailRows = [], dt = table;
	    $('#'+vm.genId+' tbody').on( 'click', 'tr td.details-control', function (e) {
	        var tr = $(this).closest('tr');
	        var row = dt.row( tr );
	        var idx = $.inArray( tr.attr('id'), detailRows );
	 
	        if ( row.child.isShown() ) {
	            tr.removeClass( 'details' );
	            row.child.hide();
	 
	            // Remove from the 'open' array
	            detailRows.splice( idx, 1 );
	        }
	        else {
	            tr.addClass( 'details' );
	            row.child( vm.format( row.data() ) ).show();
	 
	            // Add to the 'open' array
	            if ( idx === -1 ) {
	                detailRows.push( tr.attr('id') );
	            }
	        }
	    } );
	    // On each draw, loop over the `detailRows` array and show any child rows
	    table.on( 'draw', function () {
	        $.each( detailRows, function ( i, id ) {
	            $('#'+id+' td.details-control').trigger( 'click' );
	        } );
	    } );
	    /******* detail end *********/

		this.$watch('items',function(newVal, oldVal){
			//这里必须clone一份出来，不然Datatable会修改此对象，又会触发vue的事件
			let clone = _.cloneDeep(newVal);
			let isObject = function(item){
				return Object.prototype.toString.call(item) == '[object Object]';
			}
			clone.map(item => {
				if(isObject(item.category)){
					item.category = item.category.id;	
				}
				if(isObject(item.industry)){
					item.industry = item.industry.id;	
				}
				if(isObject(item.type)){
					item.type = item.type.id;	
				}
			});
			table.clear();
			table.rows.add(clone).draw();
		},{deep:true});


		this.query();
	},
	components: {
		InlineForm,
		ColumnVisible
	}
}
</script>
<style lang="scss">
	.tw-datatable{
		.dropdown-menu{
			min-width: 100px;
			border: none;
			font-size: 14px;
			padding-left: 5px;
			box-shadow: 0 6px 12px rgba(0,0,0,.175);
		}
		.dataTables_wrapper > .dt-buttons{
			margin-bottom: 5px;
		}
		
	}
	.btn-toolbar{
		margin:0px;
		margin-top:5px;
	}
	.table>tbody>tr.selected{
		color: white;
		background-color: #3276b1;//#dff0d8;
		// background-color: #21B24B;
	}
	.table>tbody>tr.selected a{
		color: white;
	}
	.withFooter{
        margin-left: 0px;
        margin-right: 0px;
    }
</style>
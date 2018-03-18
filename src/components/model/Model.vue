<template>
<!-- MAIN CONTENT -->
<div id="content">
  	<div class="row">
		<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
			<h1 class="page-title txt-color-blueDark">
				<i class="fa fa-table fa-fw "></i> 
					Model 
				<span>
					Data Tables
				</span>
			</h1>
		</div>
		<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
			<!-- 模型统计chart, 模型文件上传完成度chart, 根据Category统计，根据行业统计 -->
		</div>
	</div>
	<widget-grid module="model" v-if="showDetail" deleteEvent="detail" 
    	@action="closeWidget($event)">
		<template scope="props" slot="detailWidget">
			<widget module="model" widget-title="Model Detail" 
				icon="fa-newspaper-o" action="detail">
				<model-detail :values="selectedItem"></model-detail>
			</widget>
		</template>
	</widget-grid>
	<widget-grid module="model" v-if="showAdded" deleteEvent="add" 
    	@action="closeWidget($event)">
		<template scope="props" slot="createdWidget">
			<widget module="model" widget-title="Create Model" 
				icon="fa-plus-square" action="add">
				<model-form :properties="columns" :is-updated="false"  @submit="addItem($event)">
				</model-form>
			</widget>
		</template>
	</widget-grid>
    <widget-grid module="model" v-if="showUpdated"  deleteEvent="update" 
    	@action="closeWidget($event)">
		<template scope="props" slot="updatedWidget">
			<widget module="model" widget-title="Update Model" icon="fa-edit"
				action="update">
				<model-form :properties="columns" :is-updated="true" 
					:default="selectedItem" @submit="updateItem($event)">
				</model-form>
			</widget>
		</template>
	</widget-grid>
	<widget-grid module="model" :hideDeleteBtn="true">
		<template scope="props" slot="tableWidget">
			<!-- :widget-index="props.widgetIndex" -->
			<model-table-widget module="model" ref="table" 
				@action="modelAction($event)">
			</model-table-widget>
		</template>
	</widget-grid>
</div>
<!-- END MAIN CONTENT -->
</template>
<script>
	import WidgetGrid from '../WidgetGrid';
	import ModelForm from './ModelForm';
	// import ModelForm from './ModelFormTest';
	import ModelDetail from './ModelDetail';
	import Widget from '../Widget';
	import ModelTableWidget from './ModelTableWidget';
	import { mapState } from 'vuex'
	export default {
		name: 'Model',
		data: function(){
			return {
				showAdded: false,
				showUpdated: false,
				showDetail: false,
				showDetail: false,
				selectedItem: undefined,
			}
		},
		computed: {
			...mapState({
				columns: state => state.model.columns
			}),
		},
		methods: {
			modelAction: function(e){
				if(e.action == 'detail'){
					this.selectedItem = e.item;
					this.showDetail = !this.showDetail;
				} else if(e.action == 'update'){
					this.selectedItem = e.item;
					this.showUpdated = !this.showUpdated;
				} else if(e.action == 'add'){
					this.showAdded = !this.showAdded;
				} else if(e.action == 'select'){
					// this.selectedItem = e.item;
				} else if(e.action == 'detailLink'){
					
				}
			},
			addItem: function(formData){
                let vm = this;
                vm.$http.post('/model', formData).then((response) => {
                    // 添加成功，todo： 1、close 页面， 2、refresh table
                    vm.showAdded = !vm.showAdded;
                    vm.$refs.table.refresh();
                });
            },
            updateItem: function(formData){
                let vm = this;
                vm.$http.post('/model/'+formData.get('id'), formData)
                    .then((response) => {
                        // 添加成功，todo： 1、close 页面， 2、refresh table
                        vm.showUpdated = !vm.showUpdated;
                        vm.$refs.table.refresh();
                    });
            },
            closeWidget: function(params){
            	console.log(params);
            	if(params.closedWidget == 'add'){
            		this.showAdded = false;
            	} else if(params.closedWidget == 'update'){
            		this.showUpdated = false;
            	} else if(params.closedWidget == 'detail'){
            		this.showDetail = false;
            	}
            }
		},
		mounted(){
			
		},
		components: {
			WidgetGrid,
			ModelTableWidget,
			ModelForm,
			ModelDetail,
			Widget
		}
	}
</script>
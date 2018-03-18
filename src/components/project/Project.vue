<template>
<!-- MAIN CONTENT -->
<div id="content">
  <div class="row">
		<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
			<h1 class="page-title txt-color-blueDark">
				<i class="fa fa-table fa-fw "></i> 
					Project 
				<span>
					Data Tables
				</span>
			</h1>
		</div>
		<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
			<!-- 模型统计chart, 模型文件上传完成度chart, 根据Category统计，根据行业统计 -->
		</div>
	</div>
	<widget-grid module="project" v-if="showDetail" deleteEvent="detail" 
    	@action="closeWidget($event)">
		<template scope="props" slot="detailWidget">
			<widget module="project" widget-title="Project Detail" 
				icon="fa-newspaper-o" action="detail">
				<project-detail :values="selectedItem" @action="modelAction($event)"></project-detail>
			</widget>
		</template>
	</widget-grid>
    <widget-grid module="project" v-if="showAdded" deleteEvent="add" 
    	@action="closeWidget($event)">
		<template scope="props" slot="createdWidget">
			<widget module="project" widget-title="Create Project" 
				icon="fa-plus-square"
				action="add">
				<project-form :properties="columns" :is-updated="false"  @submit="addItem($event)">
				</project-form>
			</widget>
		</template>
	</widget-grid>
    <widget-grid module="project" v-if="showUpdated"  deleteEvent="update" 
    	@action="closeWidget($event)">
		<template scope="props" slot="updatedWidget">
			<widget module="project" widget-title="Update Project" icon="fa-edit"
				action="update">
				<project-form :properties="columns" :is-updated="true" 
					:default="selectedItem" @submit="updateItem($event)">
				</project-form>
			</widget>
		</template>
	</widget-grid>
	<widget-grid module="model" deleteEvent="selectModels" 
		v-if="showSelectModels" @action="closeWidget($event)">
		<template scope="props">
			<!-- :widget-index="props.widgetIndex" -->
			<model-table-widget module="model" :showToolbar="false" 
				@save:footer="saveModels($event)">
			</model-table-widget>
		</template>
	</widget-grid>
	<widget-grid module="project" :hideDeleteBtn="true">
		<template scope="props" slot="tableWidget">
			<project-table-widget module="project" ref="table" 
				@action="modelAction($event)">
			</project-table-widget>
		</template>
	</widget-grid>
</div>
<!-- END MAIN CONTENT -->
</template>
<script>
	import WidgetGrid from '../WidgetGrid';
	import ProjectForm from './ProjectForm';
	import ProjectDetail from './ProjectDetail';
	import Widget from '../Widget';
	import ProjectTableWidget from './ProjectTableWidget';
	import ModelTableWidget from '../model/ModelTableWidget';
	import { mapState } from 'vuex'
	export default {
		name: 'Project',
		data: function(){
			return {
				showAdded: false,
				showUpdated: false,
				showDetail: false,
				selecedItem: undefined,
				showSelectModels: false
			}
		},
	 	computed: {
			...mapState({
				columns: state => state.project.columns
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
					this.selectedItem = e.item;
				} else if(e.action == 'showModels'){
					if(e.item){
						this.selectedItem = e.item;
					}
					this.showSelectModels = !this.showSelectModels;
				}
			},
			addItem: function(event){
                let vm = this;
                vm.$http.post('/project', event)
                    .then((response) => {
                        // 添加成功，todo： 1、close 页面， 2、refresh table
                        vm.showAdded = !vm.showAdded;
                        vm.$refs.table.refresh();
                    });
            },
            updateItem: function(event){
                let vm = this;
                let changedValue = {};
                for(let p in event){
                	if(event[p] !== vm.selectedItem[p]){
                		changedValue[p] = event[p];
                	}
				}
                vm.$http.put('/project/'+event.name, changedValue)
                    .then((response) => {
                        // 添加成功，todo： 1、close 页面， 2、refresh table
                        vm.showUpdated = !vm.showUpdated;
                        vm.$refs.table.refresh();
                    });
            },
            closeWidget: function(params){
            	if(params.closedWidget == 'add'){
            		this.showAdded = false;
            	} else if(params.closedWidget == 'update'){
            		this.showUpdated = false;
            	} else if(params.closedWidget == 'selectModels'){
            		this.showSelectModels = false;
            	}  else if(params.closedWidget == 'detail'){
            		this.showDetail = false;
            	}
            },
            saveModels: function(p){
            	console.log(p);
            	let vm = this;
                vm.$http.post('/relations', {}, {
                	params:{project: vm.selectedItem.name,modelIds: p}
                }).then((response) => {
                    vm.showSelectModels = !vm.showSelectModels;
                });
            }
		},
		mounted(){
			
		},
		components: {
			WidgetGrid,
			ProjectTableWidget,
			ModelTableWidget,
			ProjectForm,
			ProjectDetail,
			Widget
		}
	}
</script>
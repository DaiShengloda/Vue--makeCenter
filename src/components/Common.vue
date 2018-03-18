<template>
<!-- MAIN CONTENT -->
<div id="content">
  <div class="row">
		<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
			<h1 class="page-title txt-color-blueDark">
				<i class="fa fa-table fa-fw "></i> 
					{{ moduleText }} 
				<span>
					Data Tables
				</span>
			</h1>
		</div>
		<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
			<!-- 模型统计chart, 模型文件上传完成度chart, 根据Category统计，根据行业统计 -->
		</div>
	</div>
    <widget-grid :module="modulePath" v-if="showAdded" :half="true" deleteEvent="add" @action="closeWidget($event)">
		<template scope="props" slot="createdWidget">
			<widget :module="modulePath" :widget-title="'Create '+modulePath" 
				icon="fa-plus-square" action="add">
				<basic-form :properties="columns" :is-updated="false" @submit="addItem($event)">
				</basic-form>
			</widget>
		</template>
	</widget-grid>
    <widget-grid :module="modulePath" v-if="showUpdated" :half="true" deleteEvent="update" @action="closeWidget($event)">
		<template scope="props" slot="updatedWidget">
			<widget :module="modulePath" :widget-title="'Update '+modulePath" icon="fa-edit"
				action="update">
				<basic-form :properties="columns" :is-updated="true" 
                    :default="selectedItem" @submit="updateItem($event)">
				</basic-form>
			</widget>
		</template>
	</widget-grid>
	<widget-grid :module="modulePath" :hideDeleteBtn="true">
		<template scope="props" slot="tableWidget">
			<common-table-widget :module="modulePath" ref="table" 
				@add:module="addModule()" @update:module="updateModule($event)">
			</common-table-widget>
		</template>
	</widget-grid>
</div>
<!-- END MAIN CONTENT -->
</template>
<script>
    const _ = require('lodash');
	import WidgetGrid from './WidgetGrid';
	import BasicForm from './BasicForm';
	import Widget from './Widget';
	import CommonTableWidget from './CommonTableWidget';
	import { mapState } from 'vuex'
	export default {
		name: 'Common',
        props: {
            module: {
                type: String
            }
        },
		data: function(){
			return {
				showAdded: false,
				showUpdated: false,
				showDetail: false,
                selectedItem: undefined
			}
		},
        computed: {
            modulePath: function(){
                return this.module || this.$route.params.id;
            },
            moduleText: function(){
                return _.capitalize(this.modulePath);
            },
            ...mapState({
                columns(state){
                    let modulePath = this.modulePath;
                    return state[modulePath].columns;
                }
            }),
		},
		methods: {
			addModule: function(){
				this.showAdded = !this.showAdded;
			},
			updateModule: function(event){
                this.selectedItem = event;
				this.showUpdated = !this.showUpdated;
			},
            addItem: function(event){
                let vm = this;
                vm.$http.post('/'+vm.modulePath, event)
                    .then((response) => {
                        // 添加成功，todo： 1、close 页面， 2、refresh table
                        vm.showAdded = !vm.showAdded;
                        vm.$refs.table.refresh();
                    });
            },
            updateItem: function(event){
                let vm = this;
                vm.$http.put('/'+vm.modulePath+'/'+event.id, event)
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
            	}
            }
		},
		components: {
			WidgetGrid,
			CommonTableWidget,
			BasicForm,
			Widget
		}
	}
</script>
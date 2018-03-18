<template>
    <widget :module="module" :widget-index="widgetIndex" action="list"
        :widget-title="moduleText+' List'">
        <div class="btn-toolbar">
            <div class="btn-group">
                <button type="button" class="btn btn-default"
                    title="Create" @click="create()">
                    <i class="fa fa-fw fa-plus"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="Update" @click="update()">
                    <i class="fa fa-fw fa-pencil"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!hasSelected}" 
                    title="Delete" @click="deleteModule()">
                    <i class="fa fa-fw fa-trash"></i>
                </button>
            </div>
        </div>
        <data-table :module="module" ref="table"
            @change:selected="change_selected($event)"></data-table>
    </widget>
</template>
<script>
const _ = require('lodash');
import Widget from './Widget';
import DataTable from './DataTable';
export default {
    name:'CommonTableWidget',
    props: {
        module: {
            type: String,
            required: true
        },
        widgetIndex:{
            type: String,
            // required: true
        }
    },
    data: function(){
        return {
            selectedItems: [],
            selectedOne: false,
            hasSelected: false,
        }
    },
    computed: {
        moduleText: function(){
            return _.capitalize(this.module);
        },
    },
    methods: {
        change_selected: function(event){
            this.selectedItems = event;
            let len = Object.keys(this.selectedItems).length;
            this.selectedOne = (len === 1);
            this.hasSelected = (len > 0);
        },
        create: function(){
            // 增加一个addFormWidget
            this.$emit('add:module');
        },
        update: function(){
            // 增加一个updateFormWidget，只能选中一行
            this.$emit('update:module',this.selectedItems[0]);
        },
        deleteModule: function(){
            // 删除选行数据
            let vm = this;
            let ids = Object.values(this.selectedItems).map((item) => {
                return item.id;
            });
            let url = ids.length>1?'/'+vm.module+'s':'/'+vm.module+'/'+ids[0];
            vm.$http.delete(url, {params:{ids: ids}})
                .then((response) => {
                    // 添加成功，todo： 1、refresh table
                    vm.refresh();
                });
        },
        refresh: function(){
            this.$refs.table.refresh();
        }
    },
    components: {
        Widget,
        DataTable
    },
}
</script>
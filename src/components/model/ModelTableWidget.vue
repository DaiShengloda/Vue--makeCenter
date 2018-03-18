<template>
    <widget :module="module" :widget-index="widgetIndex" action="list"
        widget-title="Model List" :showFooter="!showToolbar" 
        @save:footer="footerAction()">
        <div class="btn-toolbar" v-if="showToolbar">
            <div class="btn-group">
                <button type="button" class="btn btn-default"
                    title="Create" @click="action('add')">
                    <i class="fa fa-fw fa-plus"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="Update" @click="action('update')">
                    <i class="fa fa-fw fa-pencil"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!hasSelected}" 
                    title="Delete" @click="deleteModel()">
                    <i class="fa fa-fw fa-trash"></i>
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!hasSelected}"
                    title="Download" @click="download()">
                    <i class="fa fa-fw fa-cloud-download"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="upload" @click="upload()">
                    <i class="fa fa-fw fa-cloud-upload"></i>
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="Detail" @click="action('detail')">
                    <i class="fa fa-fw fa-newspaper-o"></i>
                </button>
            </div>
            <column-visible :module="module" 
                @visibleCols="visibleCols($event)"></column-visible>
        </div>
        <data-table :module="module" ref="table" :serverSide="true" :showCheck="!showToolbar"
            @change:selected="change_selected($event)"
            @detailLink="detailLink($event)"></data-table>
    </widget>
</template>
<script>
const _ = require('lodash');
import Widget from '../Widget';
import DataTable from '../DataTable';
import Config from '@/assets/js/config';
import ColumnVisible from '../ColumnVisible'
export default {
    name:'ModelTableWidget',
    props: {
        module: {
            type: String,
            required: true
        },
        widgetIndex:{
            type: String,
            // required: true
        },
        showToolbar: {
            type: Boolean,
            default: true
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
    },
    methods: {
        visibleCols: function(cols){
            this.$refs.table.showCols(cols);
        },
        change_selected: function(event){
            this.selectedItems = event;
            let len = Object.keys(this.selectedItems).length;
            this.selectedOne = (len === 1);
            this.hasSelected = (len > 0);
            this.action('select');
        },
        detailLink: function(data){
            const p = {action:'detail',item:data};
            console.log(data);
            this.$emit('action',p);
        },
        action: function(action){
            const p = {action:action,item:this.selectedItems[0]};
            if(action == 'add'){
                delete p.item;
            }
            this.$emit('action',p);
        },
        deleteModel: function(){
            // 删除选行数据
            let vm = this;
            let items = Object.values(this.selectedItems).map((item) => {
                return {id:item.id, path:item.path};
            });
            let url = items.length>1?'/models':'/model/'+items[0].id;
            vm.$http.delete(url, {body:items})
                .then((response) => {
                    // 添加成功，todo： 1、clear selected data; 2、refresh table
                    vm.selectedItems = [];
                    vm.refresh();
                });
        },
        refresh: function(){
            this.$refs.table.refresh();
        },
        upload: function(){
            // 下载选中行的模型
            console.log('upload');
        },
        download: function(){
            // 上传选中行模型，只能选中一行
            console.log('download');
            let vm = this, validated = true, noFileId;
            let items = Object.values(this.selectedItems).map((item) => {
                if(!item.path){
                    validated = false;
                    noFileId = item.id;
                }
                return {id:item.id, path:item.path};
            });
            if(!validated){
                console.log(noFileId+'没有模型文件');
                return;
            }
            let url, params;
            if(items.length>1){
                let ids='', paths ='';
                items.forEach((item) => {
                    ids += item.id+',';
                    paths += item.path+',';
                });
                ids = _.trimEnd(ids, ',');
                paths = _.trimEnd(paths, ',');
                url = '/models/files?ids='+ids+'&paths='+paths;
                // params = {items: items}
                // var jsonStr ="";
                // for(var i=0;i<items.length;i++){
                //     jsonStr +='"'+ i+'id":"'+item.id+'","'+i +'url":"'+item.path+'",';
                // }
            } else {
                url = '/model/files/'+items[0].id+'?path='+items[0].path;
                // params = items[0];
            }
            let pre = Config.urlPrefix;//'http://localhost:8080/';
            window.location.href = pre+url
            // vm.$http.get(url, {params: params})
            //     .then((response) => {
            //         // 添加成功，todo： 1、clear selected data; 2、refresh table
            //         vm.refresh();
            //     });
        },
        footerAction: function(){
            // 获取到选中的table中的items
            let items = this.$refs.table.getCheckedItems();
            this.$emit('save:footer', items);
        }
    },
    components: {
        Widget,
        DataTable,
        ColumnVisible
    },
}
</script>
<style>
    
</style>
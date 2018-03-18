<template>
    <widget :module="module" :widget-index="widgetIndex" action="list"
        widget-title="Project List">
        <div class="btn-toolbar">
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
                    title="Delete" @click="deleteItem()">
                    <i class="fa fa-fw fa-trash"></i>
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="download" @click="download()">
                    <i class="fa fa-fw fa-cloud-download"></i>
                </button>
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="Select Models" @click="action('showModels')">
                    <i class="fa fa-fw fa-window-restore"></i>
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" 
                    :class="{'disabled':!selectedOne}" 
                    title="Detail" @click="action('detail')">
                    <i class="fa fa-fw fa-newspaper-o"></i>
                </button>
            </div>
        </div>
        <data-table :module="module" ref="table"  
            @change:selected="change_selected($event)"></data-table>
    </widget>
</template>
<script>
import Widget from '../Widget';
import DataTable from '../DataTable';
import Config from '@/assets/js/config';
export default {
    name:'ProjectTableWidget',
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
    },
    methods: {
        change_selected: function(event){
            this.selectedItems = event;
            let len = Object.keys(this.selectedItems).length;
            this.selectedOne = (len === 1);
            this.hasSelected = (len > 0);
            this.action('select');
        },
        action: function(action){
            const p = {action:action,item:this.selectedItems[0]};
            if(action == 'add'){
                delete p.item;
            }
            this.$emit('action',p);
        },
        download: function(){
            const vm = this;
            let project = this.selectedItems[0].name;
            vm.$http.get("/relation/models/"+project).then((res)=>{
                if(!res.data || !res.data.length){
                    console.log('无模型');
                    return ;
                }
                let items = res.data.map(item => {
                    return {id:item.id, path:item.path};
                });
                let url = '/models/files?items='+JSON.stringify(items);
                window.location.href = Config.urlPrefix+url
            });
            
        },
        deleteItem: function(){
            // 删除选行数据
            let vm = this;
            let ids = Object.values(this.selectedItems).map((item) => {
                return item.name;
            });
            let url = ids.length>1?'/projects':'/project/'+ids[0];
            vm.$http.delete(url, {params:{ids: ids}})
                .then((response) => {
                    // 添加成功，todo： 1、clear selected data; 2、refresh table
                    vm.selectedItems = [];
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
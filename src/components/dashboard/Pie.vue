<template>
<article class="col-xs-12 col-sm-6 col-md-6 col-lg-6 sortable-grid ui-sortable">
<!-- Widget ID (each widget will need unique ID)-->
<div class="jarviswidget" :id="id" 
    data-widget-colorbutton="false" 
    data-widget-fullscreenbutton="false" 
    data-widget-editbutton="false" 
    data-widget-sortable="false">
    <!-- widget options:
        usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">
        data-widget-colorbutton="false"	
        data-widget-editbutton="false"
        data-widget-togglebutton="false"
        data-widget-deletebutton="false"
        data-widget-fullscreenbutton="false"
        data-widget-custombutton="false"
        data-widget-collapsed="true" 
        data-widget-sortable="false"
    -->
    <header>
        <h2>{{title}} </h2>				
    </header>
    <!-- widget div-->
    <div>
        <!-- widget edit box -->
        <div class="jarviswidget-editbox">
            <!-- This area used as dropdown edit box -->
            <input class="form-control" type="text">	
        </div>
        <!-- end widget edit box -->
        
        <!-- widget content -->
        <div class="widget-body">
            <!-- this is what the user will see -->
            <chart :options="opt" width="400" height="300"></chart>
        </div>
        <!-- end widget content -->
    </div>
    <!-- end widget div -->
</div>
<!-- end widget -->
</article>
</template>
<script>
import Config from '@/assets/js/config';
import Chart from 'vue-echarts/components/ECharts.vue'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip' 
export default {
    name: 'Pie',
    props: {
        property: String,
        id: String,
        title: String,
        url: String,
    },
    data: function(){
        return {
            legendData: [],
            seriesData: [],
        }
    },
    computed: {
        opt: function(){
            const vm = this;
            return {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     x : 'center',
                //     y : 'bottom',
                //     data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                // },
                calculable : true,
                series: [{
                    type:'pie',
                    radius : [30, 110],
                    roseType : 'area',
                    data: vm.seriesData
                }],
                animationDuration: 2000
            }
        }
    },
    created: function(){
        const vm = this;
        vm.$http.get(vm.url+vm.property)
        .then((res) => {
            if(!res){
                return;
            }
            if(vm.property=='level'){
                vm.seriesData = res.data.map(item => {
                    return {name: 'Level '+item[vm.property], value: item.total};
                });
            } else {
                vm.seriesData = res.data.map(item => {
                    return {name: item.name || item[vm.property], value: item.total};
                });
            }
            
        });
    },
    components: {
        Chart
    }
    
}
</script>
<style>
.echarts {
    width:400px !important;
    height:250px !important;
}
</style>
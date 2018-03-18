<template>
    <!-- widget grid -->
	<section id="widget-grid" class="">
		<!-- row -->
		<div class="row">
			<!-- NEW WIDGET START -->
			<article class="col-xs-12 col-sm-12 col-md-12" :class="articleClass">
				<slot></slot>
				<slot name="detailWidget" widget-index="4"></slot>
				<slot name="createdWidget" widget-index="2"></slot>
				<slot name="updatedWidget" widget-index="3"></slot>
				<slot name="tableWidget" widget-index="1"></slot>
			</article>
			<!-- WIDGET END -->
		</div>
		<!-- end row -->
	</section>
	<!-- end widget grid -->
</template>
<script>
	const _ = require('lodash');
    // require('../assets/js/smartwidgets/jarvis.widget.min.js')
    // import 'smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js'
	import WidgetDefaults from '@/assets/js/widget/WidgetDefaults';
	// import Widget from './Widget';
    export default {
		name: 'WidgetGrid',
		props: {
			module: {
				type: String,
				required: false
			},
			half: {
				type: Boolean,
				default: false
			},
			hideDeleteBtn: Boolean,
			deleteEvent: String
		},
		data: function(){
			return {
				widgetCount:5,
			}
		},
		computed: {
			articleClass: function(){
				return this.half?"col-lg-6":"col-lg-12";
			}
		},
		components: {
			// Widget
		},
		mounted:function(){
			let vm = this;
			let cloneDefault = _.cloneDeep(WidgetDefaults);
			cloneDefault.deleteButton = !this.hideDeleteBtn;
			if(this.deleteEvent){
				cloneDefault.onDelete = function(){
					vm.$emit('action', {closedWidget: vm.deleteEvent});
				}
			}
			// _.defaultsDeep(cloneDefault, this.setting);
			$(this.$el).jarvisWidgets(cloneDefault);
		},
		updated(){
			// let vm = this;
			// let dv = _.defaultsDeep({grid:'div'}, WidgetDefaults);
			// $(vm.$el).jarvisWidgets(WidgetDefaults);
			
		}
	}
</script>
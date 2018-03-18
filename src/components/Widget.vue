<template>
	<!-- Widget ID (each widget will need unique ID)-->
	<div class="jarviswidget jarviswidget-color-darken" :id="genId">
		<header>
			<span class="widget-icon"> <i class="fa" :class="icon"></i> </span>
			<h2>{{widgetTitle}}</h2>
		</header>
		<!-- widget div-->
		<div>
			<!-- widget edit box -->
			<div class="jarviswidget-editbox">
				<!-- This area used as dropdown edit box -->
			</div>
			<!-- end widget edit box -->

			<!-- widget content -->
			<div class="widget-body no-padding">
				<slot></slot>
				<div class="widget-footer" v-if="showFooter">
					<button class="btn btn-sm btn-primary" type="button" 
						@click="save()">
						Save
					</button>		
					<!-- <button class="btn btn-sm btn-danger disabled pull-left" type="button">
						Delete
					</button> -->	
				</div>
			</div>
			<!-- end widget content -->
		</div>
		<!-- end widget div -->
	</div>
	<!-- end widget -->
</template>
<script>
	import DataTable from './DataTable';
	export default {
		name: 'Widget',
		props: {
			module: {
				type: String,
				required: true
			},
			action: {
				type: String,
				// required: true
			},
			widgetIndex:{
				type: String,
				// required: true
			},
			icon: {
				type: String,
				default: 'fa-table'
			},
			widgetTitle: {
				type: String,
				default: 'Data List'
			},
			showFooter: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			genId: function(){
				return "wid-"+this.module+"-"+this.action;
			}
		},
		data: function(){
			return {
				
			}
		},
		methods: {
			save: function(){
				this.$emit('save:footer');
			}
		},
		components: {
			DataTable
		},
	}
</script>
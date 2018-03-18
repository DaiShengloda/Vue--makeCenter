<template>
<!-- MAIN CONTENT -->
<div id="content">
  <div class="row">
		<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
			<h1 class="page-title txt-color-blueDark">
				<i class="fa fa-table fa-fw "></i> 
					Table 
				<span>
					Data Tables
				</span>
			</h1>
		</div>
		<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
			<!-- 模型统计chart, 模型文件上传完成度chart, 根据Category统计，根据行业统计 -->
		</div>
	</div>

	<widget-grid module="model"></widget-grid>
</div>
<!-- END MAIN CONTENT -->
</template>
<script>
	import WidgetGrid from './WidgetGrid';
	import { mapState } from 'vuex'
	export default {
		name: 'Model',
		computed: mapState({
			columns: state => state.model.columns
		}),
		components: {
			WidgetGrid
		}
	}
</script>
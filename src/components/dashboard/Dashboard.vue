<template>
<!-- MAIN CONTENT -->
<div id="content">
  <div class="row">
		<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
			<h1 class="page-title txt-color-blueDark">
				<i class="fa fa-bar-chart"></i> 
					Dashboard
			</h1>
		</div>
		<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
			<!-- 模型统计chart, 模型文件上传完成度chart, 根据Category统计，根据行业统计 -->
		</div>
	</div>
	<widget-grid>
		<template>
			<pie id="projectStatus" title="Project Status"
				property="status" url="/project/report/"></pie>
			<pie id="projectLevel" title="Project Level"
				property="level" url="/project/report/"></pie>
			<pie id="modelStatus" title="Model Status"
				property="status" url="/model/report/"></pie>
			<pie id="modelModelType" title="Model ModelType"
				property="modelType" url="/model/report/"></pie>
			<pie id="modelIndustry" title="Model Industry"
				property="industry" url="/model/report/"></pie>
			<pie id="modelCategory" title="Model Category"
				property="category" url="/model/report/"></pie>
			<pie id="modelType" title="Model Type"
				property="type" url="/model/report/"></pie>
			<pie id="modelManufacturer" title="Model Manufacturer"
				property="manufacturer" url="/model/report/"></pie>
		</template>
	</widget-grid>
</div>
</template>
<script>
const _ = require('lodash');
import WidgetGrid from '../WidgetGrid';
import Pie from './Pie';
export default {
    name:'Dashboard',
    components: {
        WidgetGrid,
		Pie
    }
}
</script>
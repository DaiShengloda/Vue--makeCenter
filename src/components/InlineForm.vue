<template>
<form>
	<div class="form-group" v-for="field in fields">
		<template v-if="field.formType === 'checkbox'">
			<label></label>
		</template>
		<template v-else>
			<label :for="field.name">{{field.name}}</label>
		</template>
		<!--
		<template v-if="inputType.includes(field.formType)">
			<input :type="field.formType" class="form-control" :id="field.name" v-model="field.value">
		</template>
		-->
		<template v-if="field.formType == 'text'">
			<input type="text" class="form-control" :id="field.name" v-model="field.value">
		</template>
		<template v-if="field.formType == 'password'">
			<input type="password" class="form-control" :id="field.name" v-model="field.value">
		</template>
		<template v-if="field.formType == 'number'">
			<input type="number" class="form-control" :id="field.name" v-model.number="field.value">
		</template>
		<template v-if="field.formType == 'email'">
			<input type="email" class="form-control" :id="field.name" v-model="field.value">
		</template>
		<template v-if="field.formType == 'url'">
			<input type="url" class="form-control" :id="field.name" v-model="field.value">
		</template>
    	<template v-else-if="field.formType === 'select'">
			<select id="field.name" class="selectpicker show-tick form-control" data-live-search="true"  v-model="field.value">
			  	<option 
			  		v-for="item in field.items" 
			  		:value="item.value">
			  			{{item.name}}
			  	</option>
			</select>
		</template>
		<template v-else-if="field.formType === 'date'">
			<div class="dataPickerPane">
			<fieldset>
              <div class="control-group">
                <div class="controls">
                  <div class="col-md-11 form-group">
                    <input type="text" class="form-control has-feedback-left mydatePicker" :id="field.name+'-start'" v-model="field.start">
                    <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                    <span class="sr-only">(success)</span>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <div class="control-group">
                <div class="controls">
                  <div class="col-md-11 form-group has-feedback">
                    <input type="text" class="form-control has-feedback-left mydatePicker" :id="field.name+'-end'" v-model="field.end">
                    <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                    <span class="sr-only">(success)</span>
                  </div>
                </div>
              </div>
            </fieldset>
            </div>
		</template>
		<template v-else-if="field.formType === 'color'">
			<div class="input-group myColorPicker">
			  	<input type="text" class="form-control" :id="field.name" v-model="field.value"/>
			  	<span class="input-group-addon"><i></i></span>
			</div>
		</template>
		<template v-else-if="field.formType === 'picker'">
			<!-- <div :id="field.name" class="tw-picker form-control" data-type="picker"></div> -->
			<input type="text" class="form-control" :id="field.name" v-model="field.value">
		</template>
		<template v-else-if="field.formType === 'checkbox'">
			<div class="checkbox">
				<label>
					<input type="checkbox" :id="field.name" :v-model="field.value">
					{{field.name}}
				</label>
			</div>
		</template>
	</div>
	<div class="form-group">
		<label></label>
		<div class="input-group">
			<button type="button" class="btn btn-default" @click="query()">Query</button>
		</div>
	</div>
</form>
</template>
<script>
	require('icheck');
	require('bootstrap-colorpicker');
	require('bootstrap-daterangepicker');
	require('bootstrap-select');
	export default {
		name: 'InlineForm',
		props: {
			properties: {
				type: Array,
      			required: true
			}
		},
		data: function(){
			return {
				inputType: ['text','password','email','number','url'],
			}
		},
		computed: {
			fields: function(){
				let clone = _.cloneDeep(this.properties);
				return clone.map((item,i) => {
					// if(item.type == 'date'){
					// 	item.start = undefined;
					// 	item.end = undefined;
					// } else {
					// 	item.value = undefined;
					// }
					if(item.formType == 'select'){
						item.items.splice(0, 0, {name:"All",value:""});
					}
					return item;
				});
			}
		},
		methods: {
			query: function(){
				// 获取所有字段值
				var result = {};
				this.fields.forEach((x,i) => {
					if(x.type == 'date'){
						let val = {};
						val.start = $('#'+x.name+'-start').val();
						val.end = $('#'+x.name+'-end').val();
						 x.value = val;
					} else if(x.type == 'checkbox'){
						x.value = $('#'+x.name).is(':checked');
					}
				});
				this.$emit('query', this.fields);
			}
		},
		mounted(){
			var $el = this.$el;
			$('input[type="checkbox"]',$el).iCheck({
				checkboxClass: 'icheckbox_square-green'
			});
			$('.myColorPicker',$el).colorpicker();
			// daterangepicker用2.1.24如果到2.1.25就没有singleClasses属性了
			$('.mydatePicker',$el).daterangepicker({
				// startDate: moment(),
				// endDate: moment(),
	          	singleDatePicker: true,
	          	singleClasses: "picker_4",
				locale: {
					format: 'YYYY-MM-DD',  
				}
	        }, function(start, end, label) {
	          	console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	        });
	        $('.selectpicker',$el).selectpicker('refresh');
	        // $('.tw-picker',$el).bootstrapPicker(opt);
		}

	}
</script>
<style lang = "scss" scoped>
	form {
		margin-left: 5px;
		margin-bottom: 5px;
		label {
			margin-bottom: 0;
			margin-left: 5px;
		}
		.checkbox{
			margin-bottom: 5px;
		}
	}
	.form-group{
		float: left;
		margin: {
			right: 5px;
			bottom: 5px;
		}
	}
	.form-control{
		width: 200px;
	}
	.input-group-addon{
		width: 0;
	}
	div {
		fieldset {
			float: left;
		}
	}
	.dataPickerPane {
		.col-md-11{
			margin-left: -10px;
			margin-right: -5px;
		}
	}
</style>
<style>
	.form-control-feedback {
		margin-top: 5px;
		height: 23px;
		color: #bbb;
		line-height: 24px;
		font-size: 15px;
	}

	.form-control-feedback.left {
		border-right: 1px solid #ccc;
		left: 13px;
	}

	.form-control-feedback.right {
		border-left: 1px solid #ccc;
		right: 13px;
	}

	.form-control.has-feedback-left {
		padding-left: 45px;
	}

	.form-control.has-feedback-right {
		padding-right: 45px;
	}
	.daterangepicker {
		padding: 0;
		color:#73879C;
		font-size: 12px;
	}
	.daterangepicker .ranges li {
		color: #73879C;
	}

	.daterangepicker .ranges li.active,
	.daterangepicker .ranges li:hover {
		background: #536A7F;
		border: 1px solid #536A7F;
		color: #fff;
	}

	.daterangepicker .input-mini {
		background-color: #eee;
		border: 1px solid #ccc;
		box-shadow: none !important;
	}

	.daterangepicker .input-mini.active {
		border: 1px solid #ccc;
	}

	.daterangepicker select.monthselect,
	.daterangepicker select.yearselect {
		font-size: 12px;
		padding: 1px;
		height: auto;
		margin: 0;
		cursor: default;
		height: 30px;
		border: 1px solid #ADB2B5;
		line-height: 30px;
		border-radius: 0px !important;
	}

	.daterangepicker select.monthselect {
		margin-right: 2%;
	}

	.daterangepicker td.in-range {
		background: #E4E7EA;
		color: #73879C;
	}

	.daterangepicker td.active,
	.daterangepicker td.active:hover {
		background-color: #536A7F;
		color: #fff;
	}

	.daterangepicker th.available:hover {
		background: #eee;
		color: #34495E;
	}

	.daterangepicker:before,
	.daterangepicker:after {
		content: none;
	}

	.daterangepicker .calendar.single {
		margin: 0 0 4px 0;
	}

	.daterangepicker .calendar.single .calendar-table {
		width: 224px;
		padding: 0 0 4px 0 !important;
	}

	.daterangepicker .calendar.single .calendar-table thead tr:first-child th {
		padding: 8px 5px;
	}

	.daterangepicker .calendar.single .calendar-table thead th {
		border-radius: 0;
	}

	.daterangepicker.picker_1 {
		color: #fff;
		background: #34495E;
	}

	.daterangepicker.picker_1 .calendar-table {
		background: #34495E;
	}

	.daterangepicker.picker_1 .calendar-table thead tr {
		background: #213345;
	}

	.daterangepicker.picker_1 .calendar-table thead tr:first-child {
		background: #1ABB9C;
	}

	.daterangepicker.picker_1 .calendar-table td.off {
		background: #34495E;
		color: #999;
	}

	.daterangepicker.picker_1 .calendar-table td.available:hover {
		color: #34495E;
	}

	.daterangepicker.picker_2 .calendar-table thead tr {
		color: #1ABB9C;
	}

	.daterangepicker.picker_2 .calendar-table thead tr:first-child {
		color: #73879C;
	}

	.daterangepicker.picker_3 .calendar-table thead tr:first-child {
		color: #fff;
		background: #1ABB9C;
	}

	.daterangepicker.picker_4 .calendar-table thead tr:first-child {
		color: #fff;
		background: #34495E;
	}

	.daterangepicker.picker_4 .calendar-table td,
	.daterangepicker.picker_4 .calendar-table td.off {
		background: #ECF0F1;
		border: 1px solid #fff;
		border-radius: 0;
	}

	.daterangepicker.picker_4 .calendar-table td.active {
		background: #34495E;
	}

	.calendar-exibit .show-calendar {
		float: none;
		display: block;
		position: relative;
		background-color: #fff;
		border: 1px solid #ccc;
		margin-bottom: 20px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		overflow: hidden;
	}

	.calendar-exibit .show-calendar .calendar {
		margin: 0 0 4px 0;
	}

	.calendar-exibit .show-calendar.picker_1 {
		background: #34495E;
	}

	.calendar-exibit .calendar-table {
		padding: 0 0 4px 0;
	}
</style>
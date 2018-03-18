<template>
<form class="smart-form">
<fieldset>
	<section v-for="field in fields">
		<template v-if="field.formType === 'checkbox'">
			<label class="label">&nbsp;</label>
		</template>
		<template v-else>
			<label class="label" :for="field.name">{{field.name}}</label>
		</template>
		<template v-if="field.formType == 'text'">
			<label class="input" 
                :class="{'state-success':field.required && validator[field.name].success,
					'state-error':field.required && validator[field.name].error,
					'state-disabled':(field.primaryKey && isUpdated)}">
                <input type="text" class="form-control" :id="field.name" 
                    v-model="values[field.name]" :disabled="(field.primaryKey && isUpdated)">
            </label>
            <div class="note" v-show="validated" v-if="field.required" 
                :class="{'note-success':validator[field.name].success,'note-error':validator[field.name].error}">
                This is a required field.
            </div>
		</template>
		<template v-if="field.formType == 'password'">
			<label class="input" 
                :class="{'state-success':field.required && validator[field.name].success,
					'state-error':field.required && validator[field.name].error,
					'state-disabled':field.primaryKey && isUpdated}">
                <input type="password" class="form-control" :id="field.name" 
                    v-model="values[field.name]" :disabled="isUpdated">
            </label>
            <div class="note" v-show="validated" v-if="field.required" 
                :class="{'note-success':validator[field.name].success,'note-error':validator[field.name].error}">
                This is a required field.
            </div>
		</template>
		<template v-if="field.formType == 'number'">
			<label class="input" 
                :class="{'state-success':field.required && validator[field.name].success,
					'state-error':field.required && validator[field.name].error,
					'state-disabled':field.primaryKey && isUpdated}">
                <input type="number" class="form-control" :id="field.name" 
                    v-model="values[field.name]" :disabled="isUpdated">
            </label>
            <div class="note" v-show="validated" v-if="field.required" 
                :class="{'note-success':validator[field.name].success,'note-error':validator[field.name].error}">
                This is a required field.
            </div>
		</template>
		<template v-if="field.formType == 'email'">
			<label class="input" 
                :class="{'state-success':field.required && validator[field.name].success,
					'state-error':field.required && validator[field.name].error,
					'state-disabled':field.primaryKey && isUpdated}">
                <input type="email" class="form-control" :id="field.name" 
                    v-model="values[field.name]" :disabled="isUpdated">
            </label>
            <div class="note" v-show="validated" v-if="field.required" 
                :class="{'note-success':validator[field.name].success,'note-error':validator[field.name].error}">
                This is a required field.
            </div>
		</template>
		<template v-if="field.formType == 'url'">
			<label class="input" 
                :class="{'state-success':field.required && validator[field.name].success,
					'state-error':field.required && validator[field.name].error,
					'state-disabled':field.primaryKey && isUpdated}">
                <input type="url" class="form-control" :id="field.name" 
                    v-model="values[field.name]" :disabled="isUpdated">
            </label>
            <div class="note" v-show="validated" v-if="field.required" 
                :class="{'note-success':validator[field.name].success,'note-error':validator[field.name].error}">
                This is a required field.
            </div>
		</template>
		<template v-if="field.formType == 'textarea'">
			<label class="textarea textarea-resizable">
                <textarea rows="3" class="custom-scroll" :id="field.name"  v-model="values[field.name]"></textarea>
			</label>
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
				<div class="form-group mydatePicker">
					<input type="text" 
						class="form-control has-feedback-left mydatePicker" 
						:id="field.name" 
						v-model="field.value">
					<span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
					<span class="sr-only">(success)</span>
				</div>
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
	</section>
	
</fieldset>
	<footer class="col-sm-12 col-md-12 col-lg-12 widget-form-footer">
		<button type="button" class="btn btn-primary" @click="submit()">
			Submit
		</button>
		<button type="button" class="btn btn-default" @click="reset()">
			Reset
		</button>
	</footer>
</form>
</template>
<script>
	const _ = require('lodash');
	require('icheck');
	require('bootstrap-colorpicker');
	require('bootstrap-daterangepicker');
	require('bootstrap-select');
	export default {
		name: 'BasicForm',
		props: {
			properties: {
				type: Array,
      			required: true
			},
			isUpdated: {
				type: Boolean,
				default: false
			},
			default: {
				type: Object
			}
		},
		data: function(){
			return {
				validated: false,
			}
		},
		computed: {
			fields: function(){
				return this.properties;
			},
			validator: function(){
				let obj = {};
				this.properties.forEach(function(item){
					if(item.required){
						obj[item.name] = {success:false,error:false};
					}
				});
				return obj;
			},
			validatedFileds: function(){
				let cols = [];
				this.properties.forEach(item => {
					if(item.required){
						cols.push(item.name);
					}
				});
				return cols;
			},
			values: function(){
				return this.resetVal();
			}
		},
		methods: {
			resetVal: function(){
				let vals = {};
				this.properties.forEach(function(item){
					vals[item.name] = item.value;
				});
				var cloneDefault = _.cloneDeep(this.default || {});
				return _.defaultsDeep(cloneDefault, vals);
			},
			submit: function(){
				// 获取所有字段值
				this.fields.forEach((x,i) => {
					if(x.type == 'date'){
						x.value = $('#'+x.name).val();
					} else if(x.type == 'checkbox'){
						x.value = $('#'+x.name).is(':checked');
					}
				});
				let validated = true;
				this.validatedFileds.forEach(prop => {
					if(this.values[prop]){
						this.validator[prop].success = true;
					} else {
						this.validator[prop].error = true;
						validated = false;
					}
				});
				this.validated = true
				if(!validated)return;
				this.$emit('submit', this.values);
			},
			reset: function(){
				let vals = this.resetVal();
				for(let p in vals){
					this.$set(this.values,p,vals[p]);
				}
				console.log(this.values.name);
				for(let prop in this.validator){
					this.validator[prop].success = false;
					this.validator[prop].error = false;
				}
				this.validated = false;
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
	.dataPickerPane {
		span{
			left: 5px;
		}
		input{
			padding-left:45px;
		}
	}
</style>
<style scoped>
    #startTime, #deliveryTime{
        padding-left:50px;
    }
    .form-control-feedback{
        left:0px;
    }
    .widget-form-footer {
		padding-left: 0px;
		padding-right: 0px;
	}
	.input-group-addon:first-child{
		border-right: 1px solid #ccc;
	}
	.widget-form-footer :first-child{
		margin-right: 15px;
	}
</style>
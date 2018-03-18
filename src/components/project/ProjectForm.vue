<template>
<form class="smart-form">
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
        <section>
			<label class="label">Name *</label>
            <label class="input" 
                :class="{'state-success':validator.name.success,'state-error':validator.name.error,'state-disabled':isUpdated}">
                <input type="text" class="form-control" id="name" 
                    v-model="values.name" :disabled="isUpdated">
            </label>
            <div class="note" v-show="validated" 
                :class="{'note-success':validator.name.success,'note-error':validator.name.error}">
                This is a required field.
            </div>
		</section>
        <section>
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-5">
					<label class="label">Level</label>
                    <label class="input"
                        :class="{'state-success':validator.level.success,'state-error':validator.level.error}">
                        <select id="modelType" 
                            class="selectpicker show-tick form-control" 
                            data-live-search="true" v-model="values.level">
                            <option v-for="item in fields['level'].items" 
                                :value="item.value">
                                    {{item.name}}
                            </option>
                        </select>
                    </label>
                    <div class="note" v-show="validated" 
                        :class="{'note-success':validator.level.success,'note-error':validator.level.error}">
                        This is a required field.
                    </div>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-5">
					<label class="label">status</label>
                    <label class="input"
                        :class="{'state-success':validator.status.success,'state-error':validator.status.error}">
                        <select id="modelType" 
                            class="selectpicker show-tick form-control" 
                            data-live-search="true" v-model="values.status">
                            <option v-for="item in fields['status'].items" 
                                :value="item.value">
                                    {{item.name}}
                            </option>
                        </select>
                    </label>
                    <div class="note" v-show="validated" 
                        :class="{'note-success':validator.status.success,'note-error':validator.status.error}">
                        This is a required field.
                    </div>
				</div>
			</div>
		</section>
        <section>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-5">
                    <label class="label">Start Date</label>
                    <label class="input"
                        :class="{'state-success':validator.startTime.success,'state-error':validator.startTime.error}">
                        <input type="text" 
                            class="form-control has-feedback-left mydatePicker" 
                            id="startTime" v-model="values.startTime">
                        <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                    </label>
                    <div class="note" v-show="validated" 
                        :class="{'note-success':validator.startTime.success,'note-error':validator.startTime.error}">
                        This is a required field.
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5">
                    <label class="label">Delivery Date</label>
                    <label class="input"
                        :class="{'state-success':validator.deliveryTime.success,'state-error':validator.deliveryTime.error}">
                        <input type="text" 
                            class="form-control has-feedback-left mydatePicker" 
                            id="deliveryTime" v-model="values.deliveryTime">
                        <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                    </label>
                    <div class="note" v-show="validated" 
                        :class="{'note-success':validator.deliveryTime.success,'note-error':validator.deliveryTime.error}">
                        This is a required field.
                    </div>
                </div>
            </div>
		</section>
	</fieldset>
	<fieldset class="col-sm-6 col-md-6 col-lg-6">
        <section>
			<label class="label">Description</label>
			<label class="textarea textarea-resizable">
                <textarea rows="4" class="custom-scroll" v-model="values.description"></textarea>
			</label>
		</section>
		<section>
			<label class="label">Participants</label>
			<label class="textarea textarea-resizable">
                <textarea rows="4" class="custom-scroll" v-model="values.participants"></textarea>
			</label>
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
	require('bootstrap-colorpicker');
	require('bootstrap-daterangepicker');
	require('bootstrap-select');
	export default {
		name: 'ModelForm',
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
				projectValues: {
					name:'',
					description:'',
					participants:'',
					level:1,
					status:'demo',
					startTime:'',
					deliveryTime:'',
				},
				validator: {
					name: {
						success: false,
						error: false
					},
					level: {
						success: false,
						error: false
					},
					status: {
						success: false,
						error: false
					},
					startTime: {
						success: false,
						error: false
					},
					deliveryTime: {
						success: false,
						error: false
					}
				},
				validated: false,
			}
		},
		computed: {
			fields: function(){
				let cols = {};
				this.properties.forEach(item => {
					cols[item.name] = item;
				});
				return cols;
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
				var cloneDefault = _.cloneDeep(this.default || {});
				return _.defaultsDeep(cloneDefault, this.projectValues);
			},
			submit: function(){
				// 获取所有字段值
                this.values.startTime = $('#startTime').val();
				this.values.deliveryTime = $('#deliveryTime').val();
				
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

				for(let prop in this.validator){
					this.validator[prop].success = false;
					this.validator[prop].error = false;
				}
				this.validated = false;
			}
		},
		mounted(){
			var $el = this.$el;
	        $('.selectpicker',$el).selectpicker('refresh');
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
		},
		updated(){
		}

	}
</script>
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
<template>
<form class="smart-form">
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">ID *</label>
			<label class="input">
				<input type="text" class="form-control" id="id" 
					v-model="values.id" :disabled="isUpdated">
			</label>
		</section>
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Name *</label>
					<label class="input" >
						<input type="text" class="form-control" id="name" 
							v-model="values.name">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Manufacturer</label>
					<label class="input">
						<input type="text" class="form-control" id="manufacturer" 
							v-model="values.manufacturer">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Model</label>
					<label class="input">
						<input type="text" class="form-control" id="model" 
							v-model="values.model">
					</label>
				</div>
			</div>
		</section>
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Type *</label>
					<label class="input">
						<!-- <input type="text" class="form-control" id="type" 
							v-model="values.type"> -->
						<select id="type"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="values.type">
							<option v-for="item in typeData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Industry *</label>
					<label class="input">
							<!-- <input type="text" class="form-control" id="industry" 
								v-model="values.industry"> -->
						<select id="industry"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="values.industry">
							<option v-for="item in industryData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Category *</label>
					<label class="input">
						<!-- <input type="text" class="form-control" id="category"	v-model="values.cateory">g -->
						<select id="category"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="values.category">
							<option v-for="item in categoryData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
				</div>
			</div>
		</section>
		<section>
			<label class="label">Description</label>
			<label class="textarea textarea-resizable">
				<textarea class="custom-scroll" rows="6" id="description" 
					v-model="values.description">
				</textarea>
			</label>
		</section>
		<section v-if="isUpdated || showThumbnail">
			<label class="label">Thumbnail</label>
			<label class="input">
			<!--  class="form-control" -->
				<img :src="values.thumbnail" />
			</label>
		</section>
	</fieldset>
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">Model Type</label>
			<label class="input">
				<select id="modelType" @change="modelTypeChanged()" 
					class="selectpicker show-tick form-control" 
					data-live-search="true" v-model="values.modelType">
				  	<option v-for="item in fields['modelType'].items" 
				  		:value="item.value">
				  			{{item.name}}
				  	</option>
				</select>
			</label>
		</section>
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Width</label>
					<label class="input" :class="{'state-disabled':isDisable}">
						<input type="number" class="form-control" id="width" 
							v-model="values.width" 
							:disabled="isDisable">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Height</label>
					<label class="input" :class="{'state-disabled':isDisable}">
						<input type="number" class="form-control" id="height" 
							v-model="values.height" 
							:disabled="isDisable">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Depth</label>
					<label class="input" :class="{'state-disabled':isDisable}">
						<input type="number" class="form-control" id="depth" 
							v-model="values.depth" 
							:disabled="isDisable">
					</label>
				</div>
			</div>
		</section>
		<!-- showShadow,shadowImage,shadowType -->
		<section v-if="values.modelType=='objModel'">
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">&nbsp;</label>
					<label class="checkbox">
						<input type="checkbox" id="showShadow" name="showShadow" 
							v-model="showShadow">
						<i></i>Show Shadow
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">&nbsp;</label>
					<label class="checkbox">
						<input type="checkbox" id="shadowImage" name="showShadow" 
							v-model="values.shadowImage">
						<i></i>Shadow Image
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">&nbsp;</label>
					<label class="checkbox">
						<input type="checkbox" id="shadowType" name="shadowType" 
							v-model="values.shadowType">
						<i></i>Shadow Type
					</label>
				</div>
			</div>
		</section>
		<!-- innerWidth,doorLucency,doorColor -->
		<section v-else-if="values.modelType=='rackModel'">
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Inner Width</label>
					<label class="input">
						<input type="number" class="form-control" id="innerWidth"	
							v-model="values.innerWidth">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">&nbsp;</label>
					<label class="checkbox">
						<input type="checkbox" id="doorLucency" name="doorLucency" 
							v-model="values.doorLucency">
						<i></i>Door Lucency
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Door Color</label>
					<label class="input myColorPicker">
						<div class="col-sm-8 col-md-8 col-lg-10">
				  	<input type="text" id="doorColor" class="form-control" 
				  		v-model="values.doorColor"/>
				  	</div>
				  	<div class="col-sm-4 col-md-4 col-lg-2">
				  		<span class="input-group-addon"><i></i></span>
				  	</div>
					</label>
				</div>
			</div>
		</section>
		<!-- frontData,backData -->
		<section v-else-if="values.modelType=='equipmentModel'" 
			class="equipmentModel">
			<div class="row">
				<div class="col-sm-8 col-md-8 col-lg-5">
						<label class="label">Front Data</label>
						<label class="textarea textarea-resizable">
							<textarea class="custom-scroll" rows="6" id="frontData" 
								v-model="values.frontData">
							</textarea>
						</label>
					</div>
					<div class="col-sm-8 col-md-8 col-lg-5">
						<label class="label">Back Data</label>
						<label class="textarea textarea-resizable">
							<textarea class="custom-scroll" rows="6" id="backData" 
								v-model="values.backData">
							</textarea>
						</label>
					</div>
			</div>
		</section>
		
	</fieldset>
</form>
</template>
<script>
	const _ = require('lodash');
	require('bootstrap-colorpicker');
	require('bootstrap-daterangepicker');
	require('bootstrap-select');
	import NetworkThree from './NetworkThree';
	import Config from '@/assets/js/config';
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
				modelType:'wrapModel',
				showShadow:true,
				modelValues: {
					// id:'',
					// name:'',
					// description:'',
					// manufacturer:'',
					// model:'',
					type:'',
					// industry:'',
					// category:'',
					modelType:'wrapModel',//六面贴图，obj,机柜，设备
					// thumbnail:'',
					// file:'',
					width: 60,
					height: 180,
					depth: 80,
					// showShadow: false,
					// shadowImage: false,
					// shadowType: 0,
					innerWidth: 45.5,
					// doorLucency: false,
					doorColor: '#ffffff',
					// frontData: '',
					// backData: ''
				},
				selectedFileNames: '',
				files: undefined,
				preview: false,
				showThumbnail: false,
				typeData: [],
				industryData: [],
				categoryData: []
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
			isDisable: function(){
				return this.values.modelType ==='objModel';
			},
			values: function(){
				return this.resetVal();
			},
		},
		methods: {
			resetVal: function(){
				return this.default || this.modelValues;
			},
			modelTypeChanged: function(){
				
			},
		},
		components: {
			NetworkThree
		},
		created(){
			const vm = this;
			vm.$http.get(vm.fields.type.url).then((res) => {
				if(!res){
					return;
				}
				vm.typeData = res.data;
			});
			vm.$http.get(vm.fields.industry.url).then((res) => {
				if(!res){
					return;
				}
				vm.industryData = res.data;
			});
			vm.$http.get(vm.fields.category.url).then((res) => {
				if(!res){
					return;
				}
				vm.categoryData = res.data;
			});
		},
		mounted(){
			var $el = this.$el;
		   	// $('.selectpicker',$el).selectpicker('refresh');
		},
		updated(){
			if(this.values.modelType === 'rackModel'){
				$('.myColorPicker',this.$el).colorpicker();
			}
			$('.selectpicker',this.$el).selectpicker('refresh');
		},
		watch: {
			modelType: function(val, oldVal){
				this.$set(this.values,'modelType',val);
			},
			showShadow: function(val, oldVal){
				console.log('oldVal ', oldVal);
				console.log('new ', val);
			},

		}
	}
		
</script>
<style lang = "scss" scoped>
	.equipmentModel{
		margin-bottom: 15px;
	}
	.myColorPicker {
		div{
			padding: 0;
		}
		.input-group-addon{
			padding: 7px;
		}
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
	.browse{
		right:80px !important;
	}
</style>
<template>
<form class="smart-form">
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">ID</label>
			<label class="input state-disabled">
				<input type="text" class="form-control" id="id" 
					v-model="values.id" disabled="disabled">
			</label>
		</section>
		<!-- <section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-7">
					<label class="label">ID</label>
					<label class="input state-disabled" 
						:class="{'state-success':validator.id.success,'state-error':validator.id.error,'state-disabled':isUpdated}">
						<input type="text" class="form-control" id="id" 
							v-model="values.id" :disabled="isUpdated">
					</label>
					<div class="note" v-show="validated" 
						:class="{'note-success':validator.id.success,'note-error':validator.id.error}">
						This is a required field.
					</div>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Thumbnail</label>
					<label class="input state-disabled">
						<img :src="values.thumbnail" />
					</label>
				</div>
			</div>
		</section> -->
		<!-- <section>
			<label class="label">Name</label>
			<label class="input state-disabled" 
				:class="{'state-success':validator.name.success,'state-error':validator.name.error}">
				<input type="text" class="form-control" id="name" 
					v-model="values.name">
			</label>
			<div class="note" v-show="validated" 
				:class="{'note-success':validator.name.success,'note-error':validator.name.error}">
				This is a required field.
			</div>
		</section>
		<section>
			<label class="label">Manufacturer</label>
			<label class="input state-disabled">
				<input type="text" class="form-control" id="manufacturer" 
					v-model="values.manufacturer">
			</label>
		</section>
		<section>
			<label class="label">Model</label>
			<label class="input state-disabled">
				<input type="text" class="form-control" id="model" 
					v-model="values.model">
			</label>
		</section> -->
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Name</label>
					<label class="input state-disabled">
						<input type="text" class="form-control" id="name" 
							v-model="values.name" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Manufacturer</label>
					<label class="input state-disabled">
						<input type="text" class="form-control" id="manufacturer" 
							v-model="values.manufacturer" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Model</label>
					<label class="input state-disabled">
						<input type="text" class="form-control" id="model" 
							v-model="values.model" disabled="disabled">
					</label>
				</div>
			</div>
		</section>
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Type</label>
					<label class="input state-disabled">
						<input type="text" class="form-control" id="type" 
							v-model="values.type.id" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Industry</label>
					<label class="input state-disabled">
							<input type="text" class="form-control" id="industry" 
								v-model="values.industry.id" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Category</label>
					<label class="input state-disabled">
						<input type="text" class="form-control" id="category"	
							v-model="values.category.id" disabled="disabled">
					</label>
				</div>
			</div>
		</section>
		<section>
			<label class="label">Description</label>
			<label class="textarea textarea-resizable state-disabled">
				<textarea class="custom-scroll" rows="6" id="description" 
					v-model="values.description" disabled="disabled">
				</textarea>
			</label>
		</section>
		<section v-if="values.path">
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-4"  v-if="values.path">
					<label class="label">Thumbnail</label>
					<label class="input state-disabled">
					<!--  class="form-control" -->
						<img id="thumbnailImg" :src="icon" />
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-4" v-if="values.path && showThumbnail">
					<label class="label">New Thumbnail</label>
					<label class="input state-disabled">
					<!--  class="form-control" -->
						<img :src="thumbnail" />
					</label>
					<button id="saveIcon" type="button" class="btn btn-default"
						title="Save" @click="save()">
						<i class="fa fa-fw fa-save"></i>
					</button>
					
				</div>
			</div>
			
		</section>
	</fieldset>
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">Model Type</label>
			<label class="input state-disabled">
				<input type="text" class="form-control" id="modelType"	v-model="values.modelType" disabled="disabled">
			</label>
		</section>
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Width</label>
					<label class="input state-disabled">
						<input type="number" class="form-control" id="width" 
							v-model="values.width" 
							disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Height</label>
					<label class="input state-disabled">
						<input type="number" class="form-control" id="height" 
							v-model="values.height" 
							disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Depth</label>
					<label class="input state-disabled">
						<input type="number" class="form-control" id="depth" 
							v-model="values.depth" 
							disabled="disabled">
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
							disabled="disabled">
						<i></i>Show Shadow
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3" v-if="values.showShadow">
					<label class="label">Shadow Source</label>
					<label class="input state-disabled">
						<input type="text" class="form-control"
							v-model="shadowSource" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3" v-if="!values.shadowImage">
					<label class="label">Shadow Type</label>
					<label class="input state-disabled">
						<input type="text" class="form-control"
							v-model="shadowType" disabled="disabled">
					</label>
				</div>
			</div>
		</section>
		<!-- innerWidth,doorLucency,doorColor -->
		<section v-else-if="values.modelType=='rackModel'">
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Inner Width</label>
					<label class="input state-disabled">
						<input type="number" class="form-control" id="innerWidth"	
							v-model="values.innerWidth" disabled="disabled">
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">&nbsp;</label>
					<label class="checkbox">
						<input type="checkbox" id="doorLucency" name="doorLucency" 
							:v-model="values.doorLucency" disabled="disabled">
						<i></i>Door Lucency
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Door Color</label>
					<label class="input myColorPicker state-disabled">
						<div class="col-sm-8 col-md-8 col-lg-10">
				  	<input type="text" id="doorColor" class="form-control" 
				  		v-model="values.doorColor" disabled="disabled">
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
						<label class="textarea textarea-resizable state-disabled">
							<textarea class="custom-scroll" rows="6" id="frontData" 
								v-model="values.frontData" disabled="disabled">
							</textarea>
						</label>
					</div>
					<div class="col-sm-8 col-md-8 col-lg-5">
						<label class="label">Back Data</label>
						<label class="textarea textarea-resizable state-disabled">
							<textarea class="custom-scroll" rows="6" id="backData" 
								v-model="values.backData" disabled="disabled">
							</textarea>
						</label>
					</div>
			</div>
		</section>
		<section v-if="values.path">
			<network-three  :values="values" @action="networkAction($event)"></network-three>
		</section>
		
	</fieldset>
</form>
</template>
<script>
	const _ = require('lodash');
	require('bootstrap-colorpicker');
	import NetworkThree from './NetworkThree';
	import Config from '@/assets/js/config';
	export default {
		name: 'ModelDetail',
		props: {
			values: {
				type: Object
			}
		},
		data: function(){
			return {
				showThumbnail: false,
				thumbnail: '',
				times: 1,
			}
		},
		computed: {
			icon: function(){
				return Config.urlPrefix+'/'+this.values.path+this.values.id+'/icon.png?t='+this.times;
			},
			files: function(){
				return {};
			},
			shadowSource: function(){
				return this.values.shadowImage?"图片":"内置";
			},
			shadowType: function(){
				if(this.values.shadowType === 0 ){
					return "矩形";
				} else if(this.values.shadowType === 1 ){
					return "圆形";
				}
			}
		},
		methods: {
			previewModel(){
				const vm = this;
				this.preview = !this.preview;
			},
			networkAction(p){
				if(p.action == 'screenshot'){
					this.showThumbnail = true;
					this.thumbnail = p.data;
					// this.values.thumbnail = p.data;
					// Note: 为什么用下面的代码不能触发图片刷新？
					// this.$set(this.values, 'thumbnail',p.data);
				}
			},
			save(){
				let vm = this;
				vm.$http.post('/model/icon/'+vm.values.id,{},{
					params:{thumbnail: vm.thumbnail},
				}).then((response) => {
                    vm.showThumbnail = !vm.showThumbnail;
					vm.thumbnail = '';
					vm.times++;
                });
			}
		},
		components: {
			NetworkThree
		},
		mounted(){
			var $el = this.$el;
			if(this.values.showShadow){
				$('#showShadow').attr('checked','checked');;
			}
		   	$('.selectpicker',$el).selectpicker('refresh');
		   	if(this.values.modelType === 'rackModel'){
				$('.myColorPicker',this.$el).colorpicker();
			}
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
	#saveIcon{
		position: absolute;
		left: 100px;
		bottom: 0;
	}
</style>
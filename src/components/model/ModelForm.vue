<template>
<form class="smart-form">
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">ID *</label>
			<label class="input" 
				:class="{'state-success':validator.id.success,'state-error':validator.id.error,'state-disabled':isUpdated}">
				<input type="text" class="form-control" id="id" 
					v-model="values.id" :disabled="isUpdated">
			</label>
			<div class="note" v-show="validated" 
				:class="{'note-success':validator.id.success,'note-error':validator.id.error}">
				This is a required field.
			</div>
		</section>
		<!-- <section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-7">
					<label class="label">ID *</label>
					<label class="input" 
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
					<label class="input">
						<img :src="values.thumbnail" />
					</label>
				</div>
			</div>
		</section> -->
		<!-- <section>
			<label class="label">Name *</label>
			<label class="input" 
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
			<label class="input">
				<input type="text" class="form-control" id="manufacturer" 
					v-model="values.manufacturer">
			</label>
		</section>
		<section>
			<label class="label">Model</label>
			<label class="input">
				<input type="text" class="form-control" id="model" 
					v-model="values.model">
			</label>
		</section> -->
		<section>
			<div class="row">
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Name *</label>
					<label class="input" 
						:class="{'state-success':validator.name.success,'state-error':validator.name.error}">
						<input type="text" class="form-control" id="name" 
							v-model="values.name">
					</label>
					<div class="note" v-show="validated" 
						:class="{'note-success':validator.name.success,'note-error':validator.name.error}">
						This is a required field.
					</div>
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
					<label class="input" 
						:class="{'state-success':validator.type.success,'state-error':validator.type.error}">
						<!-- <input type="text" class="form-control" id="type" 
							v-model="values.type"> -->
						<select id="type"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="typeProxy">
							<option v-for="item in typeData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
					<div class="note" v-show="validated" 
						:class="{'note-success':validator.type.success,'note-error':validator.type.error}">
						This is a required field.
					</div>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Industry *</label>
					<label class="input" 
						:class="{'state-success':validator.industry.success,'state-error':validator.industry.error}">
							<!-- <input type="text" class="form-control" id="industry" 
								v-model="values.industry"> -->
						<select id="industry"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="industryProxy">
							<option v-for="item in industryData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
					<div class="note" v-show="validated" 
						:class="{'note-success':validator.industry.success,'note-error':validator.industry.error}">
						This is a required field.
					</div>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3">
					<label class="label">Category *</label>
					<label class="input" 
						:class="{'state-success':validator.category.success,'state-error':validator.category.error}">
						<!-- <input type="text" class="form-control" id="category"	v-model="values.category"> -->
						<select id="category"
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="categoryProxy">
							<option v-for="item in categoryData" 
								:value="item.id">
									{{item.name}}
							</option>
						</select>
					</label>
					<div class="note" v-show="validated" 
						:class="{'note-success':validator.category.success,'note-error':validator.category.error}">
						This is a required field.
					</div>
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
				<img :src="thumbnail" />
			</label>
		</section>
	</fieldset>
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
		<section>
			<label class="label">Model Type</label>
			<label class="input"
				:class="{'state-success':validator.modelType.success,'state-error':validator.modelType.error}">
				<select id="modelType" @change="modelTypeChanged()" 
					class="selectpicker show-tick form-control" 
					data-live-search="true" v-model="modelTypeProxy">
				  	<option v-for="item in fields['modelType'].items" :value="item.value">
				  			{{item.name}}
				  	</option>
				</select>
			</label>
			<div class="note" v-show="validated" 
				:class="{'note-success':validator.modelType.success,'note-error':validator.modelType.error}">
				This is a required field.
			</div>
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
				<div class="col-sm-5 col-md-5 col-lg-3" v-if="showShadow">
					<label class="label">Shadow Source</label>
					<label class="input" key="shadowImage-input">
						<select id="shadowImage" 
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="shadowImage">
							<option v-for="item in fields['shadowImage'].items" 
								:value="item.value">
									{{item.name}}
							</option>
						</select>
					</label>
				</div>
				<div class="col-sm-5 col-md-5 col-lg-3" v-if="showShadow && !shadowImage">
					<label class="label">Shadow Type</label>
					<label class="input" key="shadowType-input">
						<select id="shadowType" 
							class="selectpicker show-tick form-control" 
							data-live-search="true" v-model="shadowType">
							<option v-for="item in fields['shadowType'].items" 
								:value="item.value">
									{{item.name}}
							</option>
						</select>
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
		<section>
			<label class="label">File input</label>
			<div class="input input-file"
				:class="{'state-success':validator.file.success,'state-error':validator.file.error}">
				<span class="button browse">
					<input type="file" id="file" name="file" 
						multiple="multiple"  
						@change="selectedFile($event)">Browse
				</span>
				<span class="button">
					<input type="button" name="preview" @click="previewModel()">Preview
				</span>
				<input type="text" placeholder="Include some files" 
					v-model="selectedFileNames" readonly="">
			</div>
			<div class="note" v-show="validated" 
				:class="{'note-success':validator.file.success,'note-error':validator.file.error}">
				This is a required field.
			</div>
		</section>
		<section v-if="preview">
			<network-three :values="values" :files="files"  
				@action="networkAction($event)"></network-three>
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
				thumbnail: '',
				shadowImage: false,
				showShadow: false,
				shadowType: 0,
				type:'',
				industry:'',
				category:'',
				modelValues: {
					// id:'',
					// name:'',
					// description:'',
					// manufacturer:'',
					// model:'',
					// type:'',
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
				validator: {
					id: {
						success: false,
						error: false
					},
					name: {
						success: false,
						error: false
					},
					file: {
						success: false,
						error: false
					},
					type: {
						success: false,
						error: false
					},
					industry: {
						success: false,
						error: false
					},
					category: {
						success: false,
						error: false
					},
					modelType: {
						success: false,
						error: false
					},
				},
				validated: false,
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
			modelTypeProxy: {
				get: function(){
					return this.default?this.default.modelType:this.modelType;
				},
				set: function(newValue){
					this.modelType = newValue;
					this.$set(this.values,'modelType',newValue);
				}
			},
			typeProxy: {
				get: function(){
					return this.default?this.default.type.id:this.type;
				},
				set: function(newValue){
					this.type = newValue;
					this.$set(this.values,'type',newValue);
				}
			},
			industryProxy: {
				get: function(){
					return this.default?this.default.industry.id:this.industry;
				},
				set: function(newValue){
					this.industry = newValue;
					this.$set(this.values,'industry',newValue);
				}
			},
			categoryProxy: {
				get: function(){
					return this.default?this.default.category.id:this.category;
				},
				set: function(newValue){
					this.category = newValue;
					this.$set(this.values,'category',newValue);
				}
			},
			fields: function(){
				let cols = {};
				this.properties.forEach(item => {
					cols[item.name] = item;
				});
				return cols;
			},
			isDisable: function(){
				return this.values.modelType==='objModel';
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
			},
		},
		methods: {
			resetVal: function(){
				// var cloneDefault = _.cloneDeep(this.default || {});
				const def = this.default;
				let v = _.defaultsDeep({}, this.default || {}, this.modelValues);
				if(def){
					if(!_.isString(def.industry)){
						v.industry = def.industry.id
					}
					if(!_.isString(def.category)){
						v.category = def.category.id
					}
					if(!_.isString(def.type)){
						v.type = def.type.id
					}
					// this.shadowImage = def.shadowImage;
				}
				return v;
			},
			submit: function(){
				

				// 获取所有字段值
				this.values.showShadow= $('#showShadow').is(':checked');
				// this.values.shadowImage= $('#shadowImage').is(':checked');
				// this.values.shadowType= $('#shadowType').is(':checked')?1:0;
				this.values.doorLucency = $('#doorLucency').is(':checked');
				this.values.doorColor= $('#doorColor').val() || '';
				// this.values.file = $('#file')[0].files;
				this.values.thumbnail = this.thumbnail;


				let validated = true;
				this.validatedFileds.forEach(prop => {
					if(this.values[prop]){
						this.validator[prop].success = true;
					} else {
						this.validator[prop].error = true;
						validated = false;
					}
				});
				// if(this.values.file && this.values.file.length){
				// 	this.validator.file.success = true;
				// } else {
				// 	this.validator.file.error = true;
				// 	validated = false;
				// }
				this.validated = true
				if(!validated)return;

				let formData = new FormData();
				for(let p in this.values){
					formData.append(p, this.values[p]);
				}
				formData.delete('file');
				if(this.values.file){
					var fileList=this.values.file;
					for (var i = 0; i < fileList.length; i++) {
						formData.append('file', fileList[i]);
					}
				}
				this.$emit('submit', formData);
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
			},
			selectedFile: function(event){
				let vm = this;
				let files = event.target.files;
				if (files && files.length) {
					let fileNames = '', file;
					for(let i=0;i<files.length;i++){
						file = files[i];
						fileNames += file.name+",";
					}
					fileNames = fileNames.slice(0,fileNames.length-1);
					vm.selectedFileNames = fileNames;
					vm.values.file = files;
					vm.readFiles();
        		}
			},
			validatFiles: function(){
				const files = this.values.file;
				if(files.length<=0){
					console.log('请选择文件');
					// 可弹出提示
					return;
				}
				if(vm.values.modelType == 'rackModel'){

				} else if(vm.values.modelType == 'equipmentModel'){

				} else if(vm.values.modelType == 'objModel'){
					
				}
				// 1、wrapModel
				// 一张图片
				// 2、objModel
				// 包含obj,mtl格式文件
				// 3、rackModel
				// 贴图名已经固定，包含
				let rackFileNames = ['rack_back.jpg','rack_side.jpg','rack_top.jpg','rack_door_front.jpg','rack_door_back.jpg','rack_door_front_l.jpg','rack_door_front_r.jpg','rack_door_back_l.jpg','rack_door_back_r.jpg','rack_door_front_b.jpg'];
				// 4、equipmentModel
				// 包含前后两张贴图，分别以_front和_back结尾
			},
			async readFiles(){
				const vm = this;
				const files = vm.values.file;
				let fileList;
				if(vm.values.modelType == 'objModel'){
					fileList = {};
					let imgs = {};
	        for(let i=0;i<files.length;i++){
	            const file = files[i], name = file.name.toLowerCase();
	            if(_.endsWith(name,'.mtl')){
	            	fileList.mtl = file;
	            } else if(_.endsWith(name,'.obj')){
	            	fileList.obj = file;
	            } else if(_.startsWith(file.type,'image')){
	            	var fn = name.substring(0, name.indexOf("."));
	            	imgs[fn] = file;
	            }
	        }
	        fileList.imgs = imgs;
				} else {
					fileList = await vm.readFilesAsync();
				}
				vm.files = fileList;
			},
			async readFilesAsync() {
				const vm = this;
			    const files = vm.values.file
			    const fileList = {}
			    for (let i = 0; i < files.length; i++) {
			    	let file = files[i];
			    	let name = vm.getName(file.name);
			        fileList[name] = await vm.readFileAsync(file);
			    }
			    // console.log(fileList);
			    vm.files = fileList;
			    return fileList;
			},
			getName: function(name){
				const vm = this;
				if(vm.values.modelType == 'wrapModel'){
					name = 'image';
				} else if(vm.values.modelType == 'rackModel'){
					if(_.endsWith(name,'_back.jpg'))name = 'backImage';
					if(_.endsWith(name,'_side.jpg'))name = 'sideImage';
					if(_.endsWith(name,'_top.jpg'))name = 'topImage';
					if(_.endsWith(name,'_wrap.jpg'))name = 'image';
					if(_.endsWith(name,'_door_front.jpg'))name = 'fontDoorImage';
					if(_.endsWith(name,'_door_back.jpg'))name = 'backDoorImage';
					if(_.endsWith(name,'_door_front_l.jpg'))name = 'frontDoorLeftImage';
					if(_.endsWith(name,'_door_front_r.jpg'))name = 'frontDoorRightImage';
					if(_.endsWith(name,'_door_back_l.jpg'))name = 'backDoorLeftImage';
					if(_.endsWith(name,'_door_back_r.jpg'))name = 'backDoorRightImage';
					if(_.endsWith(name,'_door_front_b.jpg'))name = 'frontDoorBackImage';
				} else if(vm.values.modelType == 'equipmentModel'){
					if(_.endsWith(name,'_front.jpg'))name = 'frontImage';
					if(_.endsWith(name,'_back.jpg'))name = 'backImage';
				}
				return name;
			},
			readFileAsync (file){
				return new Promise(resolve => {
			        const reader = new FileReader()
			        reader.onload = evt => resolve(evt.target.result)
			        reader.readAsDataURL(file)
			    })
			},
			modelTypeChanged: function(){
				const vm = this;
				let w = 0,h=0,d=0;
				if(vm.values.modelType == 'wrapModel'){
					w = 60,h=180,d=80;
				} else if(vm.values.modelType == 'rackModel'){
					let param = make.Default.getModelDefaultParameters('twaver.idc.rack');
					w=param.width.value;h=42;d=param.depth.value;
					this.values.innerWidth = param.cutWidth.value;
				} else if(vm.values.modelType == 'equipmentModel'){
					let param = make.Default.getModelDefaultParameters('twaver.idc.equipment');
					w=param.width.value;h=1;d=param.depth.value;
				}
				this.values.width = w;
				this.values.height = h;
				this.values.depth = d;
			},
			previewModel(){
				const vm = this;
				this.values.doorLucency = $('#doorLucency').is(':checked');
				this.values.doorColor= $('#doorColor').val() || '';
				this.preview = !this.preview;
			},
			networkAction(p){
				if(p.action == 'screenshot'){
					this.showThumbnail = true;
					this.thumbnail = p.data;
					// this.values.thumbnail = p.data;
					// Note: 为什么用下面的代码不能触发图片刷新？
					// this.$set(this.values, 'thumbnail',p.data);
				} else if(p.action == 'modelSize'){
					let b = p.data;
					this.values.width = b.x;
					this.values.height = b.y;
					this.values.depth = b.z;
				}
			}
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
			// var $el = this.$el;
			if(this.isUpdated){
				if(this.values.showShadow){
					$('#showShadow').attr('checked','checked');;
				}
				if(this.default){
					this.showShadow = this.default.showShadow;
					this.shadowImage = this.default.shadowImage;
					this.shadowType = this.default.shadowType;
				}
			}
		},
		updated(){
			if(this.values.modelType === 'rackModel'){
				$('.myColorPicker',this.$el).colorpicker();
			}
			$('.selectpicker',this.$el).selectpicker('refresh');
		},
		watch: {
			// modelType: function(val, oldVal){
			// 	this.$set(this.values,'modelType',val);
			// },
			showShadow: function(val, oldVal){
				this.$set(this.values,'showShadow',val);
			},
			shadowImage: function(val, oldVal){
				this.$set(this.values,'shadowImage',val);
			},
			shadowType: function(val, oldVal){
				this.$set(this.values,'shadowType',val);
			},
			typeData: function(val, oldVal){
				if(val && val.length){
					if(!this.default){
						this.$set(this.values,'type',val[0].id);
					}
				}
			},
			industryData: function(val, oldVal){
				if(val && val.length){
					if(!this.default){
						this.$set(this.values,'industry',val[0].id);
					}
				}
			},
			categoryData: function(val, oldVal){
				if(val && val.length){
					if(!this.default){
						this.$set(this.values,'category',val[0].id);
					}
				}
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
<style scoped>

	
</style>
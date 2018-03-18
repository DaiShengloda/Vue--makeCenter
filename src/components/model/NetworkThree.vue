<template>
	<div class="network">
		<div class="toolbar btn-group">
			<button type="button" class="btn btn-default"
                title="Refresh" @click="refresh()">
                <i class="fa fa-fw fa-refresh"></i>
            </button>
            <button type="button" class="btn btn-default"
                title="Save" @click="save()">
                <i class="fa fa-fw fa-save"></i>
            </button>
		</div>
		<canvas id="network3d"></canvas>
	</div>
</template>
<script>
const _ = require('lodash');
import Config from '@/assets/js/config';
export default {
	name: 'NetworkThree',
	props: {
        files: Object,
        values: Object,
    },
    data: function(){
    	return {
    		box: null,
    		node: null,
    		network: null
    	}
    },
    methods: {
    	refresh: function(){
    		this.box.removeByDescendant(this.node);
    		this.loadData();
    	},
    	save: function(){
    		const $canvas = $('#network3d',this.$el);
    		let bound = {x:0, y: 0, 
    			w:$canvas.attr('width'),
    			h:$canvas.attr('height')
    		};
    		const imageData = this.network.toImageData("PNG",bound,84,84);
    		this.$emit('action',{action:'screenshot',data:imageData});
    	},
    	loadData: function(){
    		// console.log(this.values);
    		// console.log(this.values.file);
    		if(this.values.file){
    			this.loadDataByFiles();
    		} else {
    			this.loadDataByUrl();
    		}
    	},
    	loadDataByUrl: function(){
			const vm = this;
    		const box = this.box;
    		const values = this.values;
    		const id = values.id;
			const url = Config.urlPrefix+'/'+values.path;//+id;
			let industry = _.isObject(values.industry)?values.industry.id:(values.industry||'idc');
			let modelId = 'twaver.'+industry+'.' + id;
			let model;
	    	if(values.modelType == 'wrapModel'){
				model = { 
					id: modelId, 
					width: values.width, 
					height: values.height, depth: values.height, 
					modelType: "wrapModel", path:url
				};
			} else if(values.modelType == 'rackModel'){
				model = {
                	id:modelId, 
                	path: url,
                	width: values.width, 
                	height: values.height, 
                	depth: values.depth, 
                	cutWidth: values.innerWidth, 
                	doorColor: values.doorColor,
                	doorLucency: values.doorLucency,	
                	modelType:'rackModel'
            	}
			} else if(values.modelType == 'equipmentModel'){
				model = {
					id:modelId,
					width: values.width,
					height: values.height, 
					depth: values.depth, 
					frontData: values.frontData,
					backData: values.backData,
					modelType: "equipmentModel",
					path: url
				}
			} else if(values.modelType == 'objModel'){
				model = { 
					id: modelId, 
					fileName: id, 
					path: url, 
					showShadow: values.showShadow, 
					shadowType: values.shadowType,
					shadowImage: values.shadowImage,
					modelType: "objModel"
				};
			}

			if(!model){
				return;
			}
			make.Default.registerModel(model);
			make.Default.load(model.id, function(node){
				// console.log('node ================');
				// console.log('node ', node);
                box.addByDescendant(node);
				vm.node = node;
            });
    	},
    	loadDataByFiles: function(){
    		const box = this.box;
    		const vm = this, values = vm.values;
    		let opt = {};
    		const files = vm.files;
			if(values.modelType == 'wrapModel'){
				opt.id = 'twaver.idc.wrapModel';
				opt.image = files.image;
			} else if(values.modelType == 'rackModel'){
				opt = {
	            	'id':'twaver.idc.rack',
	            	'backImage': files.backImage,
	            	'sideImage': files.sideImage,
	            	'topImage': files.topImage,
	            	'fontDoorImage': files.fontDoorImage,
	            	'backDoorImage': files.backDoorImage,
	            	'frontDoorLeftImage':files.frontDoorLeftImage,
	            	'frontDoorRightImage':files.frontDoorRightImage,
	            	'backDoorLeftImage':files.backDoorLeftImage,
	            	'backDoorRightImage':files.backDoorRightImage,
	            	'frontDoorBackImage':files.frontDoorBackImage,
	            }
	            if(values.doorColor)opt.doorColor = values.doorColor;
	            if(values.innerWidth)opt.cutWidth = values.innerWidth;
	            if(values.doorLucency!=undefined)opt.doorTransparent = values.doorLucency;
			} else if(values.modelType == 'equipmentModel'){
				opt.id = 'twaver.idc.equipment';
				opt.frontImage = files.frontImage;
				if(files.backImage)opt.backImage = files.backImage;
			} else if(values.modelType == 'objModel'){
				const loader = new mono.OBJMTLLoader();
			    box.startBatch();
			    loader.loadFiles(files.obj, files.mtl, files.imgs, function (object) {
			        let boundingBox = object.getBoundingBoxWithChildren();
			        let s = boundingBox.size();
			        let p = object.getPosition();
			        let x = s.x + p.x + 100, 
			         	y = s.y + p.y + 100, 
			         	z = s.z + p.z + 100;
			        vm.network.getCamera().setPosition(x, y, z);
			        box.addByDescendant(object);
			        box.getSelectionModel().setSelection(object.getChildren());
			        box.endBatch();

    				vm.$emit('action',{action:'modelSize',data:s});
			    });
			}
			if(values.modelType != 'objModel'){
    			if(values.depth)opt.depth = parseInt(values.depth);
				if(values.width)opt.width = parseInt(values.width);
				if(values.height)opt.height = parseInt(values.height);

				// console.log(opt);
				var node = make.Default.load(_.cloneDeep(opt));
				if(node){
					box.addByDescendant(node);
					vm.node = node;
				}
    		}
			
    	}
    },
	mounted(){
		make.Default.path='./static/make/';

		let vm = this;
		const box = new mono.DataBox();
        // const camera = new mono.PerspectiveCamera(30,1,10,1000);
        const camera = new mono.PerspectiveCamera(45, 1.5, 0.1, 1000);
        camera.setPosition(-100,100,250);
        const $canvas = $('#network3d',vm.$el);
        const $el = $(vm.$el);
        $canvas.attr('width', $el.width());
        $canvas.attr('height', $el.height());
		const network = new mono.Network3D(box,camera,$canvas[0]);
		var interaction = new mono.DefaultInteraction(network);
		interaction.setMinDistance(80);
		interaction.setMaxDistance(1000);
        network.setInteractions([interaction]);
		vm.network = network;
		// network.setClearColor("#10B9EC");
		network.setClearColor("#f0f0f0");
        // network.setClearAlpha(0);

		box.add(new mono.AmbientLight(0xFFFFFF));

		var findFirstObjectByMouse = function(network, e) {
            var objects = network.getElementsByMouseEvent(e);
            if (objects.length) {
                for (var i = 0; i < objects.length; i++) {
                    var first = objects[i];
                    var object3d = first.element;
                    if (!(object3d instanceof mono.Billboard)) {
                        return first;
                    }
                }
            }
            return null;
        }

		network.getRootView().addEventListener('dblclick', function(e) {
            var firstClickObject = findFirstObjectByMouse(network, e);
            if (firstClickObject) {
                var element = firstClickObject.element;
                var oldPoint = camera.t();
                var newPoint = firstClickObject.point;
                var interaction = network.getDefaultInteraction()
                if (element.getClient('animation')) {
                    make.Default.playAnimation(element, element.getClient('animation'));
                }
            }
        });
		vm.box = box;
		vm.loadData();
	}
}
</script>
<style>
	.network{
		min-height: 400px;
	}
	.toolbar{
		position: absolute;
	    z-index: 10;
	    right: 0;
	}
</style>
<template>
<div>
<form class="smart-form">
	<fieldset class="col-sm-6 col-md-6 col-lg-5">
        <section>
			<label class="label">Name</label>
            <label class="input state-disabled">
                <input type="text" class="form-control" id="name" 
                    v-model="values.name" disabled="disabled">
            </label>
		</section>
        <section>
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-5">
					<label class="label">Level</label>
					<label class="input state-disabled">
		                <input type="text" class="form-control" id="level" 
		                    v-model="values.level" disabled="disabled">
		            </label>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-5">
					<label class="label">status</label>
					<label class="input state-disabled">
		                <input type="text" class="form-control" id="status" 
		                    v-model="values.status" disabled="disabled">
		            </label>
				</div>
			</div>
		</section>
        <section>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-5">
                    <label class="label">Start Date</label>
                    <label class="input state-disabled">
		                <input type="text" class="form-control" 
		                	id="startTime" 
		                    v-model="values.startTime" 
		                    disabled="disabled">
		            </label>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5">
                    <label class="label">Delivery Date</label>
                    <label class="input state-disabled">
		                <input type="text" class="form-control" 
		                	id="deliveryTime" 
		                    v-model="values.deliveryTime" 
		                    disabled="disabled">
		            </label>
                </div>
            </div>
		</section>
	</fieldset>
	<fieldset class="col-sm-6 col-md-6 col-lg-6">
        <section>
			<label class="label">Description</label>
			<label class="textarea textarea-resizable state-disabled">
                <textarea rows="4" class="custom-scroll" v-model="values.description" disabled="disabled"></textarea>
			</label>
		</section>
		<section>
			<label class="label">Participants</label>
			<label class="textarea textarea-resizable state-disabled">
                <textarea rows="4" class="custom-scroll" v-model="values.participants" disabled="disabled"></textarea>
			</label>
		</section>
    </fieldset>
</form>
<div class="btn-toolbar">
	<div class="btn-group">
		<button type="button" class="btn btn-default"
			title="Add Models" @click="action('showModels')">
			<i class="fa fa-fw fa-plus"></i>
		</button>
		<button type="button" class="btn btn-default" 
			title="download" @click="download()">
			<i class="fa fa-fw fa-cloud-download"></i>
		</button>
		<button type="button" class="btn btn-default" 
			title="Update" @click="refresh()">
			<i class="fa fa-fw fa-refresh"></i>
		</button>
	</div>
</div>
<table class="table table-bordered myTable">
	<thead>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>manufacturer</th>
			<th>model</th>
			<th>type</th>
			<th>industry</th>
			<th>category</th>
			<th>modelType</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="item in result">
			<td>{{item.id}}</td>
			<td>{{item.name}}</td>
			<td>{{item.manufacturer}}</td>
			<td>{{item.model}}</td>
			<td>{{item.type}}</td>
			<td>{{item.industry}}</td>
			<td>{{item.category}}</td>
			<td>{{item.modelType}}</td>
			<td>{{item.description}}</td>
		</tr>
	</tbody>
</table>
</div>
</template>
<script>
	const _ = require('lodash');
	import Config from '@/assets/js/config';
	export default {
		name: 'ProjectDetail',
		props: {
			values: {
				type: Object,
				default: {}
			}
		},
		data: function(){
			return {
				result: []
			}
		},
		computed: {
		},
		methods: {
			action(action){
				console.log(action);
				this.$emit('action',{action:action});
			},
			download(){
				const vm = this;
				let items = vm.result.map(item => {
					return {id:item.id, path:item.path};
				});
				let url = '/models/files?items='+JSON.stringify(items);
				window.location.href = Config.urlPrefix+url
			},
			refresh(){
				const vm = this;
				vm.$http.get("/relation/models/"+vm.values.name).then((res)=>{
					vm.result = res.data;
				});
			}
		},
		mounted(){
			this.refresh();
		},
		updated(){
		}

	}
</script>
<style scoped>
    #startTime, #deliveryTime{
        padding-left:50px;
    }
	.myTable{
		margin-top:5px;
	}
</style>
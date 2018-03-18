<template>
<div class="btn-group pull-right myGoup">
	<button type="button" class="btn btn-default" id="btnVisible"
        title="Show / hide columns" @click="show()">
        Show / hide columns
    </button>
	<ul class="ColVis_collection" id="myCols" v-if="showCols" 
		@click="colVisible($event)">
		<li v-for="(item,index) in cols">
			<label>
			<input type="checkbox" name="cols"
				:checked="item.visible" :value="index">
			<span>{{item.name}}</span>
			</label>
		</li>
	</ul>
</div>

</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'ColumnVisible',
	props: {
        module:{
			type: String,
			required: true
		},
    },
    data: function(){
    	return {
    		showCols: false
    	}
    },
    computed: {
		...mapState({
			cols: function(state){
				return state[this.module].columns;
			}
		}),
	},
    methods: {
    	show(){
    		this.showCols = !this.showCols;
    	},
    	colVisible(e){
    		e.stopPropagation();
    		const tagName = e.target.tagName;
    		if(tagName != 'INPUT'){
    			return;
    		}
    		const vm = this;
    		let cols = [];
    		let $target = $(e.target);
    		let p = {index:$target.val(),show:$target.is(':checked')}
			this.$emit('visibleCols',p);
    	}
    }
}
</script>
<style>
#myCols{
	display: block;
	opacity: 1;
	position: absolute;
	z-index: 2002;
	background-color: rgba(243,243,243,0.5);
	overflow-y: scroll;
	border: 1px solid rgba(0,0,0,.4);
	padding: 8px 8px 4px;
	margin: 0;
	min-width: 152px;
	max-height: 315px;
	top:35px;
}
.myGoup{
	margin-right: 5px;
}
</style>


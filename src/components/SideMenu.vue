<template>
	<!-- Left panel : Navigation area -->
	<!-- Note: This width of the aside area can be adjusted through LESS variables -->
	<aside id="left-panel">

		<!-- User info -->
		<div class="login-info">
			<span> <!-- User image size is adjusted inside CSS, it should stay as it --> 
				
				<a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
					<img src="../assets/img/avatars/sunny.png" alt="me" class="online" /> 
					<span>
						loda.dai
					</span>
					<i class="fa fa-angle-down"></i>
				</a> 
				
			</span>
		</div>
		<!-- end user info -->

		<!-- NAVIGATION : This navigation is also responsive-->
		<nav>
			<ul>
				<li :class="{active: m.active, open: m.active && m.children}"  
					v-for="(m,index) in menus" @click="toggle(index,$event)">
					<a v-if="m.children">
						<i class="fa fa-lg fa-fw" :class="m.icon"></i>
						<span class="menu-item-parent">{{m.text}}</span>
						<b class="collapse-sign" v-if="m.children">
							<em class="fa" 
								:class="[m.active?'fa-minus-square-o':'fa-plus-square-o']"></em>
						</b>
					</a>
					<router-link :to="{path:'/'+m.id}" v-else>
						<i class="fa fa-lg fa-fw" :class="m.icon"></i>
						<span class="menu-item-parent">{{m.text}}</span>
					</router-link>
					<transition @enter="enter", @leave="leave" :css="false">
						<ul v-if="m.children" v-show="m.active">
							<li :class="{active: c.active}" v-for="(c, cIndex) in m.children" 
								@click="selectChildren(cIndex,$event)">
								<router-link :to="{path:'/'+m.id+'/'+c.id}">{{c.text}}</router-link>
							</li>
						</ul>
					</transition>
				</li>
			</ul>
		</nav>
		<span class="minifyme" data-action="minifyMenu" @click="minified($event)"> 
			<i class="fa fa-arrow-circle-left hit"></i> 
		</span>
	</aside>
	<!-- END NAVIGATION -->
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery';

export default {
  name: 'SideMenu',
  data: function(){
  	return {
  		last:-1, //上一次选中的menu
  		lastItem: -1
  	}
  },
  computed: mapGetters(['menus']),
  created(){
	  this.$store.dispatch('getMenus');
  },
  methods: {
  	toggle(index,event){
  		this.$store.dispatch('toggleShowMenu', {index, last:this.last});
  		// this.last = this.last===index?-1:index;
  		
  		this.$store.dispatch('selectMenuChildren', {index:-1, last:this.last, lastItem: this.lastItem});
  		this.lastItem = -1;
  		this.last = this.last===index?-1:index;
  		
  	},
  	selectChildren(index,event){
  		event.stopPropagation();
  		if(this.lastItem!==index){
  			this.$store.dispatch('selectMenuChildren', {index, last:this.last, lastItem: this.lastItem});
  			this.lastItem = index;
  		}
  	},
  	enter(el, done){
  		el.style.display = 'none';
  		$(el).slideDown('fast',done);
  	},
  	leave(el,done){
  		$(el).slideUp('fast',done);
  	},
  	minified(event){
  		event.stopPropagation();
  		$(document.body).toggleClass('minified');
  	}
  }
}
</script>
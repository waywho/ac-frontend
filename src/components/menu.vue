<template>
    <div id="app-menu">
		<div class="menu-close">
		  <i v-on:click="toggleMenu()" class="fa fa-times fa-2x is-white" aria-hidden="true"></i>
		</div>
		<div class="row between-xs between-sm menu-brand">
		  	<div v-on:click="toggleMenu()" class="col-sm col-xs large"><router-link to="/">artistcenter.com</router-link></div>
		  	<span v-if="currentUser" class="col-sm col-xs large">Sign Out</span>
		</div>
		<ul class="menu-list non-list">
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/auditions">Auditions</router-link></li>
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/about/center">About</router-link></li>
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/memberships">Memberships</router-link></li>
		</ul>

		<div class="medium social-heading">Socials</div>
		<div class="social-icons">
			
			<i class="fa fa-facebook selection-icon-horizontal" aria-hidden="true"></i>
			
			<i class="fa fa-twitter selection-icon-horizontal" aria-hidden="true"></i>
			
			<i class="fa fa-linkedin selection-icon-horizontal" aria-hidden="true"></i>
			
		</div>
		<div class="is-lightgray">
			<p><router-link to="/about/terms">Terms & Support</router-link></p>
			<p>@Copyright Artist Center 2017</p>
		</div>
    </div>
</template>

<script>
import menuMixin from '../mixins/menuMixin'
import currentUser from '../mixins/currentUserMixin';

export default {
  name: 'app-menu',
  props: {
  	isActive: Boolean
  },
  data () {
    return {
      
    }
  },
  mixins: [menuMixin, currentUser]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

#app-menu a {
	color: #fff !important;
	text-decoration: none;
}

#app-menu a:hover {
	color: $color-gold !important;
}

.menu-close {
	display: flex;
	cursor: pointer;
	height: 100px;
	align-items: center;
}

.menu-close:hover i {
	color: $color-gold;
}

.menu-brand {
	margin-bottom: 105px;
}

.menu-brand span {
	text-align: right;
}

.menu-list {
	font-size: 18px;
	margin-bottom: 75px;
}

.menu-list li {
	height: 28px;
}

.social-links {
	display: inline-block;
}

.social-heading {
	margin-bottom: 25px;
}

.social-icons {
	height: 45px;
	display: flex;
	align-items: center;
	margin-bottom: 69px;
}

</style>

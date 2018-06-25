<template>
    <div id="app-menu">
		<div class="menu-buttons" >
		  <div class="menu-close"><i v-on:click="toggleMenu()" class="fa fa-times fa-2x is-white" aria-hidden="true"></i></div>

		  <div v-if="signedIn" class="sign-out" v-on:click="signOut();">Sign Out</div>
		</div>
		<div class="menu-brand">
		  	<div v-on:click="toggleMenu()" class="large strong">Opportunity. Connect.<span class="is-golden"> Go.</span></div>
		  	
		</div>
		<ul class="menu-list non-list">
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/opportunities">Opportunities</router-link></li>
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/about/center">About</router-link></li>
			<li v-on:click="toggleMenu()" class="selection-text-vertical medium"><router-link to="/memberships">Memberships</router-link></li>
		</ul>

		<div class="medium social-heading is-golden"><b>Follow Us</b></div>
		<ul class="menu-list non-list">
			<li>facebook</li>
			<li>twitter</li>
			<li>instagram</li>
		</ul>
		<div class="is-lightgray copy-right-container">
			<p><router-link to="/about/terms">Terms & Support</router-link></p>
			<hr class="copy-right" />
			<span>@Copyright Artist Center 2017</span>
		</div>
    </div>
</template>

<script>
import menuMixin from '@/mixins/menuMixin'
import currentUser from '@/mixins/currentUserMixin';

export default {
  name: 'app-menu',
  props: {
  	isActive: Boolean
  },
  data () {
    return {
      
    }
  },
  methods: {
  	signOut: function() {
  		this.$store.dispatch('signOut').then(() => {
  			this.toggleMenu();
  			this.$router.push("/")
  		});	
  	}
  },
  mixins: [menuMixin, currentUser]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

#app-menu a {
	color: #fff !important;
	text-decoration: none;
}

#app-menu a:hover {
	color: $color-gold !important;
}

.menu-buttons {
	display: flex;
	height: 100px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
}

.menu-close {
	cursor: pointer;
}

.menu-close:hover i {
	color: $color-gold;
}

.sign-out {
	cursor: pointer;
}

.sign-out:hover {
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

.connect-go {
	flex-grow: 2;
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

.sign-out {
	cursor: pointer;
}

.copy-right {
	border-top: 2px solid white;
	width: 42px;
	max-width: 42px;
	margin-left: 0px;
	margin-bottom: 0.5rem;
}

</style>

<template>
  <div id="footer">
  	<div class="row">
  		<div class="col-sm-12 col-xs-12">
		  	<div class="footer-logo">
		  		<img src='../../assets/images/artistcenter-logo2.svg' alt="operaop logo" />
		  	</div>
	  	</div>
	  	<div class="col-sm-12 col-xs-12 row between-xs">
	 		<div class="col-sm-12 col-xs-12">
		    	<span class="medium is-midgray">memberships</span>
		    	<ul>
		    		<li class="is-lightgray small"><router-link to="/memberships" class="is-midgray">artist</router-link></li>
		    		<li class="is-lightgray small"><router-link to="/memberships" class="is-midgray">company</router-link></li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    		 <span class="medium is-midgray">account</span>
		    	<ul>
		    		<li class="is-lightgray small"><router-link to="/signin" class="is-midgray">sign in</router-link></li>
		    		<li class="is-lightgray small">contact</li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    	<span class="medium is-midgray">socials</span>
		    	<ul>
		    		<li class="is-lightgray small"><a href="https://www.facebook.com/operaop/" target="_blank" class="is-midgray" rel="nofollow">facebook</a></li>
		    		<li class="is-lightgray small"><a href="https://www.instagram.com/artistcenterapp/" target="_blank" class="is-midgray" rel="nofollow">instagram</a></li>
		    	</ul>
		    </div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-8 col-xs-12 is-lightgray footnote smaller">
			©OperaOp 2017. All Rigths Reserved. <router-link to="/about/terms" class="is-midgray">Terms and Conditions</router-link>
		</div>
	</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../styles/style-variables';
#footer {
  background-color: white;
  padding: 85px $body-padding-small 20px;
  grid-area: footer;
  height: 100%;
  min-height: $footer-height;
  width: 100%;
}

.footer-logo {
	width: 238px;
	margin-bottom: 25px;
}

#footer ul {
	padding-left: 0px;
	margin-bottom: 25px;
	margin-left: 0px;
}

#footer li {
	list-style: none;
	margin: 5px 0px;
}

#footer li:hover {
	color: $color-gold;
}

.footnote {
	padding: 23px 0px;
	border-top: 1px solid #706d6c;
	margin-top: 45px;
}

@media all and (min-width: $bp-med) {
	#footer {
		padding: 125px $body-padding-large 40px;
	}
}
</style>

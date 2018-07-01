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
		    		<li class="is-lightgray small">Adante Artist</li>
		    		<li class="is-lightgray small">Adagio Artist</li>
		    		<li class="is-lightgray small">Company</li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    		 <span class="medium is-midgray">account</span>
		    	<ul>
		    		<li class="is-lightgray small">login</li>
		    		<li class="is-lightgray small">settings</li>
		    		<li class="is-lightgray small">contact</li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    	<span class="medium is-midgray">socials</span>
		    	<ul>
		    		<li class="is-lightgray small">facebook</li>
		    		<li class="is-lightgray small">twitter</li>
		    		<li class="is-lightgray small">instagram</li>
		    	</ul>
		    </div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-8 col-xs-12 is-lightgray footnote smaller">
			©OperaOp 2017. All Rigths Reserved.
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

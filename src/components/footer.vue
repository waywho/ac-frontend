<template>
  <div id="footer">
  	<div class="row">
  		<div class="col-sm-12 col-xs-12">
		  	<div class="footer-logo">
		  		<img src='../assets/images/logo-placeholder.png' alt="operaop logo" />
		  	</div>
	  	</div>
	  	<div class="col-sm-12 col-xs-12 row between-xs">
	 		<div class="col-sm-12 col-xs-12">
		    	<span class="medium">memberships</span>
		    	<ul>
		    		<li class="is-lightgray">Adante Artist</li>
		    		<li class="is-lightgray">Adagio Artist</li>
		    		<li class="is-lightgray">Company</li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    		 <span class="medium">account</span>
		    	<ul>
		    		<li class="is-lightgray">login</li>
		    		<li class="is-lightgray">settings</li>
		    		<li class="is-lightgray">contact</li>
		    	</ul>
		    </div>
		    <div class="col-sm-12 col-xs-12">
		    	<span class="medium">socials</span>
		    	<ul>
		    		<li class="is-lightgray">facebook</li>
		    		<li class="is-lightgray">twitter</li>
		    		<li class="is-lightgray">instagram</li>
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

<style scoped>
#footer {
  background-color: white;
  padding: 125px 100px 50px 100px;
  grid-area: footer;
  height: 700px;
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

.footnote {
	padding: 23px 0px;
	border-top: 1px solid #706d6c;
	margin-top: 66px;
}

@media screen and (max-width: 46rem) {
	#footer {
		padding: 85px 25px 40px 25px;
	}
}
</style>

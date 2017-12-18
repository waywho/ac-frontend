<template>
  <div class="memberships">
  	<div class="hero-section">
  		<div class="hero-banner">
		  	<div class="hero-image" :style="{'background-image': 'url('+ heroImage +')'}">
		  	</div>
		</div>
  		<div class="row hero-promo">
  			<div class="panel-1 col-xs-12 col-sm-5">

  				<span v-html="heroPromoTitle"></span>
  			</div>
  		</div>
  	</div>
  	<div class="features-section">
  		<div class="features-inner">
  			<h2>Memberships.</h2>
  			<div class="row membership-details">
	  			<div class="col-xs-12 col-sm-4" v-for="(membership, index) in memberships">
	  				<div :class="['details-header', 'header' + index]">
		  				<i v-if="membership.type==='artist'" class="fa fa-user-o" aria-hidden="true"></i>
		  				<i v-if="membership.type==='company'" class="fa fa-building-o" aria-hidden="true"></i>
		  				<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
  					</div>
	  				<div class="details-tile">
	  					<div class="tile-title medium">{{membership.name}} membership</div>
  						
  						<div :class="['details-text', 'benefits'+index]">
  							<ul>
	  							<li v-for="benefit in membership.benefits">{{benefit}}</li>
	  						</ul>
  						</div>
  						
  						<span class="medium learn-action">Create Account</span>	  					
	  				</div>
	  			</div>
  			</div>
  		</div>
  	</div>
  </div>
  <div class
</template>

<script>
export default {
  name: 'membershipDetails',
  data () {
    return {
    	heroImage: require("../assets/images/membership-hero.jpg"),
    	heroPromoTitle: "Opportunity. <br />Connect.</br><span class='is-golden'>Go.</span>",
    	memberships: [
	      	{
	      		type: 'artist',
	      		name: 'Adagio Artist',
	      		benefits: [
	      			'Free Mmbership',
	      			'Promotional Web Page',
	      			'Private Reviews and Blog',
	      			'Media Platform',
	      			'Full Social Network Platform',
	      			'Multilingual Support',
	      			"Database access"
	      		]
	      	},
	      	{
	      		type: 'artist',
	      		name: 'Andante Artist',
	      		benefits: [
	      			'Free Mmbership',
	      			'Promotional Web Page',
	      			'Private Reviews and Blog',
	      			'Media Platform',
	      			'Full Social Network Platform',
	      			'Multilingual Support',
	      			"Database access",
	      			"Premium Content Access",
	      			"Full @Operaop Email hosting",
	      			"Free Online Advertising"
	      		]
	      	},
	      	{
	      		type: 'company',
	      		name: 'Company',
	      		benefits: [
	      			'Free Mmbership',
	      			'Multiple Andante Logins',
	      			'Private Reviews and Blog',
	      			'Team Pages and Sub Tabs',
	      			'Media Platform',
	      			'Full Social Network Platform',
	      			'Multilingual Support',
	      			"Database access",
	      			"Full @Operaop Email hosting",
	      			"Free Online Advertising",
	      			"Cross Company Support"
	      		]
	      	}
      	]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
@import '../styles/hero';

.hero-section {
	padding-bottom: 50px;
}

.hero-image {
	left: 0;
	width: 100%;
	height: 332px;
}

.hero-banner {
	height: 332px;
	margin-bottom: 109px;
}

.panel-1 {
	font-size: 42px;
	line-height: 48px;
}

.features-section {
	padding-top: 263px;
	color: $color-darkgray;
	// height: 1740px;
	// background-color: $color-tile;
	padding-bottom: 187px;
}

.features-inner {
	width: 90%;
	margin: 0 auto;
}

.membership-details {
	align-items: stretch;
}

.features-inner h2 {
	color: $color-darkgray;
	text-align: right;
}

.details-tile {
	background: #fff;
	min-height: 1050px;
	position: relative;
}

.details-tile .learn-action {
	position: absolute;
	bottom: 92px;
}


.header0 {
	background-color: #f7c58d;
}

.benefits0 ul li::before {
	color: #f7c58d;
}

.header1 {
	background-color: $color-gold;
}

.benefits1 ul li::before {
	color: $color-gold;
}

.header2 {
	background-color: $color-mud;
}

.benefits2 ul li::before {
	color: $color-mud;
}

@media screen and (max-width: 46rem) {
	.panel-1, .panel-2 {
		padding-left: 34px;
		padding-right: 34px;
		margin-bottom: 80px;
	}

	.hero-banner {
		margin-bottom: 172px;
	}

	.features-section {
		padding-top: 34px;
	}
}

</style>

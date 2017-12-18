<template>
  <div class="landing">
  	<div class="hero-section">
  		<div class="hero-banner">
		  	<div class="hero-image" :style="{'background-image': 'url('+ heroImage +')'}">
		  	</div>
  			<div class="hero-action-box">
          <div id="top-line">
            Opportunity.<br />
            Connect.<br />
            <span class="gold-go extra-strong">Go.</span>
          </div>
  				<div class="secondary-call">
			  		<p>Join over 1000 Operatic artists and companies worldwide.Sign up your Artist.Center account below to create your account, Connecting you with fellow singers, and prospective companies.</p>
			  		<div class="call-action large strong"><router-link to="/signup"><i class="fa fa-circle-o" aria-hidden="true"></i>Sign Up Now</router-link></div>
		  		</div>
	  		</div>
	  	</div>
  		<div class="row hero-promo">
  			<div class="panel-1 col-xs-12 col-sm-5">
  				<hr />
  				<span v-html="heroPromoTitle"></span>
  			</div>
  			<div class="panel-2 col-xs-12 col-sm-7">
  				<div>
  					<div class="promo-text">{{heroPromoText}}</div>
  					<div class="medium learn-action">Learn More</div>
  				</div>
  			</div>
  		</div>
  	</div>
  	<div class="features-section row">
  		<div class="col-sm-offset-1 col-sm-5 col-xs-11 feature-left">
  			<div class="features-title">
  				Your membership.<br />
  				Your way.
  			</div>
  			<div class="details-header">
  				<i class="fa fa-building-o" aria-hidden="true"></i>
  				<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
			</div>
  			<div class="details-tile">
  				<div class="tile-title medium">{{featureLeftTitle}}</div>
  				<div class="details-text" v-html="featureLeftDetails"></div>
  				<span class="medium learn-action">Create Account</span>
  			</div>
  		</div>
		<div class="col-sm-5 col-xs-11 feature-right">
  			<div class="details-header">
  				<i class="fa fa-user-o" aria-hidden="true"></i>
  				<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
  			</div>
  			<div class="details-tile">
  				<div class="tile-title medium">{{featureRightTitle}}</div>
  				<div class="details-text" v-html="featureRightDetails"></div>
  				<span class="medium learn-action">Create Account</span>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import signUpCredentials from './signUpCredentials'

export default {
  name: 'landing',
  components: {
  	'sign-up-form': signUpCredentials
  },
  data () {
    return {
      heroImage:require("../assets/images/backstage.gif"),
      heroPromoTitle: "Everything you need to promote your opera career or organization online.",
      heroPromoText: "Lorem ipsum dolor amet deep v master cleanse cray pop-up occupy kinfolk gastropub fam quinoa coloring book pinterest edison bulb. Af sustainable lomo, iceland actually wolf disrupt.",
      featureLeftTitle: "Company members",
      featureLeftDetails: "<p>For companies, we offer 2 types of subscription: Adagio & Andante. Lorum Ipsum Deus Domine deus anime Lorum</p><br /><ul><li>Free Membership</li><li>Promotional Profile Page</li><li>Private Review and Blog</li><li>Full Social Media Platform</li></ul>",
      featureRightTitle: "Artist membership",
      featureRightDetails: "<p>For Artists and arts professionals, we offer 2 types of subscription: Adagio & Andante. Lorum Ipsum Deus Domine deus anime Lorum</p><br /><ul><li>Free Membership</li><li>Promotional Profile Page</li><li>Private Review and Blog</li><li>Full Social Media Platform</li></ul>"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';
@import '../styles/hero';

.hero-action-box {
	color: #fff;
	width: 469px;
	position: absolute;
	top: 0;
	left: 100px;
	height: 609px;
	background: $color-gold;
	z-index: 1;
	padding: 152px 47px 77px 66px;
}

#top-line {
  // position: absolute;
  // left: 10%;
  // top: 0;
  // padding: 35px;
  font-size: 50px;
  line-height: 56px;
  font-weight: 700;
  color: $color-lightgray;
  // z-index: 2;
}

.gold-go {
  font-size: 100px;
  line-height: 106px;
  color: #fff;
}


.secondary-call {
  margin-top: 53px;
}

.secondary-call .fa {
  margin-right: 24px;
}

.secondary-call a {
  color: #fff;
}

.hero-action-box h3 {
	color: #fff;
}


.call-action {
	font-weight: 500;
	font-size: 20px;
  pointer: cursor;
}


.features-section {
	padding-top: 263px;
	color: $color-darkgray;
	// height: 1740px;
	// background-color: $color-tile;
	padding-bottom: 187px;
}

.features-title, .features-closer{
	font-size: 38px;
	line-height: 44px;
	font-weight: 700;
	margin-top: 140px;
	margin-bottom: 93px;
}

.feature-left .details-header {
	background: $color-mud;
}

.feature-right .details-header {
	background: $color-gold;
}

.feature-right {
	margin-left: 19px;
} 

.feature-left .details-tile .learn-action {
	border-bottom: 2px solid $color-mud;
}

@media screen and (max-width: 46rem) {

	.hero-action-box {
		left: 0 !important;
		top: 528px;
		width: 90%;
    padding: 125px 25px 66px 28px;
	}

	.hero-action-box-inner {
		margin-top: 35px;
	}

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

	.feature-left, .feature-right {
		margin: 45px auto;
	}

	.features-section {
		padding-bottom: 0px;
	}
}
</style>

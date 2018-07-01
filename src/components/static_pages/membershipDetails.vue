<template>
  <div class="memberships">

	<h1 class="is-lightgray">Memberships</h1>
	<span class="h3 is-lightgray">Opportunity. Connect. <span class='is-gold'>Go.</span></span>

	<div class="membership-details" v-for="(membership, index) in memberships">
		<div class="membership-circle">
			<img :src="require('@/assets/images/artistcenter-logo.png')" />
		</div>
		<h2 class="is-lightgray membership-heading">{{membership.name}} Membership</h2>

		<ul class="arrow-list lh-list">
			<li v-for="benefit in membership.benefits">{{benefit}}</li>
		</ul>
		<div class="info-text-controls" id="membership-controls">
        	<div class="button-package"> 
            	<router-link to="/signup" rel="noopener nofollow" class="signup-button is-gold strong">Sign Up Now</router-link>
           		<hr class="signup-underline" />
        	</div>
    	</div>					
	</div>
	<div class="conclusion">
        		<h2 class="heading"><span class="is-gold">Everything You Need</span></h2>
        		<h3 class="is-lightgray">to promote your opera career or organization online</h3>
				<div class="learnmore-text-controls">
					<div class="button-package">
	            		<router-link to="/signup" rel="noopener nofollow" class=" signup-button is-gold strong">Learn More</router-link>
	            		<hr class="learnmore-underline" />
            		</div>
	        	</div>
        		<aside role="presentation" aria-hidden="true" class="ball-2 top-40 left-60 anim-diagonal-right bg-lightgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-20 left-70 anim-horizontal bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-30 left-70 anim-diagonal-left bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-20 left-40 anim-vertical anim-delay-1 bg-lightgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-30 left-30 anim-horizontal anim-delay-3 bg-gray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-75 left-60 anim-diagonal-left anim-delay-2 bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-50 left-20 anim-vertical anim-delay-3 bg-gold"></aside>

        	</div>

  </div>
</template>

<script>
export default {
  name: 'membershipDetails',
  data () {
    return {
    	heroImage: require("@/assets/images/membership-hero.jpg"),
    	heroPromoTitle: "",
    	memberships: [
	      	{
	      		type: 'artist',
	      		name: 'Artist',
	      		benefits: [
	      			'Free Mmbership',
	      			'3GB Cloud Storage',
	      			'Multilingual Support',
	      			'Full Email Hosting',
	      			'Messaging & Timeline',
	      			'Online Cv & Media Display',
	      			'Full Audition Board Access'
	      		]
	      	},
	      	{
	      		type: 'company',
	      		name: 'Company',
	      		benefits: [
	      			'Free Mmbership',
	      			'20GB Cloud Storage',
	      			'Multilingual Support',
	      			'Full Email Hosting',
	      			'Messaging & Timeline',
	      			'Company Account Features',
	      			'Audition Creator & Posting',
	      			'Budgeting & Marketing Assistant'
	      		]
	      	}
      	]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
@import '../../styles/landing';
@import '../../styles/bouncing-balls';

.memberships {
	background-color: white;
	text-align: center;
	padding: $body-padding-small;
	min-width: $app-min-width;
}

.membership-details {
	max-width: 400px;
	padding: 0px 25px;
	margin: 0px auto 200px;
}

.membership-heading {
	margin-top: 41px;
	margin-bottom: 55px;
}

.membership-circle {
	width: 138px;
	height: 138px;
	border-radius: 50%;
	margin: 25px auto;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.membership-details:nth-child(odd) .membership-circle {
	border: 9px solid $color-gold;
}

.membership-details:nth-child(even) .membership-circle {
	border: 9px solid $color-darkred;
}

.arrow-list {
	margin-bottom: 64px;
}

#membership-controls {
	justify-content: center;
}

@media all and (min-width: $bp-med) {

}

</style>

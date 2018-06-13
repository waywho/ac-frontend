<template>
  <div class="signup">
  	<div class="progress-bar" :style="progress" :class="progressPosition"></div>
  	<div class="signup-inner">
	  	<h1>Create Profile</h1>
		<div class="strong subheadline">Create your account, and start connecting today.</div>
		<keep-alive>
	  		<component :is="component" :newProfile="newProfile" v-on:takeStep="nextComponent($event.theStep)" v-on:updateData="updateProfile($event)" class="signup-content"></component>
	  	</keep-alive>
  	</div>
  </div>
</template>

<script>
import signUpCredentials from './signUpCredentials'
import signUpProfileType from './signUpProfileType'
import signUpDetails from './signUpDetails'
import signUpSocials from './signUpSocials'
import signUpPhotos from './signUpPhotos'
// import signUpConnections from './signUpConnections'
import signUpComplete from './signUpComplete'
import nextLastStep from '@/components/nextLastStep'

export default {
  name: 'signUp',
  components: {
  	'signUpCredentials': signUpCredentials,
   	'signUpProfileType': signUpProfileType,
   	'signUpDetails': signUpDetails,
   	'signUpSocials': signUpSocials,
   	'signUpPhotos': signUpPhotos,
   	// 'signUpConnections': signUpConnections,
   	'signUpComplete': signUpComplete,
   	'next-last-step': nextLastStep
  },
  data () {
    return {
      component: "signUpCredentials",
      newProfile: {},
      currentStep: 0,
      progressPosition: '',
      scrollPosition: 0,
      signUpSteps: [
      	'signUpCredentials',
  		 	'signUpProfileType',
  		 	'signUpDetails',
  		 	'signUpPhotos',
  		 	'signUpSocials',
  		 	'signUpConnections',
  		 	'signUpComplete'
      ]
    }
  },
  methods: {
  	updateProfile: function(object) {
      // console.log(object)
      this.newProfile = Object.assign({}, this.newProfile, object.newData);
      this.$store.dispatch('updateUserProfile', {userId: this.$store.getters.currentUser.id, data: object.newData})
      this.nextComponent(object.theStep);
    },
    nextComponent: function(step) {
      this.currentStep += step;
      this.component = this.signUpSteps[this.currentStep];
    },
    handleScroll: function(e) {
    	var currentScrollPosition = e.srcElement.scrollTop;
       if (currentScrollPosition > this.scrollPosition && currentScrollPosition > 100) {
         this.progressPosition = 'progress-stick';
       } else {
         this.progressPosition = '';
       }
      this.scrollPosition = currentScrollPosition;
    }
  },
  computed: {
  	progress: function() {
    	var progress = (this.currentStep + 1) * 14.3;
    	// console.log("width: " + progress + '%;')
    	return "width: " + progress + '%;';
    }
  },
  created() {
  	this.currentStep = this.signUpSteps.indexOf(this.component)
    document.body.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    document.body.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.signup {
	width: 100%;
	height: 100%;
	/*grid-area: main;*/
	text-align: center;
}

.signup-headline {
	margin-top: 130px;
}

.signup-inner {
	background: white;
	margin: 50px auto 130px;
	min-height: 600px;
	width: 63%;
	max-width: 792px;
	text-align: center;
	padding: 65px 8%;
}

.progress-bar {
	border: 5px solid $color-gold;
	position: fixed;
	top: 100px;
	transition: top 0.2s ease-in-out;
  -webkit-transition: top 0.2s ease-in-out;
}

.progress-stick {
	position: fixed;
	top: 0;
}

/*component css*/
.subheadline {
	margin-bottom: 65px;
}

.signup-input {
	margin-bottom: 34px;
}

.signup-content {
	text-align: left;
}

@media screen and (max-width: 1024px) {
	.signup-inner {
		background: white;
		margin: 50px auto;
		min-height: 600px;
		width: 90%;
		grid-area: main;
		text-align: center;
		padding: 65px 100px;
	}

}

@media screen and (max-width: 46rem) {
	.signup-inner {
		background: white;
		margin: 50px auto;
		min-height: 600px;
		width: 100%;
		grid-area: main;
		text-align: center;
		padding: 65px 25px;
	}

}
</style>

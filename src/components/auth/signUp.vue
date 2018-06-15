<template>
  <div class="signup">
  	<div class="signup-inner">
	  	<h1>Create Profile</h1>
		<div class="strong subheadline">Create your account, and start connecting today.</div>
    <progress-bar v-if="currentStep < 5" class="progress-bar-margin" :current-step="currentStep" :setup-steps="signUpSteps"></progress-bar>
    <next-last-step v-if="currentStep > 1 && currentStep < 5"  v-on:click.native="currentStep -= 1" :step="'last'" class="step-container"></next-last-step>
		<keep-alive>
	  		<component :is="currentComponent" :newProfile="newProfile" v-bind.sync="newProfile" class="signup-content" @successful-signup="currentStep += 1"></component>
	  	</keep-alive>

      <next-last-step v-if="currentStep > 0 && currentStep < 5" v-on:click.native="updateProfile" :step="'next'" class="step-container" :instruction="'Continue Profile Setup'"></next-last-step>
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
import stepMixin from '@/mixins/stepMixin'
import progressBar from '@/components/progressBar'

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
   	'next-last-step': nextLastStep,
    'progress-bar': progressBar
  },
  mixins: [stepMixin],
  data () {
    return {
      newProfile: {
        consent: true,
        email: "",
        type: "",
        id: "",
        avatarURL: null,
        coverURL: null,
        details: {
          name: "",
          role: "",
          city: "",
          postcode: "",
          provinceOrState: "",
          country: "",
          descriptions: ""
        },
        socials: {
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter: "",
          vimeo: "",
          youtube: ""
        }
      },
      currentStep: 2,
      progressPosition: '',
      scrollPosition: 0,
      signUpSteps: [
      	{component: 'signUpCredentials', fields: "email"},
  		 	{component: 'signUpProfileType', fields: "type"},
  		 	{component: 'signUpDetails', fields: "details"},
  		 	{component: 'signUpPhotos', fields: null},
  		 	{component: 'signUpSocials', fields: "socials"},
  		 	{component: 'signUpComplete', fields: null}
      ]
    }
  },
  computed: {
    currentComponent: function() {
      return this.signUpSteps[this.currentStep].component
    }
  },
  methods: {
  	updateProfile: function() {
      // console.log(object)
      let fieldName = this.signUpSteps[this.currentStep].fields
      
      if(fieldName !== null) {
        this.$store.dispatch('updateUserProfile', {userId: this.$store.getters.currentUser.id, data: {[fieldName]: this.newProfile[fieldName]}}).then(() => {
          this.currentStep += 1
        })
      } else {
        this.currentStep += 1
      }
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
  created() {
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
  padding: 65px 5%;
	min-height: 600px;
	width: 63%;
	max-width: 792px;
	text-align: center;
	
}

.progress-stick {
	position: fixed;
	top: 0;
}

/*component css*/
.subheadline {
	margin-bottom: 15px;
}

.progress-bar-margin {
  margin-bottom: 65px;
}

.signup-input {
	margin-bottom: 34px;
}

.signup-content {
	text-align: left;
}

.step-container {
  margin-top: 65px;
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

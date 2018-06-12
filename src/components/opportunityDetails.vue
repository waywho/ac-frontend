<template>
  <div class="row">
  	<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
  		<div v-for="(field, key, index) in opportunityFields" :class="['selection-text-vertical', { 'selection-text-active': currentField === key}]" @click="currentField = key"><i v-if=" currentField === key" class="fa fa-chevron-right" aria-hidden="true"></i> {{field.name}}</div>
  		
  	</div>
  	<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
      <transition name="fade" mode="out-in">
  		<div v-for="(field, key, index) in opportunityFields" :key="key" v-if="currentField === key">
  			
  			<label :for="key" v-if="currentField === key">Please enter the {{field.name}} below</label>
        <div v-if="key === 'payment_details'" class="small payment-type"><i class="fa fa-check-square is-golden " aria-hidden="true"></i> <span class="is-golden">{{opp.payment_type | capitalize}}</span> <span class="is-darkgray">opportunity</span></div>

	  		<input v-if="field.type !== 'textarea' && key !== 'audition_dates' && key !== 'age'" :id="key" :type="field.type"  v-model="opportunity[key]" :placeholder="field.name" @focus="showMessage = false"/>
	  		
	  		<div v-if="key === 'title'" class="form-inline company col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  			<label>Company</label>
	  			<input type="text" class="is-darkgray" v-model="opportunity.company">
	  		</div> 

	  		<div v-if="key === 'audition_dates'" :id="key" v-for="(audition, index) in opportunity.audition_dates" class="row audition_dates">
	  			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
	  				<input type="text" v-model="audition.location" placeholder="Audition location" />
	  			</div>
	  			<div class="col-xs-11 col-sm-11 col-md-5 col-lg-5">
	  				<input type="date" v-model="audition.from" />
	  			</div>
	  			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 row middle-xs center-xs is-darkgray">
	  				<i class="fa fa-minus button-fa small" aria-hidden="true" @click="removeDate(index)"></i>
	  			</div> 			
	  		</div>
	  		<div v-if="key === 'audition_dates'" class="is-darkgray add-date-button">
	  			<span class="text-button small" @click="addDate"><i class="fa fa-plus button-fa" aria-hidden="true"></i> Add date</span>
	  		</div>

	  		<textarea v-if="field.type === 'textarea'" :id="key" :type="field.type"  v-model="opportunity[key]" rows="12" :placeholder="field.name" />

        <div v-if="key === 'age'" class="checkbox form-element age-input" @click="noAge">
            <input id='remember' type='checkbox' v-model='no_age' />
            <label for='remember'><span></span>No Age Limit</label>
        </div>

	  		<vue-slider ref="slider" :show="currentField === key" v-if="key === 'age'" :id="key" v-model="opportunity[key]" :min="0" :max="100" :processStyle="{'backgroundColor': '#cd9d2b'}" :tooltipStyle="{'backgroundColor': '#cd9d2b', 'borderColor': '#cd9d2b', 'font-size': '12px', 'borderRadius': '50%', 'height': '28px', 'width': '28px'}" :tooltip-dir="'bottom'" class="slider-comp"></vue-slider>

	  		<span v-if="key === 'age' && !no_age" class="is-golden"><b>{{opportunity.age[0]}} - {{opportunity.age[1]}} years old</b></span> 
	  	  <div class="field-warning" v-if="currentField === 'title'"><success-warning-notice v-if="showMessage" :messaging="messaging"></success-warning-notice></div>
  		</div>
    </transition>

  	</div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import validateFormMixin from '../mixins/validateFormMixin'
import successWarningNotice from './successWarningNotice'

export default {
  name: 'opportunityDetails',
  components: {
  	vueSlider, successWarningNotice
  },
  mixins: [validateFormMixin],
  props: {
  	opp: {
  		type: Object,
  		required: false
  	}
  },
  data () {
    return {
      showMessage: false,
      messaging: {
        message: '',
        messageType: ''
      },
      no_age: false,
    	currentField: 'title',
      opportunity: {
	  		title: null,
	  		company: null,
	  		description: null,
	  		materials_required: null,
	  		age: [0, 50],
	  		deadline: null,
	  		audition_dates: [{
  				location: null,
  				from: null
  			}],
	  		payment_details: null,
	  		contact_information: null
  		},
  		opportunityFields: {
	  		title: {name: 'Title', type: 'text'},
	  		description: {name: 'Description', type: 'textarea'},
	  		materials_required: {name: 'Materials required', type: 'textarea'},
	  		age: {name: 'Age', type: 'number'},
	  		deadline: {name: 'Application deadline', type: 'date'},
	  		audition_dates: {name: 'Audition dates', type: 'array'},
	  		payment_details: {name: 'Payment details', type: 'textarea'},
	  		contact_information: {name: 'Contact information', type: 'textarea'}
  		}
    }
  },
  methods: {
  	addDate: function() {
  		this.opportunity.audition_dates.push({location: null, from: null});
  	},
  	removeDate: function(index) {
  		this.opportunity.audition_dates.splice(index, 1);
  	},
  	sendData: function() {
      if(this.requiredField(this.opportunity.title)) {
        this.opportunity['min_age'] = this.opportunity.age[0]
        this.opportunity['max_age'] = this.opportunity.age[1]
        this.opportunity['audition_dates_attributes'] = {}
        this.opportunity.audition_dates.forEach((date, index) => {
          this.opportunity.audition_dates_attributes[index] = date
        })
        this.$emit("send-data", this.opportunity)
      } else {
        this.messaging.message = 'Title is required'
        this.messaging.messageType = 'warning'
        this.showMessage = true
        this.currentField = 'title'
      }

      
    },
    noAge: function() {
      if(this.no_age) {
        this.opportunity.age = [0, 50]
      } else {
        this.opportunity.age = [null, null]
      }
      
    }
  },
  created() {
  	console.log(this.$store.getters.profile.details.name)
  	this.opportunity.company = this.$store.getters.profile.details.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.company {
	margin-top: 25px;
}

.audition_dates {
	margin-top: 10px;
}
.add-date-button {
	padding-top: 15px;
	text-align: right;
}
.slider-comp {
	margin-bottom: 50px;
}

.age-input {
  margin-bottom: 25px;
}

.payment-type {
  margin-bottom: 12px;
}

.field-warning {
  margin-top: 50px;
}

</style>

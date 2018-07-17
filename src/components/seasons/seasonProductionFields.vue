<template>
  <div class="">
  	<div class="row">
	  	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
	  		<label>Production Name</label>
	  		<input type="text" id="production-name" v-model="currentProduction.name" @focus="resetMessage" />
	  	</div>
	  	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
	  		<label style="display: inline;">Production Composer(s) </label><span class="smaller">(separated by ",")</span>
	  		<input type="text" id="produciton-composers" v-model="currentProduction.composers" />
	  	</div>
	  	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
		  	
		  	<input type="file" id="production-image" @change="onOneFilePicked($event, 'currentProduction')"/>
        <label for="production-image">Production Image</label>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
			<img v-if="currentProduction.imageURL" :src="currentProduction.imageURL" alt="uploaded image" />
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 input-row">
		  	<label>Production Description</label>
		  	<textarea type="text" id="production-description" v-model="currentProduction.description" rows="6"></textarea>
		</div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 input-row">
        <label>Porduction Location</label>
        <div class="checkbox form-element input-row">
            <input id='same-location' type='checkbox' v-model='currentProduction.sameLocation' @change="inputLocation" />
            <label for='same-location'><span></span>All productions at same location</label>
        </div>
        <input v-if="currentProduction.sameLocation" type="text" id="production-location" v-model="productionLocation" @input="fillLocations" placeholder="production location" />
    </div>
	</div>
	<div class="row">
	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		  	<label>Production Date</label>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		  	<label>Production Time</label>
	</div>
	</div>
	<div v-for="(dates, index) in currentProduction.dates" :key="index + 'dates'" class="row">
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
		  	<input type="date" :id="'production-date' + index" v-model="dates.date" :min="season.from" />
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row inline-fields">
		  	<input type="time" :id="'produciton-time' + index" v-model="dates.time" />
		  	<i class="fa fa-minus button-fa is-darkgray small" aria-hidden="true" @click="removeDate(index)"></i>
		</div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 input-row inline-fields">
        <input type="text" :id="'produciton-location' + index" placeholder="production location" v-model="dates.location" />
    </div>
	</div>
	<div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row"><span class="small add-button" @click="addDate('casts')">Add Date</span></div>

	<div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12">
		<h5>Creatives</h5>
	</div>
	<div class="row">
		<div v-for="(creative, index) in currentProduction.creatives" :key="index + 'creatives'" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
			<input v-if="creative" type="text" :id="'production-creative-role' + index" v-model="creative.role" placeholder="creative role" />
			<div class="inline-fields">
				<input type="text" :id="'production-creative-name' + index" v-model="creative.name" placeholder="name" />
				<i class="fa fa-minus button-fa is-darkgray small" aria-hidden="true" @click="removeRole(index, 'creatives')"></i>
			</div>
		</div>

	</div>
	<div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row"><span class="small add-button" @click="addField('creatives')">Add Field</span></div>
	<div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6">
		<h5>Casts</h5>
	</div>
	<div v-for="(cast, index) in currentProduction.casts" :key="index + 'casts'" class="row">
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row">
			<input type="text" :id="'production-cast-role' + index" v-model="cast.role" placeholder="role" />
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row inline-fields">
			<input type="text" :id="'production-cast-name' + index" v-model="cast.name" placeholder="name" />
			<i class="fa fa-minus button-fa is-darkgray small" aria-hidden="true" @click="removeRole(index, 'casts')"></i>
		</div>
	</div>
	
	<div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6 input-row"><span class="small add-button" @click="addField('casts')">Add Field</span></div>

	<div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 input-row" v-show="showMessage">
		  <success-warning-notice :messaging="messaging"></success-warning-notice>
      </div>
    </div>
    <br />
	
  	<button class="button-right" v-if="productionMode === 'new'" @click="addProduction">Add Production to Season <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    <button class="button-right" v-if="productionMode === 'edit'" @click="productionEditUpdate">Update Production</button>
    <span class="text-button button-right button-right-margin cancel-button" @click="cancelProduction">Cancel</span>
  </div>
</template>

<script>
import profileImagesMixin from '@/mixins/profileImagesMixin'
import validateFormMixin from '@/mixins/validateFormMixin'
import successWarningNotice from '@/components/successWarningNotice'

export default {
  name: 'seasonProduction',
  mixins: [profileImagesMixin, validateFormMixin],
  props: {
  	production: {
  		type: Object,
  		required: false
  	},
  	season: {
  		type: Object,
  		required: false
  	},
    currentSeasonId: String,
  	productionKey: String,
    productionMode: String
  },
  components: {
  	successWarningNotice
  },
  data () {
    return {
    	showMessage: false,
    	messaging: {
    		message: null,
    		messageType: null
    	},
    	productionTime: {
    		date: null,
    		time: null
    	},
      productionLocation: null,
     	currentProduction: {
     		name: null,
     		composers: "",
     		imageURL: null,
     		imageFile: null,
     		description: null,
        sameLocation: true,
     		dates: [{
     			date: null,
     			time: null,
          location: null
     		}],
     		creatives: [{
     			role: "director",
     			name: null
     		}, {
     			role: "conductor",
     			name: null
     		}, {
     			role: "designer",
     			name: null
     		}, {
     			role: null,
     			name: null
     		}],
     		casts: [{
     			role: null,
     			name: null
     		}]
     	}
    }
  },
  methods: {
    inputLocation: function () {
      if(this.currentProduction.sameLocation) {
        this.currentProduction.dates.forEach(date => {
          date.location = this.productionLocation
        })
      } else {
        this.currentProduction.dates.forEach(date => {
          date.location = null
        })
      }
    },
    fillLocations: function () {
      if(this.currentProduction.sameLocation) {
        this.currentProduction.dates.forEach(date => {
          date.location = this.productionLocation
        })
      }
    },
  	resetMessage: function () {
  		this.messaging.message = null
  		this.messaging.messageType = null
  		this.showMessage = false
  	},
  	addDate: function() {
      if(this.currentProduction.sameLocation) {
        this.currentProduction.dates.push({date: null, time: null, location: this.productionLocation})
      } else {
        this.currentProduction.dates.push({date: null, time: null, location: null})
      }
  	},
  	removeDate: function(index) {
  		this.currentProduction.dates.splice(index, 1)
  	},
  	addField: function(fieldsName) {
  		this.currentProduction[fieldsName].push({role: null, name: null})
  	},
  	addProduction: function() {
  		if(this.requiredField(this.currentProduction.name)) {
        let production = this.currentProduction
  			if(production.composers) {
  			 production.composers = production.composers.split(',')
	  		}

	  		let creatives = this.currentProduction.creatives.forEach(creative => {
          if(creative !== null & creative !== undefined) {
            if(creative.name !== null && creative.name !== undefined) {
              return {role: creative.role.toLowerCase(), name: creative.name.toLowerCase()}
            }
          }
	  			
	  		})

	  		let casts = this.currentProduction.casts.forEach(cast => {
          if(cast !== null && cast !== undefined) {
            if(cast.role !== null && cast.role !== undefined && cast.name !== null && cast.name !== undefined) {
              return {role: cast.role.toLowerCase(), name: cast.name.toLowerCase()}
            }
          }
	  			
	  		})

        // console.log('creatives', creatives)
        // console.log('casts', casts)
        if(creatives !== undefined && creatives.length > 0) {
          production.creatives = creatives
        }

        if(casts !== undefined && casts.length > 0) {
          production.casts = casts
        }
 	  		this.$emit('production-add', production)
  		} else {
  			this.messaging.message = "production name is required"
  			this.messaging.messageType = 'warning'
  			this.showMessage = true
  		}
  		
  	},
  	removeRole: function(index, fields) {
  		this.currentProduction[fields].splice(index, 1);
  	},
  	productionUpdate: function() {
  		this.$emit('production-update', {key: this.productionKey, production: this.currentProduction})
  	},
    productionEditUpdate: function() {
      this.$emit('production-edit-update', {key: this.productionKey, production: this.currentProduction})
    },
  	cancelProduction: function() {
  		this.$emit('cancel-production')
  	}
  },
  created() {
  		if(this.production) {
  			this.currentProduction = this.production
  		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.input-row {
	margin-bottom: 20px;
}

.add-button {
	cursor: pointer;
	text-align: right;
}

.add-button:hover {
	color: $color-gold;
}

.button-right {
  float: right;
}

.inline-fields {
	display: flex;
	align-items: center;
	justify-content: center;
}

.inline-fields .button-fa {
	margin-left: 10px;
}

.cancel-button {
  min-height: 30px;
  padding: 3px 10px;
  line-height: 24px;
}

</style>

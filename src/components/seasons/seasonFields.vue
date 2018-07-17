<template>
  <div class="">
  		<h5>Season Info</h5>
		<p>Please enter all fields below. All information will be stored and can be edited at any time. Season will be shown from publish date to the end of the season.</p>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 season-inline-label">
		    <input type="text" placeholder="season name (eg. Autumn 2019 or 2019/2020)" @focus="resetMessaging" v-model="season.name" />
      </div>
    </div>
		<div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 form-inline">
    			<label for="season-from" class="season-inline-label">from</label>
    			<input id="season-from" type="date"  @focus="resetMessaging" v-model="season.from" />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 form-inline">
    			<label for="season-to" class="season-inline-label">to</label>
    			<input id="season-to" type="date" :min="season.from" @focus="resetMessaging" v-model="season.to" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 form-inline">
  			<label for="season-publish" class="season-inline-label">publish</label>
  			<input id="season-publish" type="date" @focus="resetMessaging" v-model="season.published_at" />  <span class="is-darkgray small"><i>(date to display season on your profile)</i></span>
      </div>
  	</div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 season-inline-label">
		    <success-warning-notice v-show="showMessage" :messaging="messaging"></success-warning-notice>
      </div>
    </div>
    <br />
    
    <button class="button-right" v-if="mode === 'edit'" @click="updateSeason">Update Season Info</button>
		<button class="button-right button-right-margin" @click="saveSeason">Save & Add Productions <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    <span class="button-right text-button button-right-margin cancel-button" v-if="mode === 'edit'" @click="reviewSeason">Review Season </span>
  </div>
</template>

<script>
import validateFormMixin from '@/mixins/validateFormMixin'
import successWarningNotice from '@/components/successWarningNotice'

export default {
  name: 'seasonSection',
  props: {
    season: {
      type: Object,
      required: false
    },
    mode: String
  },
  mixins: [validateFormMixin],
  components: {
    successWarningNotice
  },
  data () {
    return {
      showMessage: false,
      messaging: {
        message: null,
        messageType: null
      }
    }
  },
  methods: {
    resetMessaging: function() {
      this.showMessage = false
      this.messaging.message = null
      this.messaging.messageType = null
    },
  	saveSeason: function() {
      if(this.anyEmpty(this.season)) {
        this.messaging.messageType = 'warning'
        this.messaging.message = 'all fields are required!'
        this.showMessage = true
      } else {
        this.$emit('season-save')
      }
  	},
    updateSeason: function() {
      if(this.anyEmpty(this.season)) {
        this.messaging.messageType = 'warning'
        this.messaging.message = 'all fields are required!'
        this.showMessage = true
      } else {
        this.$emit('season-update')
      }
    },
    reviewSeason: function() {
      this.$emit('season-review')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.season-inline-label {
	text-align: left;
	margin: 25px 0px;
  width: 13%;
}

#season-from, #season-to, #season-publish {
  width: 85%;
}

.button-right {
  float: right;
}

.cancel-button {
  min-height: 30px;
  padding: 3px 10px;
  line-height: 24px;
}
</style>

<template>
  <modal @close="$emit('close')" class="production-details">

  	<div slot="header" class="production-header">
  		<span class="is-gold leading-text">{{season.name}}</span><br />
  		<h2>Company Season</h2>
  		<i class="fa fa-times large is-darkgray close-button" aria-hidden="true" @click="$emit('close')"></i>
  	</div>

  	<div slot="body" class="row">
 		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
 			<div class="production-block">
	 			<div class="production-image">
	              <img :src="production.imageURL | imageProcess('season')" />
	            </div>
	            <div class="production-title">
	              <h3>{{production.name}}</h3>
	              <span class="is-gold"><b>{{production.dates[0].date | moment("MMMM")}}</b></span>
	            </div>
        	</div>

        	<p class="small">
        		{{production.description}}
        	</p>

        	<h4>Cast and Creative</h4>
        	<div class="row small">
        		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 creative">
        			
        			<div v-for="(creative, index) in production.creatives" :key="index" class="row">
        				<div v-if="creative" class="col-xs-6"><b>{{creative.role | capitalize}}</b></div> <div class="col-xs-6">{{creative.name | capitalize}}</div></div>
        			
        		</div>
        		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 cast">
        		
        			<div v-for="(cast, index) in production.casts" :key="index" class="row">
        				<div v-if="cast" class="col-xs-6"><b>{{cast.role | capitalize}}</b></div> <div class="col-xs-6">{{cast.name | capitalize}}</div></div>
        			
        		</div>
        	</div>

 		</div>
 		<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" v-if="production.sameLocation">
 			<div>
 				<h3>Where</h3>
 				<p>{{production.dates[0].location}}</p>
 			</div>
 			<div>
 				<h3>When</h3>
 				<ul class="non-list small">
 					<li v-for="(date, index) in production.dates">{{date.date | moment("ddd")}} / <b>{{date.date | moment("MMM")}}</b> {{date.date | moment("D")}}, {{date.date | moment("YYYY")}} {{date.time | moment("h:mm a")}}</li>
 				</ul>
 			</div>
 		</div>
 		<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" v-if="!production.sameLocation">
 			<div>
 				<h3>When & Where</h3>
 				<ul class="non-list small list-margin">
 					<li v-for="(date, index) in production.dates">{{date.date | moment("ddd")}} / <b>{{date.date | moment("MMM")}}</b> {{date.date | moment("D")}}, {{date.date | moment("YYYY")}} {{date.time | moment("h:mm a")}}<br />
 						<span>{{date.location}}</span>
 					</li>
 				</ul>
 			</div>
 		</div>
  	</div>

  	<div slot="footer"></div>
  </modal>
</template>

<script>
import modal from './modal'
export default {
  name: 'productionDetails',
  props: {
  	production: Object,
  	season: Object
  },
  components: {
  	modal
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.production-header {
	text-align: left;
}

.production-block {
	display: flex;
}

.production-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: inline-block
}

.production-image img {
  height: 100%;
  width: auto;
}

.production-title {
  width: 100px;
  margin-left: 25px;
}

.production-title h3 {
  margin-top: 0px;
  margin-bottom: 10px;
}

.list-margin {
	margin-bottom: 15px;
}


@media screen and (max-width: 48rem) {
	.creative {
		margin-bottom: 50px;
	}
}
</style>

<template>
  <ul class="progress-bar" >
      <li v-for="(step, index) in setupSteps" v-if="index !== 3" :class="[{active: currentStep === index}, 'small']"><span>{{index + 1}}</span></li>
  </ul>
</template>

<script>
export default {
  name: 'progressBar',
  props: {
  	setupSteps: Array,
  	currentStep: Number
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
ul.progress-bar {
  margin-left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

li {
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: 2em;
  border-radius: 1em;
  background: $color-gold;
  margin: 0em 66px 1em 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

li span {
  text-align: center;
  position: absolute;
  top: 1.2em;
  left: 0.25em;
  color: $color-darkgray;
}

li:first-child {
  margin-left: 0px;
}

li:last-child {
	margin-right: 0px;
}

li::before {
  content: '';
  position: absolute;
  // top: .4em;
  left: -5.7em;
  width: 6em;
  height: .2em;
  background: $color-gold;
  z-index: 1;
}


li:first-child::before {
  display: none;
}

.active {
  background: $color-gold;
  width: 1.5em;
  height: 1.5em;
  // top: 0.3em;

}

.active::before {
  top: .6em;
}

.active span {
  color: $color-gold;
  top: 1.4em;
  left: 0.4em;
}

.active ~ li {
  background: $color-lightgray;
}

.active ~ li::before {
  background: $color-lightgray;
}
@media screen and (max-width: 46rem) {

	li {
	  margin: 0em 1.7em 1em 1em;
	}


	li::before {
	  left: -2.7em;
	  width: 3em;
	}


}
</style>

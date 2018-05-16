<template>
  <modal @close="$emit('close')">
  		<h3 slot='header' class='portfolio-header'>Add Season</h3>
		<hr slot='header' class='portfolio-line' />

		<div slot='body'>
			<button>Add Season</button>
			<h5>Season Info</h5>
			<p>Please enter all fields below. All information will be stored and can be edited at any time.</p>
			<input type="text" placeholder="season name" v-model="seasonName" />
			<br />
			<button class="">Add Production</button>

			

		</div>
		<div slot='footer'></div>
  </modal>
</template>

<script>
import modal from './modal';

export default {
  name: 'seasonForm',
  components: {
  	'modal': modal
  },
  data () {
    return {
    	seasonName: null,
  		productions: [],
      seasons: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

</style>

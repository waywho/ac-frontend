<template>
	<div class="">
		<p><span>{{ profileDetails.city }}, {{ profileDetails.province }} </span><br class="xs-break" /><span class="is-golden">{{ profileDetails.connectionStrength }}% {{ profileDetails.connectionLevel | to-uppercase }}</span></p>
		<p>{{ profileDetails.type }} Opera Company based in {{ profileDetails.country }} |<br class="xs-break" /> Member of {{ profileDetails.memberships.join(", ") }}</p>
	</div>
</template>

<script>
export default {
  name: 'comapnyDetails',
  props: {
  	profileDetails: Object
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

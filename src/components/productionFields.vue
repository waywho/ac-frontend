<template>
  <div class="">

  </div>
</template>

<script>
export default {
  name: 'productionFields',
  data () {
    return {
      	productioName: null,
      	productionComposer: null,
      	productionImage: null,
      	productionDescription: null,
      	productionDates: [],
      	creatives: [
      		{
	      		position: 'director',
	      		name: null
	      	}, {
	      		position: 'conductor',
	      		name: null
	      	}, {
	      		position: 'choreographer',
	      		name: null
	      	}, {
	      		position: 'designer',
	      		name: null
	      	}
	  	],
	  	casts: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

</style>

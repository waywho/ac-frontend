<template>
  <div class="">
  	<h3>Account Type</h3>
		<div v-for="profileType in profileTypes" :class="[currentType === profileType.name ? 'selected' : '',  'inputbox-container']" v-on:click="typeSelect(profileType.name)">
			
      <div class="checkbox-group">
				<input :id="profileType.name" type='radio' :value="profileType.name" v-model='currentType' />
	     	<label :for="profileType.name" class="medium">{{profileType.name | capitalize }}</label>
      </div>
      <span class="small color-lightgray option-hint">{{profileType.description}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'signupProfileType',
  props: {
    type: String
  },
  data () {
    return {
      currentType: "",
      profileTypes: [
      	{
      		name: "company",
      		description: "as an opera company, we offer you company specific tools to help you succeed."
      	},
      	{
      		name: "artist",
      		description: "as an artist, you can connect with opera companies and showcase yourself."
      	}
      ]
    }
  },
  methods:{
    typeSelect: function(typeSelected) {
      this.currentType = typeSelected
      this.$emit('update:type', typeSelected)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.subheadline {
	margin-bottom: 65px;
}


.signup-input {
	margin-top: 15px;
	margin-bottom: 34px;
}


.step-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 65px auto 0px;
}

</style>

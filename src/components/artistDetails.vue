<template>
	<div class="">
		<p><span>{{ profileDetails.city }}, {{ profileDetails.province }} </span><br class="xs-break" /><span class="is-golden" v-if="dataAvailable(profileDetails.connectionStrength)">{{ profileDetails.connectionStrength }}% {{ profileDetails.connectionLevel | to-uppercase }}</span></p>
		<p>{{ profileDetails.voiceType }} based in {{ profileDetails.country }} <br class="xs-break" /> <span v-if="dataAvailable(profileDetails.memberships)">| Member of {{ profileDetails.memberships.join(", ") }}</span></p>
	</div>
</template>

<script>
export default {
  name: 'artistDetails',
  props: {
  	profileDetails: {}
  },
  data () {
    return {
      
    }
  },
  computed: {
    membershipList: function () {
        if (this.profileDetails.memberships !== null && this.profileDetails.memberships !== undefined) {
          return profileDetails.memberships.join(", ") 
        }
    }
  },
  methods: {
    dataAvailable: function (value) {
      if (value !== null && value !== undefined) {
        return true
      } else {
        false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
	<div class="">

    <p v-if="profileType === 'company'">{{ profileDetails.role | capitalize }} based in {{ profileDetails.country }} |<br class="xs-break" /> <span v-if="dataAvailable(profileDetails.memberships)">| Member of {{ profileDetails.memberships.join(", ") }}</span></p>

		<p v-if="profileType === 'artist'">{{ profileDetails.role | capitalize }} based in {{ profileDetails.city }}, {{ profileDetails.province }}  {{ profileDetails.country }} <br class="xs-break" /> <span v-if="dataAvailable(profileDetails.memberships)">| Member of {{ profileDetails.memberships.join(", ") }}</span></p>

    <p>{{profileDetails.descriptions}}</p>
	</div>
</template>

<script>
export default {
  name: 'artistDetails',
  props: {
  	profileDetails: Object,
    profileType: String,
    connectionLevel: Object
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
  },
  created() {
    // console.log(this.profileDetails)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

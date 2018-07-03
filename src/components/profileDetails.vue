<template>
	<div class="is-midgray">

    <p v-if="profileType === 'company'">{{ profileDetails.role | capitalize }} based in {{ profileDetails.country }} |<br class="xs-break" /> <span v-if="dataAvailable(profileDetails.memberships)">| Member of {{ profileDetails.memberships.join(", ") }}</span></p>

		<p v-if="profileType === 'artist'">{{ profileDetails.role | capitalize }} based in {{ profileDetails.city }}, {{ profileDetails.province }}  {{ profileDetails.country }} <br class="xs-break" /> <span v-if="dataAvailable(profileDetails.memberships)">| Member of {{ profileDetails.memberships.join(", ") }}</span></p>

    <p class="descriptions">{{profileDetails.descriptions}}</p>
    <div v-for="(social, key) in profileSocials" :key="key" v-if="social" class="social-icon">
      <a :href="social" rel="nofollow" target="_blank" alt="profile social network links">
        <i :class="['fa', 'fa-' + key, 'is-midgray']" aria-hidden="true"></i>
      </a>
    </div>
	</div>
</template>

<script>
export default {
  name: 'artistDetails',
  props: {
    profileSocials: Object,
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

.descriptions {
  width: 90%;
  margin: auto auto;
  max-width: 700px;
}

.social-icon {
  font-size: 1.25rem;
  display: inline-block;
  margin: 1rem 1rem 0px;
}

</style>

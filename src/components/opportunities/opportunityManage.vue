<template>
  <div class="opportunity-manage">
    <h2>Opportunity</h2>
    <span class="is-gold"><b>Manage Your Opportunities</b></span>
      <opportunity-back @click.native="$emit('back-start')"></opportunity-back>
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <h4>My Auditions</h4>
          <div class="audition-window">
            <div v-for="opportunity in opportunities" class="audition-tile" v-on:click="currentOpportunity = opportunity">
              <div class="audition-date is-darkgray" >
                <div class="strong large">{{opportunity.created_at | moment("DD")}}</div>
                <div class="smaller">{{opportunity.created_at | moment("MMM")}}</div>
              </div>
              <div class="audition-title is-darkgray small">
                <div class="strong">{{opportunity.title}}</div>
                <div>{{opportunity.company}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
          <h4>Candidates</h4>
            <div class="row">
              <div v-for="(candidate, index) in currentOpportunity.profiles" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 candidate-tile small">               
                <div class="avatar avatar-small applicant-avatar">
                    <img :src="candidate.avatar_url | imageProcess('avatar')" />
                  </div>
                <div class="candidate-details small">
                  <div class="candidate-name medium">{{candidate.name}}</div>
                    <div class="smaller">{{candidate.role}}</div>
                </div>
                  <a target="_blank" :href="candidate.profile_url" alt="profile url">
                    <span class="smaller"><i class="fa fa-chevron-right" aria-hidden="true"></i> View Profile</span>
                  </a>
              </div>
              <div class="candidate-tile" style="visibility: hidden;"></div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import oppAxios from '@/axios/axios-opportunities.js';
import opportunityBack from './opportunityBack';

export default {
  name: 'opportunityManage',
  components: {
    'opportunity-back': opportunityBack
  },
  data () {
    return {
      opportunities: null,
      currentOpportunity: {},
      auditionee: "",
      auditionTime: '',
      auditioneeIndex: null,
    }
  },
  methods: {
    
  },
  created() {
    oppAxios.get(`/user/${this.$store.getters.currentUser.id}/opportunities.json`, {
          params: {
            idToken: this.$store.getters.currentUser.idToken,
            page: 1
          }
        }).then(res => {
          console.log(res)
          this.opportunities = res.data
          // this.loading = false
        }).catch(error => {
          console.log(error)
          // this.loading = false
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

.opportunity-manage {
  // padding-left: 100px;
  // padding-right: 25px;
}

.audition-window {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 295px;
}

.audition-tile {
  background-color: #f7f4f4;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.audition-date {
  flex-basis: 10%;
  padding: 12px 14px;
  margin-right: 10px;
  text-align: center;
}

.audition-title {
  flex-basis: 90%;
  flex-grow: 1;
  min-height: 70px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.audition-tile:hover {
  background-color: #cd9d2b;
  color: white;
}

.audition-tile:hover .audition-date, .audition-tile:hover .audition-title {
  color: white;
}

.audition-datetime {
  width: 700px;
}

.selected-auditionee {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-basis: 70%;
}


@media screen and (max-width: 46rem) {
  .opportunity-manage {
    // padding-left: 28px;
  }


}
</style>

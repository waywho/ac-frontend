<template>
  <div class="row between-sm between-xs">
    <div class="col-sm-12 col-xs-12 row last-step">
      <next-last-step v-on:click.native="takeStep('auditionCreator-stepOne', newAudition)" :step="'last'"></next-last-step>
      <span class="strong step-label">Step 2 of 2</span>
    </div>  
    <div class="col-sm-9 col-xs-12">

      <h3>Select Audition Type</h3>
      <div class='form-checkboxes'>
        <div v-for="(aud, index) in audTypes"class="inline-checkbox">
          <input :id='aud' type='radio' :value='aud' v-model='newAudition.type' />
          <label :for='aud'><span></span>{{aud | capitalize}}</label>
        </div>
      </div>

      <h3>Select Voice Type</h3>

      <div class='form-checkboxes'>
        <div v-for="(v, index) in voiceTypes" class="inline-checkbox">
          <input :id='v' type='checkbox' :value="v" :key="index" v-model='newAudition.voiceType' />
          <label :for="v"><span></span>{{v | capitalize}}</label>
        </div>

      </div>

      <h3>Select Opportunity Type</h3>
      <div class='form-checkboxes'>
        <div v-for="opp in oppTypes" class="inline-checkbox">
          <input :id='opp' type='radio' value='opp' v-model='newAudition.opportunityType' />
          <label :for='opp'><span></span>{{opp | capitalize}}</label>
        </div>
      </div>
      <h3>Description</h3>
      <textarea placeholder="Description" id="description"></textarea>
    
    </div>

    <div class="col-sm-3 col-xs-12">
      <div class="next-step">
        <div>
          <span class="strong">Publish Audition</span>
          <div class="smaller">Go to the planner to schedule singers.</div>
          <next-last-step v-on:click.native="saveData('company-auditionPlanner', newAudition)" :step="'next'"></next-last-step>
        </div>
      </div>
    </div>    

  </div>
</template>

<script>
import nextLastStep from './nextLastStep'
import stepMixin from '../mixins/stepMixin';

export default {
  name: 'auditionCreatorStepTwo',
  components: {
    'next-last-step': nextLastStep
  }, 
  props: {

  },
  data () {
    return {
      newAudition: {
        voiceType: []
      },
      audTypes: ['general', 'specific', 'private', 'young artist program'],
      voiceTypes: ['soprano', 'mezz soprano', 'tenor', 'baritone', 'bass', 'counter tenor'],
      oppTypes: ['paid/contract', 'honorarium/expenses', 'pay to sing', 'training program']
    }
  },
  methods: {
  },
  mixins: [stepMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.next-step {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
}

.step-label {
  display: inline-flex;
}

.last-step {
  align-items: center;
}

.next-step:hover > .icon-container, .next-step:hover .icon,
  .last-step:hover > .icon-container, .last-step:hover .icon {
  background-color: #cd9d2b;
  color: white;
}

.last-step {
  cursor: pointer;
}

#description {
  height: 150px;
}
</style>

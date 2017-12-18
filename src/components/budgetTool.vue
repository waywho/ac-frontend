<template>
  <div class="budget-planner tool-panel-paddings">
	  	<h2>Budget Planner</h2>
	  	<div class="budget-line">
	  		<div v-on:click="component = 'company-budgetDisplay'" v-if="component ==='company-budgetTopline'" class="toggle strong small">Company Budget</div>
	  		<div v-on:click="component = 'company-budgetTopline'" v-if="component ==='company-budgetDisplay'" class="toggle strong small">Budget Display</div>

	  		<span v-if="component ==='company-budgetDisplay'" class="strong small is-darkgray">{{companyBudget.total}}</span>

	  	</div>


        <keep-alive>
        	<component :is="component" :company-budget="companyBudget" v-on:budgetUpdate="updateBudget($event)" v-on:accountUpdate="updateAccount($event)"></component>
    	</keep-alive>

  </div>
</template>

<script>
import budgetTopline from './budgetTopline'
import budgetDisplay from './budgetDisplay'


export default {
  name: 'budgetTool',
  components: {
  	'company-budgetTopline': budgetTopline,
  	'company-budgetDisplay': budgetDisplay
  },
  data () {
    return {
    	component: "company-budgetTopline", //show display     
    	companyBudget: {
    		total: 0,
    		accounts: {},

    	}
    }
  },
  methods: {
  	updateBudget(object) {
  		this.companyBudget = {}
  		this.companyBudget = object;
  		console.log('updated budget:')
  		console.log(this.companyBudget);
  		this.component = 'company-budgetDisplay';
  	},
  	updateAccount(object) {
  		Object.assign(this.companyBudget.accounts, object)
  	}
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.budget-planner {
	padding-left: 100px;
}

.budget-line {
	display: flex;
	justify-content: space-between;
	margin-bottom: 23px;
}

.planner {
	width: 100%;
}

.toggle {
	padding: 3px;
	border-radius: 15px;
}

.toggle:hover {
	background-color: #cd9d2b;
	cursor: pointer;
	color: white;
	padding: 3px;
}
</style>

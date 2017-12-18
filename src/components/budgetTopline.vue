<template>
  <div class="full-budget text-center">

  	<span class="smaller">Plan & balance your company budget with this simple calculator and tracking system. All numerical values must be entered for fields 
	required and assigned. All Entries must be completed for accurate budget to be generated</span>

  	<div class="budget-line">
		<div class="item line-item medium">Full Company Budget</div>
  		<div class="item amount medium">{{currentBudgetTotal}}</div>
  		<br />
	</div>

	<span class="smaller">Enter in all related budget areas. For all division of budget All numerical values must be entered for fields required and assigned.</span>
	<br />
	<br />
	<span class="medium">Budget Allocation</span>

		<company-budgetInput v-for="(n, key, index) in budgetItems" :key="key" :id="key" :input-name="'Budget Item'" v-on:inputValue="sumAccounts($event)"></company-budgetInput>

 		<button @click="updateBudget()">Create</button>
  </div>
</template>

<script>
import budgetInput from './budgetInput'

export default {
  name: 'budgetTopline',
  components: {
  	'company-budgetInput': budgetInput
  },
  props: {
  	companyBudget: Object
  },
  data () {
    return {
    	currentBudgetTotal: this.companyBudget.total,
    	budgetAccounts: {}
    }
  },
  methods: {
  	sumAccounts: function(object) {
  		Object.assign(this.budgetAccounts, object);
  		console.log('Summing Budget');
  		// console.log(this.budgetAccounts);
		var total = 0
		// for (var i = 0; i < this.budgetAccounts.length; i++) {
		// 	console.log(this.budgetAccounts[i])
		// 	total += this.budgetAccounts[i]['amount']
		// }

		for (const prop in this.budgetAccounts) {
			// console.log(this.budgetAccounts[prop]['amount']);
			total += this.budgetAccounts[prop]['amount']
		}

		// const total = this.budgetAccounts.reduce(function(a, b) {
		// 	return a + b;
		// })
		this.currentBudgetTotal =  total
 
  		// this.currentBudgetTotal += Number(value);
  	},
  	updateBudget() {
  		const budgetSheet = {}
  		budgetSheet['total'] = this.currentBudgetTotal;
  		budgetSheet['accounts'] = this.budgetAccounts;
  		console.log('budgetsheet')
  		console.log('budgetsheet')
      	this.$emit('budgetUpdate', budgetSheet)
      }
  }, 
  computed: {
  	budgetItems() {
  		if (Object.keys(this.companyBudget.accounts).length === 0) {
  			const lineItemInputs = {}
  			for(var i = 0; i < 3; i++) {
  				lineItemInputs['account' + i] = {"description":"", "amount": null}
  			}
  			return lineItemInputs
  		} else {
  			return this.companyBudget.accounts
  		}
  	}
  },
  created() {
  	console.log('budget at topline')
  	console.log(this.companyBudget) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.budget-line {
	display: block;
	max-width: 306px;
	width: 100%;
	height: 45px;
	margin: 10px auto;
	position: relative;
}

.line-item {
	z-index: 1;
	background-color: #cd9d2b;
	color: white;
	position: absolute;
	left: 0px;
	text-align: left;
	padding: 0px 0px 2px 12px;
}

.amount {
	position: absolute;
	left: 42%;
	text-align: right;
	padding: 0px 26px 2px 0px;
}

.item {
	border: 2px solid #cd9d2b;
	border-radius: 21px;
	width: 57%;
	height: 21px;
	font-size: 13px;
}

</style>

<template>
  <div class="budget-display">
  	<div class="selection budget-accounts">
   		<span v-for="(item, key) in companyBudget.accounts"  class="selection-text-horizontal col-sm-2 col-xs small" v-on:click.prevent="getAccount(item, key)">{{item.description}}</span>
	 </div>
    <div class="panels">
	  	<div class="panel-left">
	  		<chartjs-doughnut :height="320" :datalabe="null" :labels="budgetChartData.labels" :data="budgetChartData.data" :option="chartOption" :backgroundcolor="budgetChartData.backgroundColor" :bind="true"></chartjs-doughnut>
	  	</div>
	  	<div class="panel">
	  		<div class="budget-line">
	  			<span class="strong small budget-category">{{currentDisplayAccount.description}}</span><span class="strong small is-darkgray">${{currentDisplayAccount.amount}}</span>
	  		</div>
	  		<div class="budget-line">
	  			<span class="smaller">Budget Spent to Date</span>
	  			<div class="progress-border">
	  				<div class="progress smaller" :style="'width:' + percentSpent + '%'">{{percentSpent}}%</div>
	  			</div>
	  			
	  		</div>

	  		<div class="line-items budget-line">
	  			<span class="strong small">Field & Entry</span>
	  			<span class="smaller">Add fields to budget planner</span>
	  			<company-budgetInput v-for="(item, index) in lineItems" :key="item.id" :id="item.id" :input-name="'Budget Item'" :text-value="item.description" :amount-value="item.amount" :color="budgetChartData.backgroundColor[index]" v-on:inputValue="addBudgetLines($event)"></company-budgetInput>
	  		</div>
	  		<div>
	  			<button v-on:click="saveAccount()" class="smaller">Save</button>

	  			
	  		</div>
	  	</div>
  	</div>
  </div>
</template>

<script>
import budgetInput from './budgetInput'

export default {
  name: 'budgetDisplay',
  components: {
  	'company-budgetInput': budgetInput
  },
  props: {
  	companyBudget: Object
  },
  data () {
    return {
  		currentDisplayAccount: {
  			id: "",
  			description:"",
  			amount: 0,
  			lineItems: []
  		},
  		lineItemInputs: {},
  		percentSpent: "",
  		budgetChartData: {
  			labels: [],
  			data: [],
			backgroundColor: [
				'rgba(247, 149, 33, 1)',
            	'rgba(249, 172, 83, 1)',
            	'rgba(251, 196, 132, 1)',
            	'rgba(255, 198, 26, 1)',
            	'rgba(255, 210, 77, 1)'
				]
  		},
  		chartOption: {
  			legend: {
  				display: true,
  				position: 'bottom'
  			}
  		}
    }
  },
  computed: {
  	lineItems() {
  		if (this.currentDisplayAccount.lineItems.length) {
  			console.log("here are the budget items 1")
  			console.log(this.currentDisplayAccount)
  			// var i = Object.keys(this.currentDisplayAccount.lineItems)
  			// for(i; i < 3; i++) {
  			// 	this.currentDisplayAccount.lineItems[i] = {"description":"", "amount": null}
  			// }
  			this.lineItemInputs = {};

  			return this.currentDisplayAccount.lineItems;
  		} else {
  			console.log("no line item! 1-n")
  			console.log(this.currentDisplayAccount)
  			const tempLineItems = []
  			for(var i = 0; i < 3; i++) {
  				tempLineItems.push({id: 'lineItem' + i + Date.now(), description: "", amount: null})
  			}
  			console.log(tempLineItems)

  			return tempLineItems;
  		}
  	}  	
  },
  methods: {
  	getAccount(object, key) {
  		console.log('get account!')
  		console.log(this.currentDisplayAccount.lineItems)
  		// while(this.currentDisplayAccount.lineItems.length > 0) {
  		// 	this.currentDisplayAccount.lineItems.pop();
  		// }

   		this.currentDisplayAccount.lineItems = [];
  		Object.assign(this.currentDisplayAccount, Object.assign(object, {id: key}));

  		this.percentSpent = this.percent(this.currentDisplayAccount.lineItems, this.currentDisplayAccount.amount)
  		this.charting(this.currentDisplayAccount.lineItems);
  		console.log(this.currentDisplayAccount);
  	},
  	addBudgetLines(object) {
  		// console.log('lineItemInputs 5')
  		console.log(object)
  		Object.assign(this.lineItemInputs, object);
  		console.log('lineItemInputs 6')
  		console.log(this.lineItemInputs)
  		this.percentSpent = this.percent(this.lineItemInputs, this.currentDisplayAccount.amount)

  		const unspent = this.currentDisplayAccount.amount - this.summing(this.lineItemInputs)

 	 	this.charting(this.lineItemInputs)
		// this.budgetChartData.labels.push('unspent')
		// this.budgetChartData.data.push(unspent)
		// this.currentDisplayAccount.lineItems = filteredArray;
		console.log(this.budgetChartData)
		
		// need to update budget

		// console.log('currentDisplayAccount with line items 7')
		// console.log(this.currentDisplayAccount)
  	},
  	saveAccount() {
  		const inputArray = []
  		for (let key in this.lineItemInputs) {
  			this.lineItemInputs[key].id = key
  			inputArray.push(this.lineItemInputs[key])
  		}

  		let filteredArray = inputArray.filter(function(object) {
 	 		return object.descripton !== "" && object.amount !== null
 	 	})
 	 	console.log(filteredArray);

  		this.currentDisplayAccount.lineItems = filteredArray;

  		const updatedAccount = {}
  		updatedAccount[this.currentDisplayAccount.id] = {
  			description: this.currentDisplayAccount.description,
  			amount: this.currentDisplayAccount.amount,
  			lineItems: this.currentDisplayAccount.lineItems
  		}
  		this.$emit('accountUpdate', updatedAccount);
  	},
  	charting(lineitems) {
  		const inputArray = Object.values(lineitems)
  		let filteredArray = inputArray.filter(function(object) {
 	 		return object.descripton !== "" && object.amount !== null
 	 	})

 	 	console.log('input array')
 	 	console.log(filteredArray)

  		const arrayKeys = []
 	 	const arrayValues = []
		for(var i=0; i< filteredArray.length; i++) {
			arrayKeys.push(filteredArray[i]['description'])
			arrayValues.push(filteredArray[i]['amount'])
		}

		console.log(this.budgetChartData)

		this.budgetChartData.labels = arrayKeys
		this.budgetChartData.data = arrayValues
  	},
  	percent(lineItems, accountTotal) {
		console.log("percentSpent is called 3")
		return Math.round(this.summing(lineItems)/accountTotal * 100)
  	},
  	summing(object) {
  		var sum = 0
		for (const prop in object) {
			sum += object[prop]['amount']
		}
		console.log('sum:')
		console.log(sum)
		return sum
  	}
  },
  created() {
  	// get initial display account

  	Object.assign(this.currentDisplayAccount, 
  		Object.assign(this.companyBudget.accounts[Object.keys(this.companyBudget.accounts)[0]], 
  			{id: Object.keys(this.companyBudget.accounts)[0]}));
  	console.log('currentDisplayAccount 8')
  	console.log(this.currentDisplayAccount)
  	this.percentSpent = this.percent(this.currentDisplayAccount.lineItems, this.currentDisplayAccount.amount)

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.budget-display {
	width: 100%;
}

.panels {
	display: flex;
	width: 100%;
}

.panel {
	width: 50%;
	margin-right: 5px;
}

.panel-left {
	width: 50%;
	margin-left: 5px;
}

.budget-accounts {
	margin-bottom: 23px;
	cursor: pointer;
}
.budget-line {
	margin-bottom: 25px;
}

.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.budget-category {
	margin-right: 18px;
}

.progress-border {
	border: 2px solid #ecddba;
	width: 100%;
	height: 21px;
	border-radius: 21px;
	position: relative;
}

.progress {
	background-color: #ecddba;
	color: white;
	position: absolute;
	left: 0px;
	border-radius: 7px;
	height: 100%;
	padding: 0px 5px;
	text-align: center;
}

@media screen and (max-width: 46rem) {

  .panels {
    flex-wrap: wrap !important;
  }

  .panel {
    width: 100% !important;
    margin: 0px;
  }

  .panel-left {
    width: 100% !important;
    margin: 0px;
  }
}

</style>

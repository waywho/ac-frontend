<template>
	<div class="budget-input">
		<div class="warning smaller" v-if="error.isShow">{{error.message}}</div>
		<input class="smaller line-item item-input" :id="id" type="text" :style="'background-color:'+ color +'; border-color:'+ color" v-model.lazy="budgetLineItem" :placeholder="inputName" />
  		<input class="smaller amount-input item-input" :id="id" type="number" placeholder="Enter Amount" :style="'border-color:'+ color" v-model.lazy="amountInput"  />
	</div>
</template>

<script>
export default {
  name: 'budgetInput',
  props: {
  	id: {
  		required: true,
  		type: String
  	},
  	inputName: {
  		required: true,
  		type: String
  	},
  	textValue: String,
  	amountValue: Number,
  	color: String,
  },
  data () {
    return {
      budgetLineItem: this.textValue,
      amountInput: this.amountValue,
      error: {
      	message: "",
      	isShow: false
      }
    }
  },
  methods: {
  	
  }
  ,
  created() {
  	// console.log(this.id)
  },
  watch: {
  	amountInput: function (value) {
  		if (this.budgetLineItem && value) {
  			const lineItem = {};
  			console.log('this id')
  			console.log(this.key)
  			lineItem[this.id] = {'description' : this.budgetLineItem, 'amount' : Number(value)};
  			this.error.message = ""
  			this.error.isShow = false
  			// console.log(lineItem);
  			this.$emit('inputValue', lineItem)
  		} else if (!this.budgetLineItem) {
  			this.error.message = "please enter item description"
  			this.error.isShow = true
  		} else if (!value) {
  			this.error.message = "please enter amount"
  			this.error.isShow = true
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.budget-input {
	display: block;
	max-width: 306px;
	width: 100%;
	height: 30px;
	margin: 10px auto;
	position: relative;
}

.line-item {
	z-index: 1;
	background-color: #cd9d2b;
	color: white;
	position: absolute;
	left: 0px;
}

.amount-input {
	position: absolute;
	left: 42%;
	text-align: right;
}

.line-item::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: white;
}
.line-item::-moz-placeholder { /* Firefox 19+ */
  color: white;
}
.line-item:-ms-input-placeholder { /* IE 10+ */
  color: white;
}
.line-item:-moz-placeholder { /* Firefox 18- */
  color: white;
}

</style>

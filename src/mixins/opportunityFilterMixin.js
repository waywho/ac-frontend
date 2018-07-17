import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			selectedCategory: null
		}
	},
	computed: {
		...mapGetters([
			'opportunityTypes',
			'categories',
			'paymentTypes'
		]),
		subcategories: function() {
			return this.$store.getters.subcategories(this.selectedCategory)
		}
	},
	methods: {
		changeSubcategories: function(selected) {
			this.selectedCategory = selected
		}
	}
}

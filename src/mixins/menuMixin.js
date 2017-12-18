export default{
	methods: {
		toggleMenu: function() {
		      this.$emit('toggleMenu', 'open');
		    }
	}
}

export default {
  computed: {
    currentUser() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}

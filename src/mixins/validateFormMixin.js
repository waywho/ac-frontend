export default {
  methods: {
    isEmpty(object) {
        for(var key in obj) {
          if(obj[key]) {
            return false
            break;
          }
        }
        return true
     },
    requiredField(field) {
    	if(field) {
    		return true
    	} else {
    		return false
    	}
    }
  }
}

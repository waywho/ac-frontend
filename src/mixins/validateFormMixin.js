export default {
  methods: {
    anyEmpty(object) {
        for(var key in object) {
          if(object[key]) {
            continue;
          } else { 
            return true 
            break;
          }
        }
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

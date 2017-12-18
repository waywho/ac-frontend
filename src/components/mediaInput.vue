<template>
  <div class="media-input">
  	 	<input class="smaller input-item item-input is-gold" type="text" name="mediaUrl" :placeholder="inputName" v-model.lazy="value" v-on:keyup.enter="addMedia($event.target.value)"/>
  </div>
</template>

<script>
export default {
  name: 'mediaInput',
  props: {
  	inputName: String,
  	mediaURL: String
  },
  data () {
    return {
    	value: this.mediaURL
    }
  },
  methods: {
  	addMedia: function(value) {

  		this.$emit('addMedia', value)
  		this.value = ""
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.media-input {
	display: block;
	width: 100%;
	height: 30px;
	margin: 10px auto 10px;
	position: relative;
}

.input-item {
	margin: auto;
	width: 218px;
	text-align: center;
	color: #cd9d2b;
}

.input-item::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #cd9d2b;
}
.input-item::-moz-placeholder { /* Firefox 19+ */
  color: #cd9d2b;
}
.input-item:-ms-input-placeholder { /* IE 10+ */
  color: #cd9d2b;
}
.input-item:-moz-placeholder { /* Firefox 18- */
  color: #cd9d2b;
}
</style>

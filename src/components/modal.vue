<template>
	<transition name="modal">
		<div class="modal-element">
			<div class="modal-mask" v-on:click="$emit('close')"></div>
			<div class="modal-wrapper">
			    <div class="modal-container">

			      <div class="modal-header">
			        <slot name="header">
			          default header
			        </slot>
			      </div>

			      <div class="modal-body">
			        <slot name="body">
			          default body
			        </slot>
			      </div>

			      <div class="modal-footer">
			        <slot name="footer">
			          default footer
			          <button class="modal-default-button" @click="$emit('close')">
			            OK
			          </button>
			        </slot>
			      </div>
			    </div>
			 </div>
		</div>
	</transition>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.modal-element {
  position: absolute;
  z-index: 9997;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(203, 157, 43, .5);
  transition: opacity .3s ease;
}

.modal-wrapper {
	z-index: 9999;
	max-width: 603px;
	width: 90%;
	height: 751px;
}

.modal-container {
  max-width: 603px;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  text-align: center;
  margin-top: 80px;
}

.modal-header h3 {
  margin-top: 63px;
  color: $color-lightgray;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
</style>

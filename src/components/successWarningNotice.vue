<template>
  <div :class="['app-message', type]">
  	<p><i class="fa fa-exclamation" aria-hidden="true"></i>  <span class="small">{{message}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'successWarningNotice',
  props: {
  	message: null,
    type: null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.app-message {
	height: 100%;
	min-height: 32px;
	padding: 1px;
	width: 100%;
	color: white;
	text-align: center;
	font-weight: 500;
}

.app-message p {
	margin: 5px auto;
}

.warning {
	background-color: #f39166;
}

.notice {
	background-color: #87c4d5;
}

.success {
	background-color: #87d592;
}
</style>

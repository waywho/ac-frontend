<template>
	<div class="connection-tile tile-container" v-on:click="sendConnection(connection.id)">

			<input :id="connection.id" type='checkbox' :value="connection.id" v-model='connectionID' />
	       	<label :for="connection.id"><span></span></label>

			<div class="avatar-medium connection-avatar">
				<img v-bind:src="connection.img" :alt="connection.firstName + connection.lastName + ' photo'" />
			</div>
			<div class="name strong small">{{ connection.firstName}} {{ connection.lastName }}</div>
			<div class="place tiny">{{connection.city}} {{connection.province}}</div>
			<div class="role smaller">{{ connection.role }}</div>
		<span class="small">CONNECT</span>
	</div>
</template>

<script>
export default {
  name: 'connectionTile',
  props: {
  	connection: Object
  },
  data () {
    return {
      connectionID: []
    }
  },
  methods: {
  	sendConnection: function(key) {
  		this.connectionID.push(key)
  		this.$emit('addConnection', this.connectionID)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

.connection-tile {
	background: $color-tile;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 30px;
	text-align: center;
	margin: 10px 5px;
	cursor: pointer;
}

.connection-avatar, .place, .role {
	margin-bottom: 10px;
	flex-grow: 1;
}

.tile-container:hover {
	background: $color-gold;
	color: white;
}

.tile-container input[type="checkbox"] + label span {
	float: right;
}

.circle {
	float: right;
	background: $color-tile;
	border-radius: 50%;
	color: $color-gold;
	width: 16px;
	height: 16px;
}

</style>

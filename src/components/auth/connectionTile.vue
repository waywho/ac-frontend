<template>
	<div class="connection-tile tile-container">
<!-- I am not in use -->
			<input :id="connection.name" type='checkbox' :value="connection.id" @click="sendConnection($event.target.value)" />
	       	<label :for="connection.name"><span></span></label>

			<div class="avatar avatar-medium connection-avatar" :style="{'background-image': 'url('+ connection.avatarURL +')'}" :title="connection.name + ' avatar photo'">
			</div>
			<div class="name strong small">{{ connection.name }}</div>
			<div class="place tiny">{{connection.city}} {{connection.province}}</div>
			<div v-if="connection.type === 'artist'" class="role smaller">{{ connection.role }}</div>
		<span class="small">CONNECT</span>
	</div>
</template>

<script>
export default {
  name: 'connectionTile',
  props: {
  	connection: Object,
  	value: Array
  },
  data () {
    return {
    }
  },
  methods: {
  	sendConnection: function(id) {
  		// console.log(id);
  		this.$emit('change', id);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';

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

.name {
	margin-bottom: 5px;
}

</style>

<template>
	<div class="row connections">
		<div class="connections-title col-sm-4 col-xs-12">
			<h2>Connections</h2>
			<span class="selection-text-vertical">Company Staff</span>
			<span class="selection-text-vertical">120 Connections</span>
		</div>
		<div class="col-sm-8 col-xs-12">
			<div class="row slide">
				<div v-for="connection in slicedConnections" class="connection-tile col-sm col-xs">
					<div class="avatar-medium connection-avatar">
						<img v-bind:src="connection.img" :alt="connection.firstName + connection.lastName + ' photo'" />
					</div>
					<div class="name small strong">{{ connection.firstName}} {{ connection.lastName }}</div>
					<div class="role smaller">{{ connection.role }}</div>
				</div>
				<div class="col-sm-1 col-xs-1 more" v-on:click="nextFour()">
					<i class="fa fa-chevron-right fa-2x is-darkgray"></i>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  name: 'connections',
  props: {
  	connections: Array 
  },
  data () {
    return {
      slicedConnections: []
    }
  },
  computed: {

  },
  methods: {
  	nextFour: function() {
  		this.slicedConnections = this.connections.slice(4, 8) 
  	}
  },
  created() {
  	this.slicedConnections = this.connections.slice(0, 4);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.connections {
	height: 240px;
}
.connection-avatar {
	margin-bottom: 21px;
	display: block;
	text-align: center;
}

.name, .role {
	text-align: center;
}

.more {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.more:hover, .more:hover .fa {
	color: #cd9d2b;
}
</style>

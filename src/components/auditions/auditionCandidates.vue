<template>
	<div class="audition-candidates">
		<div class="row slide row-container">
			<div v-for="auditionee in auditionees" class="auditionee-tile col-lg-3 col-md-4 col-sm-4 col-xs-4">
				<div class="avatar-large">
						<img v-bind:src="auditionee.img" />
				</div>
				<div class="tile-text">
					<span class="name">{{ auditionee.firstName}} {{ auditionee.lastName }}</span><br />
					<span class="role">{{ auditionee.city }}, {{ auditionee.province}}</span>
				</div>
				<div class="icon-container unselected">
					<i class="fa fa-envelope-o is-golden icon" aria-hidden="true"></i>
				</div>
				<div :class="['icon-container', auditionee.selected ? 'selected' : 'unselected']">
					<i :class="['fa', 'fa-check', auditionee.selected ? 'selected' : 'is-golden',  'icon']" aria-hidden="true"></i>
				</div>
				<div :class="['icon-container', !auditionee.selected ? 'selected' : 'unselected']">
					<i :class="['fa', 'fa-times', !auditionee.selected ? 'selected' : 'is-golden',  'icon']" aria-hidden="true"></i>
				</div>
			</div>
		</div>
		<div class="more-auditions xs-hide"><i class="fa fa-chevron-right fa-2x is-darkgray"></i></div>
	</div>

</template>

<script>

export default {
  name: 'auditionCandidates',
  components: {

  },
  props: {
  	auditionees: Array
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audition-candidates {
	display: flex;
}

.more-auditions {
	width: 5%;
	display: inline-flex;
	align-items: flex-end;
	justify-content: center;
}

.row-container {
	width: 100%;
}

.auditionee-tile {
	background-color: #f7f4f4;
	margin: 12px 12px;
	flex-basis: 20%;
	text-align: center;
	padding: 22px 0px 22px 0px;
	min-width: 164px;
}

.tile-text {
	margin-top: 26px;
	margin-bottom: 19px;
}

.selected {
	background-color: #cd9d2b;
	color: white;
}

.unselected {
	background-color: white;
}



@media screen and (max-width: 46rem) {

	.auditionee-tile {
		background-color: #e5e1df;
		margin: 12px 12px;
		min-width: 221px;
		text-align: center;
		padding: 26px 0px;
	}
}

</style>

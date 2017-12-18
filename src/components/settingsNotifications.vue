<template>
  <div id="notification-settings">
  	<div class="row top-sm between-sm between-xs middle-sm">
	  	<div class="col-sm col-xs">
	  		<h3>Notifcations:</h3>
	  	</div>
	  	<div class="col-sm col-xs row end-sm end-xs">
	  		<button>SAVE</button>
	  	</div>
	</div>
	<div class="notification-title">Notify me when...</div>
	
	<ul class="non-list">
		<li v-for="setting in notificationSettings" class="notification-line small row between-sm between-xs middle-sm middle-xs">
			<div class="col-sm-2 col-xs-2">{{setting.title}}</div>
			<div class="col-sm-2 col-xs-2">
				<label class="switch">
					<input type="checkbox" v-model="setting.isChecked"/>
					<span class="slider"></span>
				</label>
			</div>
			<div class="notification-desc smaller col-sm-6 col-xs-6">{{setting.desc}}</div>
		</li>
	</ul>
  </div>
</template>

<script>
export default {
  name: 'settingsNotifications',
  props: {
    profileId: String
  },
  computed: {
  	notificationSettings: function() {
  		return this.$store.state.profiles.companyXYZ.notification_settings;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables.scss';

#notification-settings {
	border: 1.5px solid $color-gold;
	padding: 26px 22px 26px 28px;
}

.notification-title {
	margin-bottom: 25px;
}

.notification-line {
	display: flex;
	align-items: center;
	margin-bottom: 25px;
}

.notification-desc {
	display: inline-block;
	margin-left: 10px;
}

</style>

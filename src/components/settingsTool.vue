<template>
  <div class="settings">
  	<h2>Settings</h2>
    <div class="settings-inner">
      <div class="selection setting-selections">
        <span class="selection-text-vertical">Profile</span>
        <span class="selection-text-vertical">Messaging</span>
        <span class="selection-text-vertical">Notifications</span>
        <span class="selection-text-vertical">Budget Planner</span>
        <span class="selection-text-vertical">Language support</span>
        <span class="selection-text-vertical">Preferences</span>
        <span class="selection-text-vertical">Admin / Roles</span>
      </div>

      <component :is="component" class="setting-details"></component>
    </div>
  </div>
</template>

<script>
import settingsNotifications from './settingsNotifications';

export default {
  name: 'settingsTool',
	components: {
		'notification-settings': settingsNotifications
	},
  	data () {
	    return {
	      component: 'notification-settings'
	    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .settings {
    height: 100%;
    padding-left: 100px;
  }

  .settings h2 {
    width: 100%;
  }

  .settings-inner {
    display: flex;
    height: 486px;
  }

  .setting-selections {
    flex-basis: 25%;
    height: 100%;
  }

  .setting-details {
    flex-basis: 75%;
    height: 100%;
  }
</style>

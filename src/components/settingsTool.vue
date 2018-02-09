<template>
  <div class="settings">
  	<h2>Settings</h2>
    <div class="settings-inner">
      <div class="selection setting-selections">
        <span v-for="(setting, key) in settings" class="selection-text-vertical" v-on:click="selectSetting(key)">{{key | camel-to-space}}</span>
      </div>

      <div class="setting-details">
        <div class="row top-sm between-sm between-xs middle-sm">
          <div class="col-sm col-xs">
            <h3>{{settingSectionTitle | camel-to-space}}:</h3>
          </div>
          <div class="col-sm col-xs row end-sm end-xs">
            <button v-on:click="updateSettings()">SAVE</button>
          </div>
      </div>
      <div class="setting-title">Notify me when...</div>
      
      <ul class="non-list">
        <li v-for="setting in settingDetails" class="setting-detail-line small row between-sm between-xs middle-sm middle-xs">
          <div class="col-sm-2 col-xs-2">{{setting.title}}</div>
          <div class="col-sm-2 col-xs-2">
            <label class="switch">
              <input type="checkbox" v-model="setting.isChecked"/>
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-detail-desc smaller col-sm-6 col-xs-6">{{setting.desc}}</div>
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settingsTool',
  props: {
    settings: Object
  },
  data () {
	    return {
        settingDetails: this.settings.notifications,
        settingSectionTitle: "notifications"
	    }
  },
  methods: {
    selectSetting: function(key) {
      this.settingSectionTitle = key
      this.settingDetails = this.settings[key]
    },
    updateSettings: function() {
      let newData = {[this.settingSectionTitle]: this.settingDetails}
      this.$store.dispatch('updateUserTools', {userId: this.$store.getters.currentUser.id, toolName: 'settings', data: newData})
          .then((response) => {
            // this.messageShow[fields] = true,
            // this.$emit(updateTool, toolData);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables.scss';
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
    border: 1.5px solid $color-gold;
    padding: 26px 22px 26px 28px;
    width: 75%;
    flex-basis: 75%;
    height: 100%;
  }

  .setting-title {
    margin-bottom: 25px;
  }

  .setting-detail-line {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .setting-detail-desc {
    display: inline-block;
    margin-left: 10px;
  }
</style>

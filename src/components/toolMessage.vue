<template>
  <div class="message-panel">
	  	<div class="message-sidepanel">
	  		<h2>Messages</h2>
	  		<input type="text" id="sender-search" class="small" placeholder="search profiles" v-on:keydown.space="getUsers" v-on:keydown.enter="getUsers" v-model="userSearch" />
	  		<div class="senders-window">
	  			<div v-if="userSearch !== null"  v-for="(user, index) in users" class="sender" :key="index" v-on:click="startMessage(user.id)">
	  				<div class="avatar-box">
				      	<img :src="userAvatar(user.avatarURL)" class="avatar-small" />
					</div>
				    <div class="sender-name">
				    	<b>{{ user.name}}</b><br />
				    </div>
	  			</div>
	  			<div v-else v-for="(chat, key, index) in chats" :class="{ sender, isActive: chat.isActive }" :key="index" v-on:click="getMessages(key)">
		  			<div class="avatar-box">
				      	<img :src="userAvatar(chat.avatarURL)" class="avatar-small" />
					</div>
				    <div class="sender-name">
				    	<b>{{ chat.sender || chat.name}}</b><br />
				    	<span class="smaller is-silver medium">{{chat.lastMessage}}</span>
				    </div>
		  		</div>
	  		</div>
	  	</div>
	  	<div class="message-window">
	  		<div class="message-header">
				<span class="strong">{{ sender.name}}</span><br />
				<span class="smaller">{{ sender.role }}</span>
			</div>
		  	<div class="messages">
			  	<message v-for="message in chats" :message="message" :key="message.created">
			  	</message>
		  	</div>
			<div class="message-input-container">
				<textarea type="text" id="message-input" placeholder="message" @keydown.enter="sendMessage($event)"></textarea>
			</div>
		</div>
  </div>
</template>

<script>
import currentUserMixin from '../mixins/currentUserMixin';
import avatarMixin from '../mixins/avatarMixin';
import message from './message';
import firebaseAxios from '../axios-firebase.js';

export default {
  name: 'messageTool',
  components: {
  	'message': message,
  },
  mixins: [currentUserMixin, avatarMixin],
  data () {
    return {
    	users: [],
		chats: [],
		sender: {},
		loading: true,
		error: '',
		userSearch: null
    }
  },
  props: {
    profileId: String
  },
  computed: {
  	senderAvatar: function() {
  		if (this.sender.avatarURL !== null && this.sender.avatarURL !== undefined) {
  			return this.sender.avatarURL
  		} else {

  		}
  	}
  },
  methods: {
  	startMessage: function(id) {
  		
  	},
  	getMessages: function (id) {
  		// console.log(id);
  		console.log(this.$store.state.messages[id]);
  		this.messages = this.$store.state.messages[id];
  		this.sender = this.$store.state.users[id];
  		// this.$store.state.conversations[id].isActive = !this.$store.state.conversations[id].isActive;
  		console.log(this.sender);
  	},
  	sendMessage: function(event) {
  		console.log(event.target.value)

  	},
  	getUsers: function() {

		firebaseAxios.get("/users.json?auth=" + this.$store.getters.currentUser.idToken + `&orderBy="firstName"&equalTo="${this.userSearch.trim()}"`)
		.then(res => {
			console.log(res)
			this.users = Object.values(res.data)
		}).catch(error => {
			console.log(error.response)
		})

		firebaseAxios.get("/users.json?auth=" + this.$store.getters.currentUser.idToken + `&orderBy="lastName"&equalTo="${this.userSearch.trim()}"`)
		.then(res => {
			console.log(res)
			if(res.data.length > 0) {
				this.users.concat(Object.values(res.data))
			}
		}).catch(error => {
			console.log(error.response)
		})
  		
  		
  	}
  },
  created() {

  	firebaseAxios.get("/chats/" + this.profileId + ".json?auth=" + this.$store.getters.currentUser.idToken)
		.then(res => {
			this.loading = false
			console.log('got the messages', res)
			this.chats = res.data
		})
		// TODO: add message if data is not found somwehere
		.catch(error => {
			this.error = error.message
			console.log('cant get the messages', error.response)
		})
  	// console.log(this.$store.state.conversations);
  	// this.messages = this.$store.state.messages['AlyssaID']; //this.profileID
  	// this.sender = this.$store.state.users['AlyssaID'];
  	// this.$store.state.conversations['AlyssaID'].isActive = !this.$store.state.conversations['AlyssaID'].isActive;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/style-variables.scss';

.message-panel {
	min-height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	background-color: $color-body;
}

.message-sidepanel {
	flex-basis: 58%;
	background-color: #fff;
	margin-right: 15px;
	padding-left: 100px;
}

.senders-window {
	overflow-y: scroll;
	height: 415px;
}

.sender {
	// border: 1px solid #dddcdc;
	height: 75px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.message-window {
	// border: 1px solid #dddcdc;
	background-color: #fff;
	height: 100%;
	flex-basis: 55%;
}

.message-header {
	padding: 24px 24px 0px;
	height: 15%;
}

.messages {
	height: 65%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	padding: 14px 24px;
}

.message-input-container {
	// border-top: 1px solid #dddcdc;
	height: 20%;
	display: flex;
	padding: 14px 24px;
	justify-content: center;
	align-items: center;
}

#message-input {
	max-width: 80%;
	height: 100%; 
}

#sender-search {
	max-width: 80%;
	margin-bottom: 30px;
}



.sender {
	display: flex;
	justify-content: flex-start;
	cursor: pointer;
}

.sender:hover {
	background: #ecddba;
	color: white;
}

.avatar-box {
	width: 75px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.sender-name {
	display: inline-block;
	font-size: $font-size-small;
}

.isActive {
	background: #ecddba;
	color: white;
	font-weight: bold;
}

@media screen and (max-width: 46rem) {
	.message-sidepanel {
		flex-basis: 100%;
	}

	.message-window {
		flex-basis: 100%;
	}
}
</style>

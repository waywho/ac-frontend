<template>
  <div class="message-tool-panel">
	  	<div class="message-sidepanel">
	  		<h2>Messages</h2>
	  		<input type="search" id="sender-search" class="small" placeholder="search profiles" v-on:keyup="getUsers" v-model="userSearch" @input="hideChat" />
	  		<div class="senders-window">
	  			
	  			<i v-if="chatsLoading" class="fa fa-circle-o-notch fa-spin loading-spinner" key="chatsLoading"></i>
	  			

  				<p v-if="!showChat && searchResultMessage" class="warning" key="resultsWarning"><small>{{searchResultMessage}}</small></p>
	  			
	  			<div v-if="!showChat && !chatsLoading" v-for="(user, index) in userResults" class="sender" :key="user.id" v-on:click="startMessage(user)">
	  				<avatar class="avatar-box" :image-source="user.avatarURL" :border="true" :size="'medium'" :name="user.name"></avatar>
				    <div class="sender-name">
				    	<b><small>{{ user.name}}</small></b><br />
				    	<span class="smaller is-silver medium last-message">{{user.lastMessage}}</span>
				    </div>
	  			</div>

	  			<div v-if="showChat && !chatsLoading" v-for="(chat, index) in chats" :class="['sender', {'active-chat': currentChat.id === chat.id}]" :key="chat.id" v-on:click="startChat(chat)">
	  				<avatar class="avatar-box" :image-source="chat.chatee.avatarURL" :border="true" :size="'medium'" :name="chat.chatee.name"></avatar>
	  
				    <div class="sender-name">
				    	<span :class="chat.status"><b><small>{{ chat.chatee.name }}</small></b></span><br />
				    	<span class="smaller is-silver medium last-message">{{chat.lastMessage}}</span>
				    </div>
	  			</div>
	
	  			
	  		</div>
	  	</div>
	  	<div class="message-window">
	  		<transition name="fade-quick" mode="out-in">
		  		<div class="message-loading" v-if="messageLoading" key="loadingMessage">
		  			<i class="fa fa-circle-o-notch fa-spin loading-spinner"></i>
		  		</div>
		  		<div v-if="!messageLoading" class="message-loading" key="messageBody">
			  		<div class="message-header">
			  			<avatar v-if="chatee" class="avatar-box" :image-source="chatee.avatarURL" :border="true" :size="'medium'" :name="chatee.name"></avatar>
						<div v-if="chatee" class="chatee-details">
							<span :class="['strong', {'warning-text': warningActive }]">{{ chatee.name}}</span><br />
							<span class="smaller">{{ chatee.roleType }}</span>
						</div>
					</div>
				  	<div class="message-body" v-chat-scroll>
				  		<p class="initial-message" v-if="initialMessage">{{initialMessage}}</p>
					  	<message v-for="message in currentChatThread" :message="message" :key="message.timestamp">
					  	</message>
				  	</div>
			  	</div>
		 	</transition>
			<div class="message-input-container">
				<textarea type="text" id="message-input" placeholder="Write message" v-model="inputMessage" rows="4"></textarea>
				<button @click="sendMessage">send</button>
			</div>
		</div>
  </div>
</template>

<script>
import currentUserMixin from '@/mixins/currentUserMixin';
import avatarMixin from '@/mixins/avatarMixin';
import message from './message';
import avatar from '@/components/avatar';
// import firebase from 'firebase/app';
// import 'firebase/database';
import firebaseApp from '@/firebase/init';
import _ from 'lodash';

export default {
  name: 'messageTool',
  components: {
  	'message': message,
  	'avatar': avatar
  },
  mixins: [currentUserMixin, avatarMixin],
  data () {
    return {
    	chatsLoading: false,
    	messageLoading: false,
    	showChat: true,
		chats: [],
		currentChat: {
			id: null
		},
		currentChatThread: [],
		chatee: null,
		error: '',
		userSearch: "",
		userResults: [],
		inputMessage: null,
		initialMessage: null,
		chatMemberships: {},
		searchResultMessage: null,
		warningActive: false
    }
  },
  props: {
    profileId: String
  },
  computed:{
  },
  methods: {
  	hideChat: function() {
  		// console.log("search")
  		// console.log('search length', this.userSearch.length)
  		this.searchResultMessage = ""
  		if(this.userSearch.length > 0) {
  			this.chatsLoading = true
  			this.showChat = false
  		} else if (this.userSearch.length === 0) {
  			this.chatsLoading = false
  			this.showChat = true
  		}
  	},
  	reorderChats: function(oldChat, newChat) {
  		this.chats.splice(this.chats.indexOf(oldChat), 1)
		this.chats.unshift(newChat)
  	},
  	getMemberships: function(chatArray) {
  		// console.log('i am getting memberships')
  		var chatMembershipRef = firebaseApp.database().ref("chatMemberships")
  		Promise.all(
  			chatArray.map(chat => {
  				return chatMembershipRef.child(chat.id).once('value', snapshot => {
  					// console.log(snapshot.val())
  					Object.assign(this.chatMemberships, {[chat.id]: snapshot.val()})
  					return snapshot.val()
  					})
  				})
  		).then(res => {
  			// console.log(res)
  			// this.chatMemberships = res
			
  		}).catch(error => {
  			// console.log(error)
  		})
  	},
  	startChat: function(chat) {
  		this.initialMessage = ""
  		this.messageLoading = true
  		this.showChat = true
  		this.currentChatThread = []
  		this.currentChat = chat
  		let partnerID = this.getChatPartnerID(chat.id)
  		this.getChatPartner(partnerID)
  		this.getMessages(chat.id)
  	},
  	getChatPartnerID: function(chatID) {
  		return Object.keys(this.chatMemberships[chatID]).filter(userID => {
  			return userID !== this.$store.getters.currentUser.id
  		})[0]
  	},
  	getChatPartner: function(userID) {
  		this.warningActive = false
  		// console.log(userID)
  		this.chatee = null
  		var usersRef = firebaseApp.database().ref("users").child(userID)
  		usersRef.on("value", snapshot => {
  			// console.log(snapshot.val())
  			if(snapshot.val() === null) {
  				this.warningActive = true
  				this.chatee = {
  					name: "This user is no longer available"
  				}
  			} else {
  				this.chatee = snapshot.val()
  			}
  			
  		})
  	},
  	startMessage: function(user) {
  		this.initialMessage = ""
  		this.messageLoading = true
  		this.showChat = true
  		this.currentChatThread = []
  		this.currentChat = {}
  		// console.log('messageStart', user.id)
		this.getChatPartner(user.id)
		this.userResults = null
		this.userSearch = null
  		
  		if(this.chats) {
  			// check if there is already a thread
  			var chatThreadRef = firebaseApp.database().ref("threads")
			let chatID = _.findKey(this.chatMemberships, function(o) { return o[user.id] })
			// console.log('chat id', chatID)
			if (chatID) {
				this.currentChat = this.chats.filter(chat => {
					return chat.id.match(chatID)
				})[0]
				this.reorderChats(this.currentChat, this.currentChat)
				this.getMessages(chatID)
				this.messageLoading = false
			} else {
				//start a new chat
				this.initialMessage = `You don't have any conversations with ${user.name} yet, send your first message!`
				this.messageLoading = false
			}
	  	} else {
	  		this.initialMessage = `You don't have any conversations with ${user.name} yet, send your first message!`
	  		this.messageLoading = false
	  	}

  	},
  	getMessages: function (currentChatID) {
  		var chatThreadRef = firebaseApp.database().ref("threads").child(currentChatID)

  		chatThreadRef.once("value", snapshot => {
  			var chatThread = snapshot.val();
  			this.currentChatThread = _.orderBy(Object.values(chatThread), ['timestamp'], ['asc'])
  			this.messageLoading = false
  		}, erorr => {
  			console.log(error)
  		})
  	},
  	sendMessage: function() {
  		this.initialMessage = null
  		var databaseRef = firebaseApp.database().ref();
  		var chatKey, messageUpdates

 		if(this.currentChat.id === null || this.currentChat.id === undefined) {
 			chatKey = databaseRef.child("chatMemberships").push().key;
 			messageUpdates = this.constructMessage(chatKey)
 			messageUpdates['chatMemberships/' + chatKey] = { 
  					[this.$store.getters.currentUser.id]: true,
  					[this.chatee.id]: true
  				}

  			this.currentChat = messageUpdates['chats/' + this.$store.getters.currentUser.id + "/" + chatKey ]
  			this.currentChat.id = chatKey
		} else {
			chatKey = this.currentChat.id
			messageUpdates = this.constructMessage(chatKey)
			// console.log(messageUpdates)
		}
		// console.log(messageUpdates)
		var newThread = {
				content: this.inputMessage,
				sender: this.$store.getters.profile.details.name,
				timestamp: Date.now()
			}

		databaseRef.update(messageUpdates, error => {
  				if(error) {
  					console.log(error)
  				} else {
  					firebaseApp.database().ref("threads").child(chatKey).push().update(newThread, error => {
  						if(error) {
  							console.log(error)
  						} else {
  							this.currentChatThread.push(newThread)
  							this.inputMessage = ""
  						}
  					}).then(res => {
  						databaseRef.child('threads').child(this.currentChat.id).once('value', snapshot => {
  							 var chatThread = snapshot.val();
  							this.currentChatThread = _.orderBy(Object.values(chatThread), ['timestamp'], ['asc'])
  						})
  					})
  					
  				}
  			})
  	},
  	constructMessage: function(chatID) {
  		return {
  			['chats/' + this.$store.getters.currentUser.id + "/" + chatID ]: {
  				'chatee': {
  					name: this.chatee.name,
  					avatarURL: this.chatee.avatarURL
  				},
				lastMessage: this.inputMessage,
				sender: this.$store.getters.profile.details.name,
				timestamp: Date.now()
			},
			['chats/' + this.chatee.id + "/" + chatID ]: {
				'chatee': {
  					name: this.$store.getters.profile.details.name,
  					avatarURL: this.$store.getters.profile.avatarURL
  				},
				lastMessage: this.inputMessage,
				sender: this.$store.getters.profile.details.name,
				timestamp: Date.now()
			}
  		}
  	},
  	getUsers: function() {
  		if(this.userSearch.length > 2) {
	  		this.chatsLoading = true
	  		var userArray = []
	  		var usersRef = firebaseApp.database().ref("users")

	  		usersRef.orderByChild("firstName")
	  			.startAt(this.userSearch.toLowerCase().trim())
	  			.endAt(this.userSearch.toLowerCase().trim() + "\uf8ff")
	  			.once("value", snapshot => {
	  			// console.log('firebaseApp', snapshot.val())
	  			// console.log('firebaseApp num', snapshot.numChildren())
	  			if(snapshot.numChildren() > 0) {
					userArray = Object.values(snapshot.val())
				}

	  		}).then(res => {
	  			usersRef.orderByChild("lastName")
	  				.startAt(this.userSearch.toLowerCase().trim())
	  				.endAt(this.userSearch.toLowerCase().trim() + "\uf8ff")
	  				.once("value", snapshotTwo => {
	  				// console.log('second search', snapshotTwo.val())
	  				// console.log(snapshotTwo.numChildren())

	  				if (snapshotTwo.numChildren() > 0 && userArray.length > 0) {
	  					// console.log(Object.values(snapshotTwo.val()))

	  					userArray.concat(Object.values(snapshotTwo.val()))
	  					
	  				} else if(snapshotTwo.numChildren() > 0) {
	  					userArray = Object.values(snapshotTwo.val())
	  				}
	  				// console.log(userArray)
	  				
	  				this.userResults = userArray
	  				if(this.userResults < 1) {
	  					this.searchResultMessage = "sorry, no profiles found."
	  				}
	  				this.chatsLoading = false
	  			})
	  		}, error => {
	  			console.log(error)
	  		})  			
  		}

  	}
  },
  created() {
  	var chatRef = firebaseApp.database().ref(`chats/${this.$store.getters.currentUser.id}`)
  	var membershipRef = firebaseApp.database().ref("chatMemberships")
  	let lastChildKey
  	// console.log(chatRef.key)

	chatRef.on('child_added', (childSnapshot, prevChildKey) => {
		// console.log(childSnapshot)
		// console.log('chlid added', childSnapshot)
		let chat = childSnapshot.val()
		chat.id = childSnapshot.key
		lastChildKey = childSnapshot.key
		membershipRef.child(childSnapshot.key).once('value').then(snapshot => {
			Object.assign(this.chatMemberships, {[snapshot.key]: snapshot.val()})
		})
		this.chatsLoading = false
		return this.chats.unshift(chat)

	})

  	chatRef.on('child_changed', (childSnapshot, prevChildKey) => {
  		// console.log(childSnapshot)
  		// console.log('changed child', childSnapshot)
  		let changedChat = childSnapshot.val()
  		changedChat.id = childSnapshot.key
  		changedChat.status = "changed-chat"
  		// console.log('changed chat', changedChat)
		let oldChat = this.chats.filter((chat, index) => {
  			return chat.id.match(childSnapshot.key)
  		})[0]
		this.reorderChats(oldChat, changedChat)
		
  		// this.chats.unshift(chat)
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../styles/style-variables.scss';

.message-tool-panel {
	height: auto;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: $color-body;
}

.message-sidepanel {
	width: auto;
	height: auto;
	flex-basis: auto;
	background-color: #fff;
	margin-bottom: 15px;
	padding: 0px $body-padding-small 15px;
}

#sender-search {
	max-width: 95%;
	margin-bottom: 15px;
	margin-right: auto;
	margin-left: auto;
}

.senders-window {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	padding-bottom: 10px;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
  	-webkit-transform: translateZ(0px);
}

.sender {
	height: 100%;
	min-height: 110px;
	width: 100%;
	min-width: 100px;
	display: flex;
	border-radius: 10px;
	padding: 10px 25px;
	margin-right: 5px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	text-align: center;
}

.avatar-box {
	min-height: 41px;
	min-width: 41px;
	margin-bottom: 5px;
	// display: inline-flex;
	// justify-content: center;
	// align-items: center;
	// margin-right: 15px;
	// margin-left: 10px;
}

.last-message {
	display: none;
}

.sender:hover, .active-chat {
	background: #ecddba;
	color: white;
}

.message-window {
	// border: 1px solid #dddcdc;
	background-color: #fff;
	height: $tool-panel-height;
	flex-basis: 60%;
}

.message-loading {
	padding: 24px 24px;
	height: 72%;
}

.message-header {
	height: 15%;
	display: flex;
	align-items: center;
}

.message-body {
	height: 85%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	padding: 24px 0px 0px;
}

.message-input-container {
	// border-top: 1px solid #dddcdc;
	height: 28%;
	padding: 14px 24px;
	text-align: right;
}

.changed-chat {
	font-weight: bold;
}

#message-input {
	max-width: 100%; 
	margin-bottom: 15px;
}


.initial-message {
	text-align: center;
}

.sender-name {
	display: inline-block;
	font-size: $font-size-small;
}

.chatee-details {
	margin-left: 10px;
}

.isActive {
	background: #ecddba;
	color: white;
	font-weight: bold;
}

.warning-text {
	color: #f39166;
}



@media all and (min-width: $bp-med) {
	.last-message {
		display: block;
	}

	.message-tool-panel {
		flex-direction: row;
	}

	.message-sidepanel {
		width: 50%;
		height: $tool-panel-height;
		margin-right: 15px;
		margin-bottom: 0px;
		flex-basis: auto;
		height: auto;
		padding-left: $body-padding-small;
		padding-right: 0px;
	}

	.senders-window {
		height: 430px;
		flex-direction: column;
		justify-content: flex-start;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
  		-webkit-transform: translateZ(0px);
	}

	#sender-search {
		width: 90%;
		margin-right: 0px;
		margin-left: 0px;
	}

	.sender {
		min-height: 75px;
		padding: 15px 15px;
		display: flex;
		margin-right: 5px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;
		text-align: left;
	}

	.avatar-box {
		margin-right: 20px;
		margin-bottom: 0px;
	}

	.message-window {
		width: 50%;
		flex-basis: auto;
	}
}
@media all and (min-width: $bp-large-3) {
	.message-sidepanel {
		padding-left: $body-padding-large;
	}

}
</style>

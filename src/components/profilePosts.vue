<template>
	<div class="post-section">
		<div v-if="authorizedUser" class="post-box">
			<div class="avatar-border">
				<avatar  :image-source="currentUserAvatar" :border="true" :size="'medium'" :name="$store.getters.profile.details.name"></avatar>
			</div>


			<div class="comment-box-container">
				<textarea class="comment-box" v-model="post.content" rows="6"></textarea>
			
				<div v-if="imageURLs" class="row image-row">
	          		<div class="multi-image-container">
	          			<div v-for="image in imageURLs" class="image-in-row thumbnail">
	          				<img v-bind:src="image" />
	          			</div>
	          		</div>
	      		</div>
          		
				
				<div class="add-image" v-on:click="onPickFile('postImage')">
					<i class="fa fa-picture-o is-darkgray" aria-hidden="true"></i>
					<span class="smaller is-darkgray" >Add image</span>
					<input v-if="authorizedUser" type="file" ref="postImage" style="display: none" accept="image/*" @change="onPostFilePicked($event, 'cover')" />
				</div>
				<button v-on:click="addPost" class="post-button">POST</button>
				
				
			</div>
		</div>
		<div id="post-masonry">
			<div v-for="(post, index) in displayPosts" class="post-tile" :key="index">
				<div class="post-header">
					<span class="name is-golden strong">{{post.name}}</span>
					<div class="status">
						<span class="smaller">{{ post.timestamp | moment("from")}} </span><div class="comment-circle"></div><span class="smaller">posted a status</span>
					</div>

	          	</div>
	          	<div class="post-text">{{post.content}}</div>
	          	<div v-if="post.imageURLs">
	          		<div v-if="post.imageURLs.length > 1" class="multi-image-container">
	          			<div v-for="image in post.imageURLs" class="image-in-row"><img v-bind:src="image" /></div>
	          			</div>
	          		<div v-else-if="post.imageURLs.length === 1" class="post-image"><img v-bind:src="post.imageURLs" /></div>
	          	</div>
	          	<div class="post-icons">
		          	<span :class="[post.likes && post.likes[profileId] ? 'is-golden' : '']"><i class="fa fa-heart post-icon smaller" @click="toggleLikes(post.id)" aria-hidden="true"></i><span class="icon-count medium smaller">{{post.likeCount}}</span></span>
	          	</div>
			</div>
		</div>
	</div>
</template>

<script>
import currentUserMixin from '../mixins/currentUserMixin'
import profileImagesMixin from '../mixins/profileImagesMixin'
import avatar from '@/components/avatar'
import avatarMixin from '../mixins/avatarMixin'
import firebaseApp from '@/firebase/init'
import _ from 'lodash';

export default {
  name: 'profilePosts',
  props: {
  	name: String
  },
  components: {
  	'avatar': avatar
  },
  mixins: [currentUserMixin, profileImagesMixin, avatarMixin],
  data () {
    return {
    	profileId: this.$route.params.profileId,
		posts: null,
		post: {
			id: null,
			name: this.name,
			content: null,
			timestamp: null,
			likeCount: 0,
			commentCount: 0
		},
		imageURLs: [],
		imageFiles: [],
		comment: null
    }
  },
  watch: {
  	'$route': function() {
  		this.profileId = this.$route.params.profileId
  	}
  },
  computed: {
  	displayPosts: function() {
  		return _.orderBy(this.posts, ['timestamp'], ['desc'])
  	},
  	showComponent: function() {
  		if(this.posts !== null && this.posts !== undefined && this.posts.length > 0) {
  			return true
  		} else {
  			return false
  		}
  	}
  },
  methods: {
  	getPosts: function() {
		var postRef = firebaseApp.database().ref("posts").child(this.profileId)
		postRef.on("value", snapshot => {
			var postData = snapshot.val()
				for (let key in postData) {
					postData[key].id = key;
				}
				this.posts = postData
		})

  	},
  	commentSubmit: function(postId, newComment) {
  		let commentObject = {'postId': postId, 
  			content: newComment, 
  			userId: this.currentUser.id, 
  			user: this.$store.getters.profile.details.name,
  			userAvatarURL: this.$store.getters.profile.avatarURL,
  			timestamp: new Date()
  		}

		let	post = this.posts.find(post => {
			return post.id === postId
		})

		// console.log(commentObject)

  		if(post['comments'] === undefined) {
  			post['comments'] = []
  		}

  		this.$store.dispatch('createPostComment', {userId: this.currentUser.id, data: commentObject})
  			.then(res => {
  				post['comments'].push(commentObject)
  				post.newComment = null
  			}, error => {
  				console.log(error)
  			})
  		
  	},
  	addPost: function() {
  		this.post['timestamp'] = new Date();
  		this.$store.dispatch('createUserProfilePost', {userId: this.currentUser.id, data: this.post, images: this.imageFiles})
  			.then(res => {
  				console.log(res)
  				this.post['imageURLs'] = res.data.imageURLs
  				this.post['id'] = res.data.postId
  				this.posts.unshift(this.post)
  				this.post = {
  					id: null,
  					name: this.name,
  					content: null,
  					timestamp: null,
  					likes: 0,
  					commentCount: 0,
  				}
  				this.imageURLs = []
  				this.imageFiles = []
  			}, error => {
  				console.log(error)
  			})
  	},
  	toggleLikes: function(postId) {
  		// console.log(postId)
		var postRef = firebaseApp.database().ref("posts").child(this.profileId).child(postId)
		// console.log(this.$store.getters.currentUserId)
		postRef.transaction(post => {
			if (post) {
		      if (post.likes && post.likes[this.$store.getters.currentUserId]) {
		        post.likeCount--;
		        post.likes[this.$store.getters.currentUserId] = null;
		      } else {
		        post.likeCount++;
		        if (!post.likes) {
		          post.likes = {};
		        }
		        post.likes[this.$store.getters.currentUserId] = true;
		      }
		    }

		    return post;
		  });
			
		
  	}
  },
  created() {
		this.getPosts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/style-variables';

/*post comment box*/

.post-section {
	margin-bottom: 70px;
}

.post-box {
	background: white;
	display: flex;
	padding: 35px 28px;
	margin-bottom: 24px;
	width: auto;
}

.avatar-border {
	vertical-align: top;
}

.comment-box-container {
	flex-grow: 2;
	flex-basis: auto;
	margin-left: 10px;
	display: inline-flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0px 5px 5px 5px;
}

.comment-box {
	width: 100%;
	flex-basis: auto;
	margin-bottom: 25px;
}

.image-row {
	margin-bottom: 25px;
}

/*post masonry*/

#post-masonry {
	column-count: 1;
	column-gap: 0px;
}

.post-tile {
	background-color: white;
	display: inline-block;
	margin: 0 0 1rem;
	width: 100%;
	padding: 45px 25px;
}

.post-text {
	margin-bottom: 30px;
}

.post-header {
	margin-bottom: 30px;
}

.post-image {
	margin-bottom: 30px;
}

.image-in-row {
	min-width: 250px;
	margin: 0px 10px;
	overflow-y: hidden;
}

.image-row img {
	width: 100%;
}

.multi-image-container {
	width: auto;
	display: flex;
	overflow-x: scroll;
	flex-wrap: nowrap;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: -ms-autohiding-scrollbar;
	margin-bottom: 30px;
}

.comment-circle {
	width: 9px;
	height: 9px;
	border: 2px solid #73020d;
	border-radius: 50%;
	display: inline-block;
	margin-right: 5px;
}

.status {
	display: block;
}

.post-icon {
	margin-right: 14px;
}

.post-icons {
	// margin-bottom: 25px;
	cursor: pointer;
}

.comment-input-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.comment-container {
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 10px;
}

.comment-avatar {
	margin-right: 24px;
	width: 35px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.comment-content {
	flex-grow: 2;
}

.comment-text {
	margin-top: 5px;
}

.icon-count {
	margin-right: 35px;
}

.message-input-container {
	flex-grow: 2;
	margin-left: 10px;
	margin-bottom: 0px;
}

.divider {
	border-width: 2px;
	border-color: #cd9d2b;
	background-color: #cd9d2b;
	color: #cd9d2b;
}

.add-image {
	cursor: pointer;
}


@media all and (min-width: $bp-med) {
	.post-box {
		float: right;
		width: 75%;
		max-width: 900px;
	}

	#post-masonry {
		float: right;
		width: 75%;
		max-width: 900px;
		column-count: 2;
		column-gap: 1rem;
		padding: 0px;
	} 

	.comment-tile {
		width: 100%;
	}
	
}
</style>
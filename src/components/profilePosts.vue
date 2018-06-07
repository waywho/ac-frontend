<template>
	<div class="post-section">
		<div v-if="authorizedUser" class="post-box col-sm-offset-3 col-sm-9">
			<div class="row">
				<div class="col-xs-2 row center-xs">
					<div class="avatar-border avatar-medium user-avatar">
			  			<img :src="currentUserAvatar" />	
			      	</div>
				</div>
				<div class="col-xs-9">
					<textarea v-model="post.content" rows="6"></textarea>
					<div class="row">
						<div v-if="imageURLs">
			          		<div class="multi-image-container">
			          			<div v-for="image in imageURLs" class="image-in-row thumbnail">
			          				<img v-bind:src="image" />
			          			</div>
			          		</div>
		          		</div>
	          		</div>
					<div class="row between-sm">
						<div class="col-sm-8 add-image" v-on:click="onPickFile('postImage')">
							<i class="fa fa-picture-o is-darkgray" aria-hidden="true"></i>
							<span class="smaller is-darkgray" >Add image</span>
							<input v-if="authorizedUser" type="file" ref="postImage" style="display: none" accept="image/*" @change="onPostFilePicked($event, 'cover')" />
						</div>
						<div class="col-sm-4 end-sm col-xs-4 end-xs">
							<button v-on:click="addPost">POST</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="post-masonry" class="col-xs-12 col-sm-offset-3 col-sm-9 col-md-offset-3 col-md-8">
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
		          	<i class="fa fa-heart post-icon smaller" aria-hidden="true"></i><span class="icon-count smaller">{{post.likes}}</span>
		          	<i class="fa fa-comment post-icon smaller" aria-hidden="true"></i><span class="icon-count smaller">{{post.commentCount}} comments</span>
	          	</div>
	          	<hr class="divider" />
	          	<div v-for="(comment, index) in post.comments" class="comment-container">
	          		<div class="comment-avatar">
	          			<div class="avatar-small">
	          				<img :src="userAvatar(comment.userAvatarURL)">
	          			</div>
	          		</div>
	          		<div class="comment-content">
	          			<span class="small medium text-golden">{{comment.user}}</span><br />
	          			<span class="smaller comment-text">{{comment.content}}</span>
	          		</div>
	          	</div>
	          	<div class="comment-input-container">
	          		<div class="avatar-small-border">
		            	<img :src="currentUserAvatar" class="user-avatar" />
		          	</div>
		          	<form class="message-input-container" @submit.prevent="commentSubmit(post.id, post.newComment)">
						<input type="text" class="smaller" name="comment" v-model="post.newComment" placeholder="write a comment" />
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import currentUserMixin from '../mixins/currentUserMixin'
import profileImagesMixin from '../mixins/profileImagesMixin'
import avatarMixin from '../mixins/avatarMixin'
import _ from 'lodash';

export default {
  name: 'profilePosts',
  props: {
  	name: String,
    profileId: String
  },
  mixins: [currentUserMixin, profileImagesMixin, avatarMixin],
  data () {
    return {
   	  posts: null,
      post: {
      	id: null,
      	name: this.name,
      	content: null,
      	timestamp: null,
      	likes: 0,
      	commentCount: 0
      },
      imageURLs: [],
      imageFiles: [],
      comment: null,
    }
  },
  computed: {
  	displayPosts: function() {
  		return _.orderBy(this.posts, ['timestamp'], ['desc'])
  	}
  },
  methods: {
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
  	}
  },
  created() {
		this.$store.dispatch('getProfilePosts', {profileId: this.profileId})
			.then(res => {
				var postsArray = [];
				for (let key in res.data) {
					res.data[key].id = key;
					postsArray.push(res.data[key])
				}
				this.posts = postsArray
				// console.log(this.posts)
			}, error => {
				console.log(error)
			})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*post comment box*/

.user-avatar {
	margin-top: 20px;
}

.post-section {
	height: 100%;
	margin-bottom: 70px;
}

.post-box {
	background: white;
	padding-top: 35px;
	padding-bottom: 35px;
	margin-bottom: 26px;
}

.post-box textarea {
	max-width: 95%;
	margin-bottom: 36px;
	border: 2px solid #d4d4d4;
}

/*post masonry*/

#post-masonry {
	column-count: 2;
	column-gap: 23px;
}

.post-tile {
	background-color: white;
	display: inline-block;
	margin: 0 0 23px;
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
	display: flex;
	overflow-x: auto;
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
	margin-bottom: 25px;
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


@media screen and (max-width: 599px) {

	#post-masonry {
		column-count: 1;
		column-gap: 0px;
		padding: 0px;
	} 

	.comment-tile {
		width: 100%;
	}
	
}
</style>
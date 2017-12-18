<template>
	<div class="post-section">
		<div class="post-box col-sm-offset-3 col-sm-9">
			<div class="row">
				<div class="col-xs-2">
					<div class="row">
			          <div class="avatar-border">
			            <img src="../assets/images/myopera-logo.png" />
			          </div>
			      </div>
				</div>
				<div class="col-xs-9">
					<textarea ></textarea>
					<div class="row between-sm">
						<div class="col-sm-8">
							<i class="fa fa-picture-o is-darkgray" aria-hidden="true"></i>
							<span class="smaller is-darkgray">Add image</span>
						</div>
						<div class="col-sm-4 end-sm col-xs-4 end-xs">
							<button>POST</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="post-masonry" class="col-xs-12 col-sm-offset-3 col-sm-9 col-md-offset-3 col-md-8">
			<div v-for="post in posts" class="post-tile">
				<div class="post-header">
					<span class="name is-golden strong">{{name}}</span>
					<div class="status">
						<span class="smaller">{{ post.timestamp | moment("from")}} </span><div class="comment-circle"></div><span class="smaller">posted a status</span>
					</div>

	          	</div>
	          	<div class="post-text">{{post.content}}</div>
	          	<div v-if="post.imgs.length > 1" class="multi-image-container">
	          		<div v-for="image in post.imgs" class="image-in-row"><img v-bind:src="image" /></div>
	          	</div>
	          	<div v-else-if="post.imgs.length === 1" class="post-image"><img v-bind:src="post.imgs" /></div>

	          	<div class="post-icons">
		          	<i class="fa fa-heart post-icon smaller" aria-hidden="true"></i><span class="icon-count smaller">{{post.likes}}</span>
		          	<i class="fa fa-comment post-icon smaller" aria-hidden="true"></i><span class="icon-count smaller">{{post.comments.length}} comments</span>
	          	</div>
	          	<hr class="divider" />
	          	<div v-for="comment in post.comments" class="comment-container">
	          		<div class="avatar comment-avatar"><img :src="comment.user_img"></div>
	          		<div class="comment-text">
	          			<span class="small medium text-golden">{{comment.user}}</span>
	          			<p class="smaller">{{comment.commentText}}</p>
	          		</div>
	          	</div>
	          	<div class="comment-input-container">
	          		<div class="avatar-small-border">
		            	<img src="../assets/images/myopera-logo.png" />
		          	</div>
		          	<div class="message-input-container">
						<input type="text" class="message-input smaller" placeholder="write a comment" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'posts',
  props: {
  	name: String,
  	posts: Array,
    profileId: String
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*post comment box*/

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
	height: 79px;
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
	width: 100%;
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
	align-items: center;
}

.comment-avatar {
	min-width: 41px;
	margin-right: 24px;
}

.icon-count {
	margin-right: 35px;
}

.message-input-container {
	flex-grow: 2;
	margin-left: 10px;
}

.message-input {
	border: 2px solid #cd9d2b;
}

.divider {
	border-width: 2px;
	border-color: #cd9d2b;
	background-color: #cd9d2b;
	color: #cd9d2b;
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
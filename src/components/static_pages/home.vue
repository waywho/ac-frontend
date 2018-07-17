<template>
	<div class="landing">
		<section class="hero-grid">
            <div class="hero-text">
                <h2 class="hero-heading"><span class="pre-line">Opportunity. Connect.</span> <span class="is-gold">Go.</span></h2>
                <p class="hero-text-content large is-midgray">Join over 1000 operatic artists and companies worldwide. Sign up below to create your account. Connecting you with fellow singers and prospective companies.</p>

                <div class="info-text-controls">
                	<div class="button-package"> 
	                	<router-link to="/" rel="noopener nofollow" class="signup-button is-gold strong">Sign Up Now</router-link>
	               		<hr class="signup-underline" />
	            	</div>
            	</div>
            </div>
            <figure role="group" class="hero-image" id="image-bubbles">
                <div class="image-wrapper">
                    <img alt="An opera singer singer, an orchestra pit, and a theatre seats." :src="require('@/assets/images/hero-balls.png')">
                </div>
         
                <aside role="presentation" aria-hidden="true" class="ball-2 top-40 left-60 anim-diagonal-right bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-20 left-70 anim-horizontal bg-midgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-20 left-40 anim-vertical anim-delay-1 bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-30 left-30 anim-horizontal anim-delay-3 bg-gray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-50 left-50 anim-diagonal-left anim-delay-3 bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-75 left-60 anim-diagonal-left anim-delay-2 bg-midgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-50 left-30 anim-horizontal anim-delay-1 bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-50 left-20 anim-vertical anim-delay-3 bg-midgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-70 left-80 anim-vertical anim-delay-3 bg-gold"></aside>
            </figure>
        </section>
        <section class="hero-grid ">
        	<div class="tile-order-2 hero-image image-start-left" id="image-1">
                <img alt="An opera singer&#39;s profile page in the Artist.Center app." :src="require('@/assets/images/hero-about.png')" />
            </div>

            <div class="hero-text tile-order-1 about-text-grid">
            	<div>
                	<h2 class="subheading">What is Artist.Center?</h2>
                	<div class="h2 heading">A New Way to </div>
            	</div>
                <div class="about-text-content">
                	<transition name="fade-long" mode="out-in">
                    <div v-for="(about, index) in aboutText" v-if="aboutPanel === index + 1":key="'aboutText' + index">
                        <h3 class="h2 is-gold slider-heading">{{about.heading}}</h3>
                        <p class="f-lead large is-midgray">{{about.body}}</p>
                        <ul class="arrow-list lh-list">
                            <li v-for="point in about.points"> 
                                <span>{{point}}</span></li>
                        </ul>
                    </div>
                	</transition>
            	</div>
            	<div class="info-text-controls">
            		<div class="button-package">
            			<router-link to="/signup" rel="noopener nofollow" class=" signup-button is-gold strong">Sign Up now</router-link>
            			<hr class="signup-underline" />
            		</div>
		            <ul class="slick-dots" style="display: block;">
		                <li v-for="dot in aboutText.length" :key="dot + 'aboutdot'" :class="[{'slick-active': aboutPanel === dot}]" @click='aboutPanel = dot'>
		                </li>
		            </ul>
		        	
	        	</div>
        	</div>          
                   
        </section>
       
        <section class="hero-grid">
        	<div class="account-text-container">
	            <div class="account-text">
	            	<div class='account-heading'>
		                <h2 class="heading"><div class="is-lightgray">Choose Your</div><div class="is-gold">Membership</div></h2>
		                <p class="large is-midgray">Discover the various features of Artist.Center. All access is free and yours to discover and connect.</p>
	            	</div>
		            
		            
		            <div class="account-info">
		                <h3 class="is-gold">Artist Account</h3>
		                <ul class="arrow-list lh-list">
		                    <li><span>Free Membership</span></li>
		                    <li><span>3GB Cloud Storage</span></li>
		                    <li><span>Multilingual Support</span></li>
		                    <li><span>Full Email Hosting</span></li>
		                    <li><span>Messaging & Timeline</span></li>
		                    <li><span>Online CV & Media Display</span></li>
		                </ul>
		            </div>
		            <div class="account-info">
		                <h3 class="is-gold">Company Account</h3>
		                <ul class="arrow-list lh-list">
		                    <li><span>Free Membership</span></li>
		                    <li><span>20GB Cloud Storage</span></li>
		                    <li><span>Multilingual Support</span></li>
		                    <li><span>Full Email Hosting</span></li>
		                    <li><span>Messaging & Timeline</span></li>
		                    <li><span>Company Account Features</span></li>
		                    <li><span>Audition Creator & Posting</span></li>
		                    <li><span>Budgeting & Marketing Assistant</span></li>
		                </ul>
		            </div>	
				</div>
				<div class="info-text-controls">
					<div class="button-package">
	            		<router-link to="/signup" rel="noopener nofollow" class=" signup-button is-gold strong">Sign Up Now</router-link>
	            		<hr class="signup-underline" />
            		</div>
	        	</div>
	        </div>
           	<div class="hero-image-3 image-start-right" id="image-2">
                <img alt="An opera singer&#39;s account page in the Artist.Center app." :src="require('@/assets/images/hero-feature.png')" />
            </div>
        </section>
        <section>
        	<div class="conclusion">
        		<h2 class="heading"><span class="is-gold">Everything You Need</span></h2>
        		<h3 class="is-lightgray">to promote your opera career or organization online</h3>
				<div class="learnmore-text-controls">
					<div class="button-package">
	            		<router-link to="/signup" rel="noopener nofollow" class=" signup-button is-gold strong">Learn More</router-link>
	            		<hr class="learnmore-underline" />
            		</div>
	        	</div>
        		<aside role="presentation" aria-hidden="true" class="ball-2 top-40 left-60 anim-diagonal-right bg-lightgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-20 left-70 anim-horizontal bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-30 left-70 anim-diagonal-left bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-2 top-20 left-40 anim-vertical anim-delay-1 bg-lightgray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-30 left-30 anim-horizontal anim-delay-3 bg-gray"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-75 left-60 anim-diagonal-left anim-delay-2 bg-gold"></aside>
                <aside role="presentation" aria-hidden="true" class="ball-1 top-50 left-20 anim-vertical anim-delay-3 bg-gold"></aside>

        	</div>
        </section>
	</div>
</template>

<script>
export default {
	name: 'home',
	data () {
		return {
			aboutPanel: 1,
			featurePanel: 1,
			image1Once: false,
			image2Once: false,
			aboutText: [{
				heading: "Network & Audition",
				body: "What if you could combine a social platform with an audition platform? With Artist.Center your profile acts as the application materials and portfolio for a company to contact you.",
				points: [ 
					"Choose your account type and customize your profile",
					"Connect with fellow singers & colleagues",
					"View auditions and applications right from your profile"
				]
			}, {
				heading: "Stay In Touch",
				body: "With Artist.Center, not only do you have a tool for auditioning and connecting with opera companies and competitions, but you also have a powerful tool to maintain connections and share your portfolio with your colleagues.",
				points: [
					"Display/upload embeds of audio and video directly from any source",
					"Write updates on interactive timelines with likes and comments",
					"Stay in touch via in-app messaging between accounts (coming soon)"
				]				
			}]
		}
	},
	methods: {
		slideImage: function() {
			// console.log($event, 'is in view!')
		},
		switchAbout: function() {
			setInterval((e) => {
				if(this.aboutPanel === this.aboutText.length) {
					this.aboutPanel = 1
				} else {
					this.aboutPanel += 1
				}
				
			}, 6000)
		},
		handleScroll: function(e) {
			var image = document.getElementById('image-1')
			var image2 = document.getElementById('image-2')
			var imageTop = image.getBoundingClientRect().y
			var imageTop2 = image2.getBoundingClientRect().y

			if(imageTop < 500 & !this.image1Once) {
				image.className += " slide-in";
				this.image1Once = true
				this.switchAbout()
			}

			if(imageTop2 < 500 & !this.image2Once) {
				image2.className += " slide-in";
				this.image2Once = true
			}
		}
	},
	created () {
		
	},
	mounted() {
		document.body.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		document.body.removeEventListener('scroll', this.handleScroll);
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/style-variables';
@import '../../styles/landing';
@import '../../styles/bouncing-balls';

h2, .h2.heading {
	color: $color-lightgray;
}

.landing {
	background: white;
}
figure, aside, section {
	display: block;
}

section {
	max-width: $app-max-width;
	min-width: $app-min-width;
	padding: 50px $body-padding-small;
}

section:nth-child(odd) {
	background-color: white;
}

section:nth-child(even) {
	background-color: $color-eggwhite;
}

figure {
	margin: 0px;
}


.hero-grid {
	display: flex;
	flex-direction: column;
}

.hero-image, .hero-image-3 {
	position: relative;
	width: 100%;
	max-width: 32rem;
}

.hero-image img, .hero-image-3 img {
	width: 100%;
	margin: auto;
}

#image-bubbles {
	position: relative; 
	overflow: hidden; 
	z-index: 1; 
	transform: translateX(10%);
}


.image-start-left {
    transform: translateX(-105%);
    -webkit-transform: translateX(-105%);
}

.image-start-right {
    transform: translateX(105%);
    -webkit-transform: translateX(105%);
}

.slide-in {
    animation: slide-in 1s forwards;
    -webkit-animation: slide-in 1s forwards;
}

@keyframes slide-in {
    100% { transform: translateX(0%); }
}

@-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
}

.hero-text {
	width: 100%;
	margin-bottom: 75px;
}

.about-text-content {
	min-height: 475px;
	height: 475px;
	margin-bottom: 1.5rem;
}

.hero-text-content {
	margin-bottom: 1.5rem;
}

.tile-order-1, .tile-order-alt-1 {
	order: 1;
}

.tile-order-2, .tile-order-alt-2 {
	order: 2;
}

.fa-chevron-right {
	margin-right: 1rem;
}

.slider-heading {
	margin-top: 0px;
}

.slick-dots {
    margin:0;
    text-align: center;
    list-style: none;
}

.slick-dots>li{
	height: .75rem;
	width: .75rem;
	max-width: .75rem;
	max-height: .75rem;
	background-color: $color-lightgray;
    display: inline-block;
    border-radius: 50%;
    margin-left:.75rem;
    -webkit-transition: background-color 1s ease-in-out;
    -o-transition: background-color 1s ease-in-out;
    transition: background-color 1s ease-in-out;
    cursor: pointer
}


li.slick-active{
    background-color: $color-darkred;
}

.account-text {
	display: flex;
	flex-direction: column;
}

.account-text-container {
	margin-bottom: 75px;
}


@media all and (min-width: $bp-med) {

	section {
		padding: 50px 75px;
	}

	.hero-heading {
		font-size: 3rem;
		max-width: 20rem;
	}

	.heading {
		font-size: 3rem;
	}


	.hero-grid {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.hero-image {
		width: 40%;
		flex-grow: 1;
		flex-basis: auto;
	}

	.hero-image-3 {
		width: 33%;
	}

	.hero-image img, {
		width: 80%;
		margin: 0 0;
	}

	.hero-image-3 img {
		width: 80%;
	}

	#image-bubbles {
		transform: translateX(29%);
	}

	#image-bubbles img {
		width: 90%;
	}

	.hero-text {
		width: 50%;
		flex-grow: 1;
		max-width: 35rem;
		flex-basis: auto;
	}

	.about-text-content {
		min-height: 400px;
		height: 400px;
		margin-bottom: 1.5rem;
	}


	.tile-order-1, .tile-order-alt-2 {
		order: 2;
	}

	.tile-order-2, .tile-order-alt-1 {
		order: 1;
	}

	.about-text-grid {
		margin-left: 2rem;
	}

    .account-text-container {
    	width: 66%;
    	flex-basis: auto;
    }

    .account-text {
    	flex-direction: row;
    	flex-wrap: wrap;
    }

    .account-heading {
    	width: 100%;
    	flex-basis: auto;
    }

    .account-info {
    	width: 45%;
    	flex-basis: auto;
    }

    .slick-dots li{
        display: block;
        margin:.5rem 0 0
    }
    
}

</style>

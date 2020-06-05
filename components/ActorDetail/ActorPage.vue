<template>	
<div>
	<loading v-show="isLoading"></loading>
		<div class="movie-actor-page" v-if="detail">
			<dir class="actor-page">
				<div class="actor-img">
					<img :src="person.profile_path | profile_img" width="300" height="460">
					<div class="actor-info">
						<ActorInfo :info="person"/>
					</div>
				</div>
				<div class="actor-name">
					<h1>{{person.name}}</h1>
				</div>
				<div class="actor-bio">
					<h3>Biography</h3>
					<p v-html="biospace(biography)"></p>
					<button v-if="moreButton" @click="moreBio = true">More</button>
					<ActorKnownMovies 
					:movie="actorMovieBio" 
					:id="person.id" 
					:department="person.known_for_department">
				</ActorKnownMovies>
			</div>
			<div class="actor-bio-more" v-if="moreBio">
			</div>
			<div class="actor-bio-more-div" v-if="moreBio">
				<div class="actor-bio-more-div-text">
					<h3>Biography</h3>
					<p v-html="biospace(person.biography)"></p>
				</div>
				<button @click="moreBio = false">X</button>
			</div>
		</dir>
	</div>
</div>
</template>

<script>

	import loading from '../loading.vue';
	import ActorInfo from './ActorInfo.vue';
	import ActorKnownMovies from './ActorKnownMovies.vue';
	import {mapState} from 'vuex';

	export default {
		name: 'ActorPage',

		data () {
			return {
				isLoading: true,
				actors_detail: false,
				bio_detail: false,
				moreButton: false,
				moreBio: false,
			}
		},

		components: {
			loading,
			ActorInfo,
			ActorKnownMovies,
		},


		created () {
			
			this.$store.dispatch('getActors', this.id).then(() => {
				this.isLoading = true;
				this.actors_detail = true;
			});
			this.$store.dispatch('actorsMovies', this.id).then(() => {
				this.isLoading = false;
				this.bio_detail = true;
			});
			
			
		},

		methods : {

			biospace(text) {
				return text.replace(/[\n]/g, "<br/>")
			}

		},

		computed: {

			...mapState([
				'person',
				'actorMovieBio',
			]),

			id () {
				return this.$route.params.id;
			},

			detail () {
				return this.bio_detail == true && this.actors_detail == true
			},

			biography () {
				let bio = this.person.biography
				let more = '';

				if(bio.length > 500){
					more = bio.slice(0,bio.slice(0,500).lastIndexOf(' ')) + '...';
					this.moreButton = true;

				}else if(bio.length > 500){
					more = bio;
					
				}else{(bio.length < 0)
					more = `We don't have a biography for ${this.person.name}.`;
				};
				return more;

			},
		},
	}
	

</script>

<style>

.movie-actor-page {
	position: relative;
	width: 1200px;
	height: 1150px;
	margin: auto;
	padding-top: 50px;
	top: -50px;
}



.actor-page {
	width: 1200px;
	min-height: auto;
	max-height: 1150px;
	background-image: linear-gradient(to right, rgb(56, 44, 56) 0, rgb(50, 66, 60) 100%);
	margin: auto;
	margin-bottom: 20px;
	margin-top: 100px;
	border-radius: .50rem;

}

.actor-img {
	position: relative;
	top: 30px;
	left: 30px;
	width: 300px;
	height: 870px;
	background-color: #fff;
	border-radius: .30rem;
	margin-bottom: 20px;
	box-shadow: 5px 4px 5px #000;
}

.actor-img img {
	border-top-right-radius: .30rem;
	border-top-left-radius: .30rem;
}

.actor-name {
	position: relative;
	display: inline-block;
	padding: 5px 5px 5px 0px;
	left: 392px;
	top: -750px;
	text-align: left;
	color: #fff;
}

.actor-bio-div {
	width: 740px;
	height: auto;
}


.actor-bio {
	position: relative;
	width: 770px;
	height: auto;
	margin-left: 350px;
	top: -730px;
	color: #fff;
	left: 43px;
	padding: 20px 5px 25px 0px;
	font-weight: bold;
}

.actor-bio h3 {
	margin-bottom: 20px;
}

.actor-bio button {
	position: absolute;
	margin-top: 20px;
	left: 350px;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	border: none;
	cursor: pointer;
	background: #032541;
	color: #fff;
	font-weight: bold;
	font-size: 16px;
	transition: 300ms;
}

.actor-bio button:hover {
	color: #fed330;
	box-shadow: 0px 5px 10px 5px rgba(0,0,0,0.75);
}

.actor-bio-more {
	position: relative;
	width: 1350px;
	height: 1500px;
	right: 75px;
	top: -2020px;
	overflow: hidden;
	background-color: black;
	opacity: 0.6;
	z-index: 1;
}

.actor-bio-more-div {
	position: fixed;
	width: 700px;
	height: auto;
	bottom: 50px;
	top: 120px;
	margin-left: 250px;
	padding: 20px;
	z-index: 2;
}

.actor-bio-more-div button {
	position: fixed;
	z-index: 2;
	width: 50px;
	height: 50px;
	left: 1040px;
	top: 115px;
	overflow: hidden;
	background-color: #fff;
	border: 1px solid black;
	font-size: 20px;
	color: black;
	cursor: pointer;
	transition: 300ms;

}

.actor-bio-more-div button:hover {
	background: black;
	color: #fff;
	box-shadow: -16px 15px 5px 8px rgba(0,0,0,0.75);
}


.actor-bio-more-div-text {
	position: relative;
	min-height: auto;
	max-height: 400px;
	width: 700px;
	background-color: #fff;
	overflow-x: hidden;
	overflow-y: visible;
	padding: 20px 10px;
	border-radius: .30rem;
	font-weight: bold;
}

.actor-bio-more-div-text h3 {
	margin-bottom: 10px;
}




</style>
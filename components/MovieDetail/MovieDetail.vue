<template>
	<div>
		<loading v-show="isLoading"></loading>
		<div class="container">
			<div class="movie-detail" v-if="detail">
			<div class="detail-top">
				<div class="movie-title">
					<h1>{{movieDetail.title}}  ({{movieDetail.release_date | date}})</h1>
					<div class="relase">
						<div class="genres">
							<h4>{{movieDetail.release_date | release_date}} 
							({{movieDetail.original_language.toUpperCase()}}) / </h4>
							<h4>Time: {{movieDetail.runtime | movie_time}} /</h4>
							<h4>Genre:</h4>
							<ul v-for="genre in genres ">
								<li> {{genre}} </li>
							</ul>
						</div>
					</div>
				</div>
				<div class="detail-poster">
					<img :src="movieDetail.poster_path  | poster" width="300" height="450">
					<div class="movieDetail-vote">
								<h2>{{movieDetail.vote_average | vote}}</h2>
							</div>
					<div class="trailer-button">
						<button @click="trailer = true">
							<img src="../img/multimedia.png" width="20">Watch Trailer
						</button>
					</div>
				</div>
				<Overview :overview="movieDetail.overview"></Overview>
			</div>
			<div class="detail-mid">
				<h2>Cast</h2>
				<h4 v-show="castdiv"> There is no actor information for this movie.</h4>
				<div class="detail-cast" v-for="cast in movieCast.cast.slice(0,6)">
					<router-link :to="`/actor/${cast.id}`">
						<img style="border-radius: .30rem;" :src="cast.profile_path | profile_img" width="110" height="150">
					</router-link>
					<p>{{cast.name}} </p>
				</div>
				<div class="more-cast-button">
					<router-link :to="`/cast-crew/${id}`">
						<button v-show="castButton">All Cast & Crew</button>
					</router-link>
				</div>
			</div>			
			<div class="trailer-div" v-show="trailer">
				<Trailer :trailer="getMovieTrailer.results"/>
				<button @click="trailer = false">X</button>
			</div>
		</div>
		<div class="trailer-backdrop" v-show="trailer"></div>	
		</div>
	</div>
</template>

<script>
	import loading from '../loading.vue';
	import Overview from './Overview.vue';
	import Trailer from './Trailer.vue';
	import {mapState} from 'vuex';


	export default {
		name: 'MovieDetail',
		
		data () {
			return {
				isLoading: true,
				trailer: false,
				hiddenText: true,
				cast_detail: false,
				trailer_detail: false,
				movie_detail: false,
			}

		},

		components: {
			loading,
			Overview,
			Trailer,
		},

		created () { 

			this.$store.dispatch('getdetailMovie', this.id).then(() => {
				this.isLoading = false,
				this.movie_detail = true;
			});	
			this.$store.dispatch('movieCredits', this.id).then(() => {
				this.isLoading = false,
				this.cast_detail = true;
			});
		    this.$store.dispatch('getTrailer', this.id).then(() => {
		    	this.isLoading = false,
		    	this.trailer_detail = true;
		    });
		},

		computed: { 

			...mapState([
				'movieCast',
				'getMovieTrailer',
				]),

			detail () {
				return this.trailer_detail == true && this.cast_detail == true && 
				this.movie_detail == true
			},

			id () {
				return this.$route.params.id;
			},

			movieDetail () {
				return this.$store.state.getDetail[this.id];
			},

			castdiv () {
				return this.movieCast.cast.length == 0 
			},

			castButton () {
				return this.movieCast.cast.length >= 6 && this.movieCast.crew.length >= 0;
			},

			genres () {
			   return this.movieDetail.genres.map(value => Object.values(value.name).join(''))

			},
		},
	}
</script>


<style>

.container {
	position: relative;
	width: 1350px;
	height: 1000px;
	overflow: hidden;
}

.movie-detail {
	padding-top: 100px;
	margin: auto;
	overflow: hidden;
	
}


.detail-top {
	position: relative;
	width: 1200px;
	height: auto;
	margin: auto;
	padding: 30px 40px;
	background-image: linear-gradient(to right, rgb(56, 44, 56) 0, #323542 100%);
	overflow: hidden;
	border-radius: .50rem;
	margin-bottom: 50px;
	
}


.movie-title {
	position: relative;
	width: 820px;
	height: 100px;
	right: 3px;
	top: 70px;
	float: right;
	color: #fff;

}

.relase {
	padding-top: 10px;
	padding-left: 5px;
	position: relative;
	width: 160px;
	height: 20px;
	font-size: 16px;
	font-weight: bold;
	color: #fff;
}

.detail-poster {
 	width: 300px;
 	height: 520px;
 	background-color: #fff;
 	border-radius: .30rem;
    box-shadow: 5px 4px 5px #000;
    margin-bottom: 50px;
 }

.detail-poster img {
   border-top-right-radius: .30rem;
   border-top-left-radius: .30rem;
}

.movieDetail-vote {
	position: absolute;
	display: block;
	padding: 10px;
	top: 460px;
	left: 50px;
	background-color: #fff;
	color: #01B4E4;
	border-radius: 100px;
}

.movieDetail-vote h3 {
	position: relative;
	
}

.movie-content-detail {
	position: relative;
	width: 65px;
	height: 65px;
	border-top: 2px solid #f9ca24;
	top: 0px;
	left: 32.5px;
	border-radius: 32px;
}

.movie-content-detail p {
	position: relative;
	font-size: 35px;
	font-weight: bold;
	left: 10px;
	top: 10px;
	color: #01B4E4;
}

.runTime {
	position: relative;
	width: 220px;
	height: 30px;
	top: -30px;
	margin-left: 10px;
}

.runTime p {
	position: relative;
	font-size: 20px;
	font-weight: bold;
}

.genres {
	position: relative;
	width: 800px;
	height: 40px;
	margin-bottom: 5px;
	margin-left: -6px;
	top: -10px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;

}

.genres ul li {
	display: inline-block;
	margin: 5px 2px;
	padding: 2px 3px; 
	border: 1px solid #999;
	border-radius: .30rem;
	font-size: 16px;
	font-weight: bold;
	background-color: #3c4663eb;
}

.genres p {
	position: relative;
	top: 11px;
}

.genres h4 {
	position: relative;
	top: 10px;
	margin-right: 4px;
}

 .detail-mid {
 	position: relative;
	width: 720px;
	height: 270px;
	margin-left: 450px;
	padding: 5px 0px 0px 5px;
	color: #fff;
	bottom: 400px;
}

.detail-mid h4 {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
	padding-top: 17px;
}

.detail-cast {
	position: relative;
	left: -5px;
	width: 110px;
	height: 200px;
	text-align: center;
	margin: 5px 5px;
	float: left;
	font-weight: bold;
	font-size: 16px;
}

.more-cast-buttom {
	width: 600px;
}

.detail-mid button {
	display: block;
	padding: 5px;
	cursor: pointer;
	font-size: 15px;
	background: #032541;
	border: none;
	border-radius: .30rem;
	transition: 300ms;
	color: #fff;
	font-weight: bold;
}

.detail-mid button:hover {
    color: #fed330;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.75);
}

.trailer-div {
	position: relative;
	top: -2000px;
	width: 1100px;
	height: 650px;
	left: 200px;
	right: 100px;
	z-index: 3;
}

.trailer-div iframe {
	position: fixed;
	top: 30px;
	margin-top: 70px;
}

.trailer-div button {
	position: fixed;
    z-index: 11000;
    width: 50px;
    height: 50px;
    left: 1130px;
    top: 80px;
    overflow: hidden;
    background-color: #fff;
    border: none;
    font-size: 20px;
    color: black;
    cursor: pointer;
    transition: 300ms;
}

.trailer-div button:hover {
	background: black;
	color: #fff;
	-webkit-box-shadow: -16px 15px 5px 8px rgba(0,0,0,0.75);
    -moz-box-shadow: -16px 15px 5px 8px rgba(0,0,0,0.75);
    box-shadow: -16px 15px 5px 8px rgba(0,0,0,0.75);
}

.trailer-button button {
	position: relative;
	width: 300px;
	margin-top: 20px;
	font-size: 25px;
	font-weight: bold;
	height: 30px;
	background-color: #fff;
	border: none;
	cursor: pointer;
	color: black;
	transition: 600ms;
}

.trailer-button button img {
	position: relative;

	left: -15px;
	transition: 200ms;
}

.trailer-button button:hover {
	color: ;
	border: none;
}

.trailer-button button:hover img {
	position: relative;
	left: -5px;
}

.trailer-backdrop {
	position: absolute;
	width: 1350px;
	height: 1850px;
	top: -20px;
	overflow: hidden;
	background-color: black;
	opacity: 0.6;
	z-index: 1;
}



</style>
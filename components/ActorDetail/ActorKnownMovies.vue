<template>
	<div class="Actor-Known-Movie">
		<h3>Known Movie</h3>
		<div class="known-movie-list">
			<div class="known-movie-cart" v-for="movies in filter.slice(0,10)">
				<router-link :to="`/movie/${movies.id}`">
					<img :src="movies.poster_path | poster" width="130" height="190">
				</router-link>
				<p>{{movies.title | title_cut}} </p>
			</div>
			<div class="Actor-Known-Movie-button">
				<router-link :to="`/actor-movie/${this.id}`">
					<button v-show="list.length > 10">Mores</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'Actor-Known-Movie',

		props: { 
			movie: { type: Object, required: true},
			department: {type: String, required: true},
	    },

		computed: {

			id () {
				return this.$route.params.id;
			},

            list () {
            	return this.department == 'Acting' ? this.movie.cast:
            	 this.movie.crew;
			},

			filter () {
				return this.$options.filters.sort(this.list);
			}
		}
	}
	
</script>

<style>
.Actor-Known-Movie {
	position: relative;
	width: 800px;
	height: 530px;
	margin-top: 100px;
	right: 5px;
	left: 5px;

}

.known-movie-list {
	position: relative;
	top: -15px;
	width: 770px;
	right: 20px;
	height: 500px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
}

.known-movie-cart {
	width: 130px;
	height: 240px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	margin: 10px;
	justify-content: center;
	text-align: left;
}

.known-movie-cart img {
	border-radius: .30rem;
}

.known-movie-cart p {
	position: relative;
	margin-bottom: 5px;
}

.Actor-Known-Movie-button {
	width: 150px;
	height: 30px;
}

.Actor-Known-Movie-button button{
	width: 130px;
	height: 30px;
	position: relative;
	top: -5px;
	left: 10px;
	cursor: pointer;
	font-size: 15px;
	background: #032541;
	border: none;
	border-radius: .30rem;
	transition: 300ms;
	color: #fff;
	font-weight: bold;	
}


	
</style>
<template>
	<div>
		<loading v-show="isLoading"></loading>
		<div v-if="actor_all_movie_detail">
			<div class="movie-cart-div">
				<div class="actor-all-movie-cart" v-for="movie in filter">
					<router-link :to="`/movie/${movie.id}`">
						<img :src="movie.poster_path | poster" width="94" height="141">
					</router-link>	
					<div class="movie-title-and-vote">
						<div class="all-movie-title">
							<h3>{{movie.title | title_cut}} ({{movie.release_date | date}})</h3>
						</div>
						<div class="all-movie-div-vote">
							<h3><img src="../img/star1.png" width="18"> {{movie.vote_average | vote}}</h3>
						</div>
					</div>
					<div class="actor-all-movie-overvew-div">
						<p>{{movie.overview | movie_overview_cut}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '../loading.vue';

	export default {
		name: 'Actor-All-Movie',

		data () {
			return {
				isLoading: true,
				actor_all_movie_detail: false,

			}
		},

		components: {
			loading,
		},

			created () {
				this.$store.dispatch('actorsMovies', this.id).then(() => {
				    this.isLoading = false;
				    this.actor_all_movie_detail = true;
			});
			
			
		},

		computed: {

			id () {
				return this.$route.params.id;
			},

			bio () {
				return this.$store.state.actorMovieBio
			},

			movies () {
				return this.bio.cast.length > this.bio.crew.length ? 
				this.bio.cast: this.bio.crew
			},

			filter () {
				return this.$options.filters.sort(this.movies);
			},
		}

	}

</script>

<style>


	.movie-cart-div {
		width: 1200px;
		height: 500px;
		margin: auto;
		margin-bottom: 20px;
		padding-top: 100px;
	    display: flex;
        flex-wrap: wrap;
	    flex-direction: row;
	    justify-content: center;
	}

	.actor-all-movie-cart {
		display: flex;
		width: 502px;
		height: 141px;
		background: #032541;
		padding: 12.80px 16px;
		margin: 10px 30px; 
		flex-wrap: wrap;
	    flex-direction: row;
	    justify-content: center;
	    border-radius: .30rem;
	}

	.actor-all-movie-cart img {
		border-radius: .30rem;
		position: relative;
		right: 8.2px;
	}

	.movie-title-and-vote  {
		position: relative;
		width: 380px;
		height: 40px;
		color: #fff;
		right: -12px;
	}

	.all-movie-title {
		width: 290px;
		height: 20px;
		float: left;
	}

	.all-movie-div-vote {
		position: relative;
		display: inline-block;
		padding: 1px 5px 1px 5px;
		float: right;
		border: none;
		border-radius: .30rem;
		background-color: #01B4E4;
	}

	.actor-all-movie-relese-data {
		position: relative;
		display: inline-block;
		background-color: #01B4E4;
		padding: 1px;
		color: #fff;
		border-radius: .30rem;
		right: -227px;
		top: -115px;
	}

	.actor-all-movie-overvew-div {
		position: relative;
		width: 370px;
		height: 80px;
		top: -105px;
		left: 54px;
		color: #fff;
		font-weight: bold;
	}

	.all-movie-div-vote h3 img {
		position: relative;
		top: 3px;
		left: 1px;
	}

	


</style>
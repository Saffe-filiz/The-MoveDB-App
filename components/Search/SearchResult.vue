<template>
	<div class="Search-Result-Movie">
		<div class="result-movie-div">
			<div class="result-movie-cart" v-for="movie  in moviess" >
				<router-link :to="`/movie/${movie.id}`">
				<img :src="movie.poster_path | poster" width="94" height="141">
			    </router-link>
				<h3>{{movie.title}}</h3>
				<h4>{{movie.release_date | release_date}}</h4>
				<div class="result-movie-cart-overview">
					<p>{{movie.overview | movie_overview_cut}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'SearchResultMovie',

		props: { 
			movies: {type: Array},
		},

		computed: {
			moviess () {
				return this.movies.filter(v => v.media_type == 'movie')
			}
		}
	}

</script>


<style>
	.Search-Result-Movie {
		position: relative;
		margin: 20px 20px 20px 0px;
		width: 500px;
		height: 140px;
		top: 100px;

	}

	.result-movie-cart h3 {
		position: relative;
		left: 125px;
		top: -150px;
	}

	.result-movie-cart h4 {
		position: relative;
		left: 125px;
		top: -150px;
		font-size: 15px;
		color: #999;
	}

	.result-movie-cart img {
		position: relative;
		top: -10px;
		left: -10px;
		border-top-left-radius: .30rem;
		border-bottom-left-radius: .30rem;
	} 

	.result-movie-cart-overview {
		position: absolute;
		width: 670px;
		height: 60px;
		top: 60px;
		left: 135px;
		font-weight: bold;

	}

	.result-movie-cart {
		position: relative;
		left: 133px;
		width: 834px;
		height: 141px;
		padding: 10px;
		background-color: #fff;
		margin-bottom: 20px;
		box-sizing: border-box;
		border-radius: .30rem;
    }
</style>
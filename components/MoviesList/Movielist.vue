<template>
	<div class="list-contanier">
		<div class="cart">
			<div class="poster">
				<router-link :to="`/movie/${this.movie.id}`">
					<img :src="movie.poster_path | poster" width="206" height="312">
				</router-link>
			</div>
			<div class="content">
				<span class="titleAnDdate">
					<p style="font-weight: 700;">{{movie.title | title_cut}}</p>
					<p>{{movie.release_date | release_date}}</p>
				</span>
				<span class="vote">
					<p>{{movie.vote_average | vote}}</p>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	
  export default {
		name: 'MovieList',

		props: { movie: {type: Object, required: true,} },

	}
</script>

<style> 

 .list-contanier {
	position: relative;
	top: 100px;
}

 .cart {
 	width: 206px;
 	height: 390px;
 	margin: 10px 10px;

 }

  .poster {
  	width: 206px;
  	height: 312px;
  }

  .poster  img {
    border-top-left-radius: .30rem;
    border-top-right-radius: .30rem;
  }

  .content {
  	width: 206px;
  	height: 78px;
  	background: #fff;
  	border-bottom-left-radius: .30rem;
 	  border-bottom-right-radius: .30rem;
 	  color: black;
  }

  .titleAnDdate {
  	position: absolute;
   	margin: 0 auto;
  	padding: 26px 10px 12px;
  	font-weight: 500;

  }

  .vote {
  	position: absolute;
  	display: block;
    border-radius: .30rem;
  	padding: 2.5px 5px;
  	left: 20px;
  	top: 312px;
  	background: white;
  	font-weight: bold;
  	font-size: 20px;
    text-align: right;
    background: #fff;
    color: #01B4E4;
  }

</style>

<template>
	<div>
	    <div class="cont">
	    	<h2>{{title1}}</h2>
	    	<h2>{{title2}}</h2>
	    	<h2>{{title3}}</h2>
			<div class="Now-playing-list">
		     	<ul v-for="movie in  list.slice(0,8)">
		     		<li>
		     			<router-link :to="`/movie/${movie.id}`">
		     			    <img :src="movie.poster_path | poster" width="150" height="225">
		     			</router-link>
		     			<p>{{movie.title | title_cut}}</p>
		     			<p class="release_date">{{movie.release_date | release_date}} </p>
		     		</li>
		     	</ul>
		    </div>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'list',
		props: {
		    movies: {type: Object, required: true},
		    title1: {type: String},
		    title2: {type: String}, 
		    title3: {type: String}, 
	    },
	    computed: {
	    	list() {
	    		return this.$options.filters.sort(this.movies.results);
	    	}
	    }
      
}
</script>

<style>

	.cont {
		position: relative;
		top: 90px;
		margin: auto;
		width: 1290px;
		float: left;
		height: 370px;
		background-image: linear-gradient(to right, rgb(56, 44, 56) 0, rgb(99, 78, 60) 100%);
		border-radius: .50rem;
		margin-bottom: 100px;
	}

	.cont h2 {
		position: absolute;
		top: -40px;
		font-size: 25px;
	}

	.Now-playing-list {
		width: auto;
		height: 350px;
		display: inline-flex;		
	}

	.Now-playing-list ul li {
		position: relative;
		top: 60px;
		float: left;
		height: 280px;
		width: 150px;
		margin-left: 10px;
		text-align: center;
		list-style: none;
	}

	.Now-playing-list img {
		font-weight: bolder;
		border-radius: .50rem;
	}

	.Now-playing-list p {
		font-weight: bolder;
		color: #ffff;
	}

	.Now-playing-list h2 {
		position: relative;
		top: 30px;
		left: 15px;
	}

</style>
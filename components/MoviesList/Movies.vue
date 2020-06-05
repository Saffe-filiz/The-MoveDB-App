<template>
	<div>
		<loading v-show="isLoading"></loading>
		<div id="Home" v-if="detail">
			<div class="movieContanier">
				<Movielist v-for="movie in filter" 
				:key="movie.id" :movie="movie"/>
			</div>	
		</div>	
	</div>
</template>

<script>
	import loading from '../loading.vue';
	import Movielist from './Movielist.vue';
	import {mapState} from 'vuex';

	export default {
		name: 'MoveListPage',

		props : {
			name: { type: String, required: true}
		},

		data () {
			return {
				isLoading: true,
				detail: false,
			};
		},

		components: {
			loading,
			Movielist,
		},

		 mounted () {
		     this.$store.dispatch(this.name).then(() => {
				this.detail = true;
				this.isLoading = false;
			});
		},

		computed: {
			...mapState([
				'upcomings',
				'nowplayings',
				'popularsMove',
			]),

			movies () {
				let path = this.name 
				return path == 'upcoming' ? this.upcomings: path == 'now_playing' ? 
				this.nowplayings: this.popularsMove;
			},

			filter () {
                return this.$options.filters.date_sort_movie(this.movies.results)
			}
        },
    } 

</script>

<style>


 #Home {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;

	margin: auto;
}

 .movieContanier {
	position: relative;
	width: 1200px;
	margin: auto;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
}

</style>
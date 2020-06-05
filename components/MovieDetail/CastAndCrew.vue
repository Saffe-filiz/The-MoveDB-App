<template>
	<div>
		<loading v-show="isLoading"></loading>
		<div class="cast-crew-content" v-if="cast">
			<div class="full">
			<div class="cast-crew-list" >
				<div class="cast-title">
					<h1>Cast {{credits.cast.length}}</h1>
				</div>
				<div class="crew-title">
					<h1>Crew {{credits.crew.length}}</h1>
				</div>
				<div class="cast-list-div">
					<CastList :casts="credits.cast" :characterName="characterName"></CastList>
				</div>
				<div class="crew-list-div">
					<CrewList :crews="crewList"></CrewList>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import loading from '../loading.vue';
	import CastList from '../CreditsDetail/CastList.vue';
	import CrewList from '../CreditsDetail/CrewList.vue';

	export default {
		name: 'Cast-and-Crew',

		data () {
			return {
				isLoading: true,
				cast: false,
			}
		},

		components: {
			loading,
			CastList,
			CrewList,
		},

		created () {
			this.$store.dispatch('movieCredits', this.id).then(() => {
				this.isLoading = false;
				this.cast = true;
			});
		},

		methods: {
			characterName (name) {
				return name == '' || name == null ? 'N/A': name
			}

		},

		computed: {

			id () {
				return this.$route.params.id;
			},

			credits () {
				return this.$store.state.movieCast
			},

			crewList () {
                return	this.credits.crew.reduce((result,item) => {( 
                 result[item.department] = result[item.department] || []).push(item); return result}
                ,{});
            	
            },
        }
	}


</script>

<style>

.cast-crew-list {
	width: 1100px;
	height: auto;
	margin: auto;
	padding-top: 100px;
	border: 1px solid #ffff0000;
}


.cast-title {
	position: relative;
	width: 150px;
	height: 50px;
	float: left;
	color: #fff;
}

.crew-title {
	position: relative;
	width: 150px;
	height: 50px;
	right: 300px;
	float: right;
	color: #fff;
}

.cast-list-div {
	position: relative;
	width: 500px;
	height: 400px;
	margin-top: 70px;
}

.crew-list-div {
	position: relative;
	width: 450px;
	height: 400px;
	margin-top: -400px;
	left: 650px;
}



</style>
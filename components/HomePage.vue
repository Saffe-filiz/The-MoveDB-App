<template>
	<div>
		<loading v-show="isLoading"></loading>
	    <div class="homePage">
		    <div class="Home-Page-Min-Container"> 
		    	<div v-if="detail">
		    		<div class="Title-Contanier">
		    			<div class="Title-Contanier-img">
		    				<img :src="`https://image.tmdb.org/t/p/w1280/${background_img}`">
		    			</div>
		    			<div class="opacity">
		    			</div>
		    			<div class="Title-Contanier-Title">
		    				<h2>Welcom My App.</h2>
		    			</div>
		    			<div class="search">
		    				<input type="text" name="search" placeholder="Search  Movie" 
		    				v-model="search">
		    				<button :disabled="isDisabled" @click="searchMovie">
		    					<h2>Search</h2>
		    				</button>
		    			</div>
		    		</div>
		     	<div class="Now-playing">
		     	    <HomePageList :movies="nowplayings" title1="Now play"></HomePageList>
		     	</div>
		     	<div class="upcoming">
		            <HomePageList :movies="upcomings" title2="Upcoming"></HomePageList>
		     	</div>
		     	<div class="popular">
		     	    <HomePageList :movies="popularsMove" title2="Populars"></HomePageList>
		     	</div>
		     </div>
			</div>
		</div>
	</div>
</template>

<script>
	import loading from './loading.vue';
	import HomePageList from './HomePageList.vue'
	import {mapState} from 'vuex';
	
	export default {
		name: 'Main-Page',

		data () {
			return {
				isLoading: false,
				upcoming_list: false,
				playnow: false,
				popular: false,
				search: '',
			}
		},

		components: {
			loading,
			HomePageList,

		},

		created () {
			this.$store.dispatch('now_playing').then(() => {
				this.playnow = true;
				this.isLoading = true;
			});

			this.$store.dispatch('upcoming').then(() => {
				this.upcoming_list = true;
				this.isLoading = true;
			});

			this.$store.dispatch('popular').then(() => {
				this.popular = true;
				this.isLoading = false;
			});

		},

		computed: {
			...mapState([
				'nowplayings',
				'upcomings',
				'popularsMove',
				]),

			detail () {
				return this.playnow == true && this.upcoming_list == true && this.popular == true
			},

			background_img () {
				let random = Math.floor(Math.random() * 20);
				return this.popularsMove.results[random].backdrop_path
			},

			isDisabled () {
                return this.search.length == 0
            }, 
		},
		methods: {
			searchMovie () {
                this.$router.push(`/search/${this.search}`)
                this.search = ''
            },
		}
	}

</script>

<style>

    .homePage {
    	position: absolute;
	    width: 1350px;
	    height: auto;
	    margin: auto;
	    overflow: hidden;

    }

    .Title-Contanier {
    	width: 1200px;
    	height: 400px;
    	margin: auto;
    	margin-top: 65px;
    	overflow: hidden;
    	border-radius: .40rem;
    }

    .Title-Contanier-img img{
    	position: relative;
    	width: 1200px;
    }

    .opacity {
    	position: absolute;
    	top: 0px;
    	width: 1200px;
    	height: 400px;
    	background-color: #212529bf;
    	opacity: 0.6;
    }

    .search {
    	position: absolute;
    	top: 0px;
    	top: 200px;
    	left: 100px;
    }

    .Title-Contanier-Title {
    	position: absolute;
    	top: 130px;
    	font-weight: bold;
    	font-size: 20px;
    	left: 100px;
    	color: #fff;
    }

    .search input {
    	width: 1000px;
    	height: 40px;
    	border-top-left-radius: .60rem;
    	border-bottom-left-radius: .60rem;
    	border: 3px inset;
    	font-size: 20px;
    	text-indent: 10px;
    }

    .search button {
    	position: relative;
    	height: 46px;
    	width: 90px;
    	bottom: 2px;
    	right: 10px;
    	background-color: #01B4E4;
    	color: #fff;
    	border: none;
    	z-index: 2;
    	border-top-right-radius: .60rem;
    	border-bottom-right-radius: .60rem;
    	transition: 300ms;
    	font-size: 10px;
    	cursor: pointer;
    }

    .search button:hover {
    	color: #ffffff8c;
    }

    .Home-Page-Min-Container {
    	position: relative;
    	width: 1300px;
    	height: auto;
    	margin: 0 auto;
    	margin-top: 10px; 
    }

    .release_date {
    	color: #999;
    	padding-top: 5px;
    }

    .Now-playing h2 {
    	position: relative;
    	top: 195px;
    	left: 5px;
    	color: #fff;
    	font-weight: bold;
    	font-size: 35px;
    }

    .upcoming h2 {
    	position: relative;
    	top: 195px;
    	left: 5px;
    	color: #fff;
    	font-weight: bold;
    	font-size: 35px;
    }

    .popular h2 {
    	position: relative;
    	top: 195px;
    	left: 5px;
    	color: #fff;
    	font-weight: bold;
    	font-size: 35px;
    }


</style>
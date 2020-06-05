import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';


import Routers from '../Routers/VueRouter';
import Services from '../Service/Services';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter(Routers);

const store = new Vuex.Store({
	state: {
		nowplayings: {},
		upcomings: {},
		popularsMove: {},
		getDetail: {},
		getMovieTrailer: {},
		movieCast: {},
		person: {},
		actorMovieBio: {},
		searchresult: {},
	},

	getterse: {},

	mutations: {

		nowplay (state, nowlist) {
 			state.nowplayings = nowlist;
		},

		upcomingMovie (state, upcominglist) {
			state.upcomings = upcominglist;
		},

		popularMovie (state, pop) {
			state.popularsMove = pop;
		},

		detailMovie (state, detail) {
			const {id, data} = detail;
			state.getDetail[id] = data; 
		},

		movieTrailer (state, trailer) {
			state.getMovieTrailer = trailer;
		},

		credits (state, credits) {
			state.movieCast = credits;
		},

		movieActor (state, actor) {
			state.person = actor;
		},

		actorAllMovie (state, movies) {
			state.actorMovieBio = movies;
		},

		search_mutations (state, search) {
			state.searchresult = search;
		},

	},
	
	actions: {

		searchs (context, id) {
			return Services.search(id).then(response => context.commit('search_mutations', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		now_playing (context) {
			return Services.nowplayings().then(response => context.commit('nowplay', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		upcoming (context) {
			return Services.upcomings().then(response=> context.commit('upcomingMovie', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		popular (context) {
			return Services.populars().then(response => context.commit('popularMovie', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		getdetailMovie (context, id) {
			return Services.getmoviedetail(id).then(response => context.commit('detailMovie', {
				id: id,
				data: response.data,
			}))
			.catch(error => {
			    console.log(error);
		    });
		},
	
		getActors (context, id) {
			return Services.getActors(id).then(response => context.commit('movieActor', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		getTrailer (context, id) {
			return Services.getMovieTrailer(id).then(response => context.commit('movieTrailer', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		movieCredits (context, id) {
			return Services.getMovieCredits(id).then(response => context.commit('credits', response.data))
			.catch(error => {
			    console.log(error);
		    });
		},

		actorsMovies (context, id) {
            return Services.getActorsMovieBio(id).then(response => context.commit('actorAllMovie',  response.data))
            .catch(error => {
			    console.log(error);
		    });
		},

    }
});

Vue.filter('vote', (vote) => {
	return vote > 9 ? vote: vote.toFixed(1);
});

Vue.filter('date', (date) => {
	return date == null || date == '' ? 'N/A': date.slice(0,4)
});

Vue.filter('date_sort_movie', (date) => {
    return date.sort((f,s) => s.release_date.split('-').join('')- f.release_date.split('-').join(''))		
});

Vue.filter('release_date', (date) => { 
   return date == null || date == '' ? 'N/A': 
   `${new Intl.DateTimeFormat('en-US', { month: 'long'})
   .format(new Date(date))} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`
	
});

Vue.filter('sort', (value) => {
	return value.sort((f,s) => s.vote_count - f.vote_count );
});

Vue.filter('movie_overview_cut', (overvie) => {
	return overvie.length > 100 ? overvie.slice(0,overvie.slice(0,120).lastIndexOf(' ')) 
	+ '...': overvie == '' || overvie == null ? 'N/A': overvie;
});

Vue.filter('movie_time', (time) => {
	return  time == null || time == '' ? 'N/A': `${Math.floor(time / 60)} Hour ${time - (60 * Math.floor(time / 60))} Minute`
})

Vue.filter('poster', (image) => {
	return image == null ? 'https://i.hizliresim.com/TAHFAF.png':`https://image.tmdb.org/t/p/w500/${image}`;
});

Vue.filter('profile_img', (image) => {
	return image == null ? 'https://i.hizliresim.com/wC3K1E.jpg': `https://image.tmdb.org/t/p/w500/${image}`;
})

Vue.filter('title_cut', (title) => {
	return title.length <= 25 ? title: title.slice(0,title.slice(0,20).lastIndexOf(' ')) + '...';
});



new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),

});
import HomePage from '../components/HomePage.vue';
import Movies from '../components/MoviesList/Movies.vue';
import ActorPage from '../components/ActorDetail/ActorPage.vue';
import ActorAllMovie from '../components/ActorDetail/ActorAllMovie.vue';
import CastAndCrew from '../components/MovieDetail/CastAndCrew.vue';
import MovieDetail from '../components/MovieDetail/MovieDetail.vue';
import SearchPage from '../components/Search/SearchPage.vue';



export default {
	routes: [
	{path: '/', component: HomePage,},
	{path: '/movies/:name', props: true, component: Movies},
	{path: '/movie/:id', component: MovieDetail},
	{path: '/actor/:id', component: ActorPage},
	{path: '/cast-crew/:id', component: CastAndCrew},
	{path: '/actor-movie/:id', component: ActorAllMovie},
	{path: '/search/:name', props: true, component: SearchPage},
	
	],

	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { y: 0,  x: 0 }
	}
}
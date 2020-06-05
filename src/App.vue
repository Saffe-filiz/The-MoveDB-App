<template>
	<div id="app">
		<Navigation></Navigation>
		<transition name="fade"  mode="out-in">
		<router-view :key="$route.path"></router-view>
	    </transition>
	</div>
</template>

<script>
	import Navigation from '../components/Navigation.vue'

	export default {
		name: 'app',
		data () {
			return {}
		},
		components: {
			Navigation,
		},

	}
</script>


<style>
    * {
	    margin: 0;
	    padding: 0;
	    text-decoration: none;
    }
	
	html, #app {
		width: 1350px;
		min-height: 800px;
		max-height: auto;
		margin: auto;
		background-color:  #2a2122;
		background-repeat: no-repeat;
        background-attachment: fixed;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s, transform 1s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
		transform: translateX(-30%);
	}

</style>
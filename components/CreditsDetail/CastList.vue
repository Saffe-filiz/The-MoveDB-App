<template>
	<div class="CastList">
		<div class="cast" v-for="cast in casts">
			<router-link :to="`/actor/${cast.id}`">
			<img :src="cast.profile_path | profile_img" width="70" height="100">
		    </router-link>
			<h3>{{cast.name}}</h3>
			<h4>Character: {{characterName(cast.character)}}</h4>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'CastListPage',

		props: { 
			casts: { type: Array, required: true},
			characterName: {type: Function, required: true},
		},
	}

</script>

<style>
	
.cast h3 {
	position: relative;
	left: 80px;
	top: -80px;
	color: #fff;
	font-weight: bold;
}

.cast h4 {
	position: relative;
	left: 80px;
	top: -80px;
	color: #fff;
	font-weight: bold;
}

.cast img {
	margin-bottom: -25px;
	border-radius: .30rem;
}

</style>
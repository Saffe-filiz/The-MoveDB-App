<template>
	<div class="crewList">
		<div v-for="(group, title) in crews">
			<div class="crews-job"><h1>{{title}} {{group.length}}</h1></div>
          <div class="crews" v-for="crew in group">
          	<router-link :to="`/actor/${crew.id}`">
         <img :src="crew.profile_path | profile_img" width="70" height="100">
            </router-link>
        <h3>{{crew.name}}</h3>
        <h4>{{crew.job}} </h4>
    </div>
    </div>
	</div>
</template>

<script>
	
	export default {
		name: 'CrewListPage',
		
		props: { 
			crews: {type: Object, required: true},
		},
	}

</script>

<style>

.crews-job {
	padding: 5px 0px 25px 0px;
	color: #fff;
}

.crews h3 {
	position: relative;
	left: 80px;
	top: -80px;
	color: #fff;
	font-weight: bold;
}

.crews h4 {
	position: relative;
	left: 80px;
	top: -80px;
	color: #fff;
	font-weight: bold;
}

.crews img {
	margin-bottom: -25px;
	border-radius: .30rem;
}

	

</style>
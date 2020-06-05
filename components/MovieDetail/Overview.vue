<template>
	<div class="overview-div">
		<div class="overview-text">
			<h2>Overview</h2>
			<p>{{overviewtext(overview)}}</p>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'Movie-Overview',

		props: {
			overview: { type: String, required: true }
		},

		methods : {
			overviewtext (text) {
				return text.length == 0 || text == null ? 'We don\'t have an overview.': text
				
			},
		}
	}

</script>

<style>
	
	.overview-div {
	position: relative;
	width: 820px;
	height: auto;
	top: -405px;
	left: 375px;
	margin-bottom: 20px;
	padding-top: 20px;
}

.overview-div  h2 {
	color: #fff;
	padding-bottom: 20px;
}

.overview-text {
	position: relative;
	padding-top: 20px;
	padding-right: 10px;
	padding-left: 5px; 
	font-weight: bold;
	color: #fff;
	line-height: 20px;
	height: auto;


}

</style>

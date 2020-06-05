<template>
	<div class="Error-Page">
		<div class="Error-Page-Text">
			<h1>There are no movies that matched your query.</h1>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'ErrorPage'
	}
</script>


<style>
	.Error-Page {
		width: 100%;
		height: 100%;
	}

	.Error-Page-Text{
		position: relative;
		display: inline-block;
		padding: 20px;
		color: #fff;
		left: 320px;
		top: 150px;
	}

</style>
<template>
	<div>
		<div class="trailer-container">
			<iframe id="ytplayer" type="text/html" width="950" height="500"
            :src="`https://www.youtube.com/embed/${trailers}`" frameborder="0" allowfullscreen>
        </iframe>
		</div>
		
	</div>
</template>

<script>
	
	export default {
		name: 'Trailer',
		
		props: {
			trailer: {
				type: Array,
				required: true,
			}
		},

		computed: {
			trailers () {
			   let x = this.trailer;
               x = x.filter(value => value.type == "Trailer");
               return x.length > 0 ? x[0].key: false;
			},
		}
	}

</script>

<style>

.trailer-container {
	width: 1360px;
	margin: auto;
}

.trailer-container h1 {
	position: absolute;
	font-size: 25px;
	color: #fff;
}


</style>


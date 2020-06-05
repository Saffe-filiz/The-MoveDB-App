<template>
	<div class="actor-personal-info">
		<div class="actor-info">
			<h2>Personal Info</h2>
			<h4>Known For</h4>
			<p>{{info.known_for_department}}</p>
			<h4>Gender</h4>
			<p>{{genders(info.gender)}} </p>
			<h4>Birthday</h4>
			<p>{{info.birthday | release_date}}</p>
			<h4>Place of Birth</h4>
			<p>{{placeOfBirth(info.place_of_birth)}}</p>
			<h4>Age</h4>
			<p>{{age}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Personal-Info',

		props: {
			info: { type: Object, required: true},
		},

		methods: {
			genders (gender) {
				return gender == 1 ? 'Woman': gender == 0 || gender == null ? 'N/A': 'Male' ;
			},

			placeOfBirth (loc) {
				return loc == null ? 'N/A': loc
			},

		},

		computed: {
			age () {
				let x = new Date()
				let month = ('' + (x.getMonth() +1)).length > 1 ? (x.getMonth() +1): 
			    ('0' + (x.getMonth() +1));
				let birthday = this.info.birthday;
				let deathday = this.info.deathday;
				const s = v => (v.split('-').join('').slice(0,6));

			    return birthday == null ? 'N/A': deathday !== null ? 
			    `${('' + (s(deathday) - s(birthday))).slice(0,2)} Death`: 
			     (x.getFullYear() + month - s(birthday)).toString().slice(0,2);
			   
			},
		},
	};
		
	
</script>

<style>
	.actor-info {
		width: 300px;
		height: 300px;
		padding: 10px;
		color: black;
	}

	.actor-info h2 {
		margin-bottom: 10px;
		margin-top: 5px;
	}

	.actor-info h4 {
		margin-top: 20px;
		font-weight: bold;
		font-size: 20px;
	}

	.actor-info p {
		font-size: 16px;
		margin-top: 1px;
		font-weight: bold;
		width: 270px;
	}

</style>
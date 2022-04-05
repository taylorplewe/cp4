<template>
	<div class="day">
		<h1>{{date}}</h1>
		<div class="dark">
			<p class="dim">cals</p>
			<p class="dim">prot.</p>
			<p class="dim">carbs</p>
			<p class="dim">fat</p>
			<p>{{cals}}</p>
			<p>{{prot}}</p>
			<p>{{carbs}}</p>
			<p>{{fat}}</p>
		</div>
	</div>
</template>

<style scoped>
	.day {
		box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.2);
	}
	.dark {
		background: #3d6c7f;
		padding: 1rem;
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		color: white;
		text-align: center;
	}
	.dark > p {
		margin: 0;
	}
</style>

<script>
export default{
	name: "Day",
	props: {
		date: {
			type: String,
			required: true
		},
		cals: {
			type: Number,
			required: true
		},
		prot: {
			type: Number,
			required: true
		},
		carbs: {
			type: Number,
			required: true
		},
		fat: {
			type: Number,
			required: true
		}
	},
	data: function() {
		return {

		}
	}
}
</script>

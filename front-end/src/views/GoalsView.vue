<template>
	<div class="goals">
		<p>daily calories goal:</p>
		<input type="number" v-model="cals"/>
		<p>daily protein goal:</p>
		<input type="number" v-model="prot"/>
		<p>daily carbs goal:</p>
		<input type="number" v-model="carbs"/>
		<p>daily fat goal:</p>
		<input type="number" v-model="fat"/>
	</div>
</template>

<style scoped>
	.goals {
		width: 50%;
		margin: auto;
		display: grid;
		grid-template-columns: 50% 80px;
		column-gap: 2rem;
		row-gap: 2rem;
	}
	p {
		font-size: 18pt;
		font-style: italic;
		margin: 0;
	}
	.goals > p {
		text-align: right;
	}
</style>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'GoalsView',
	data: function() {
		return {
			cals: null,
			prot: null,
			carbs: null,
			fat: null
		}
	}
}
</script>

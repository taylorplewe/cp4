<template>
	<p v-if="loading" class="loading">Fetching data...</p>
	<div class="goals" v-else>
		<p>daily calories goal:</p>
		<input type="number" @change="updateGoals" v-model="cals"/>
		<p>daily protein goal:</p>
		<input type="number" @change="updateGoals" v-model="prot"/>
		<p>daily carbs goal:</p>
		<input type="number" @change="updateGoals" v-model="carbs"/>
		<p>daily fat goal:</p>
		<input type="number" @change="updateGoals" v-model="fat"/>
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

	@media (max-width: 980px) {
		.goals {
			width: 100%;
		}
		p {
			font-size: 12pt;
		}
	}
</style>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
	name: 'GoalsView',
	data: function() {
		return {
			cals: null,
			prot: null,
			carbs: null,
			fat: null,
			uid: "",
			loading: 0
		}
	},
	methods: {
		async getGoals() {
			try {
				this.loading++;
				let goals = await axios.get('/api/goals/' + this.uid);
				if (goals.data) {
					this.cals = goals.data.cals;
					this.prot = goals.data.prot;
					this.carbs = goals.data.carbs;
					this.fat = goals.data.fat;
				} else {
					// create a set of goals
					await axios.post('/api/goals/' + this.uid);
				}
			} catch(e) {
				console.error(e);
			} finally { this.loading--; }
		},
		async updateGoals() {
			try {
				await axios.put('/api/goals/' + this.uid, {
					cals: this.cals,
					prot: this.prot,
					carbs: this.carbs,
					fat: this.fat
				});
			} catch(e) {
				console.error(e);
			}
		}
	},
	created: function() {
		// first get user ID from URL
		const url = new URLSearchParams(location.search);
		this.uid = url.get("uid");

		// then get goals from user
		this.getGoals();
	}
}
</script>

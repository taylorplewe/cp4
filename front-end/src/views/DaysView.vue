<template>
	<p v-if="loading" class="loading">Fetching data...</p>
	<div v-else>
		<div class="days">
			<Day v-for="(day, ind) in days" :key="ind"
				:date="day.date"
				:cals="day.cals"
				:prot="day.prot"
				:carbs="day.carbs"
				:fat="day.fat"></Day>
		</div>
		<p style="margin-top:8rem; text-align: center;">(some fake days are added to show styling)</p>
	</div>
</template>

<style scoped>
	.days {
		margin-top: 4rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 2rem;
		row-gap: 2rem;
	}

	@media (max-width: 980px) {
		.days {
			display: revert;
			padding: 0 1rem;
		}
	}
</style>

<script>
const exdays = [
	{
		date: "4-1-2022",
		cals: 50,
		prot: 60,
		carbs: 618,
		fat: 40
	},
	{
		date: "4-2-2022",
		cals: 80,
		prot: 45,
		carbs: 241,
		fat: 46
	},
	{
		date: "4-3-2022",
		cals: 963,
		prot: 85,
		carbs: 714,
		fat: 12
	},
	{
		date: "3-28-2022",
		cals: 695,
		prot: 554,
		carbs: 71,
		fat: 14
	}
];

// @ is an alias to /src
import Day from '@/components/Day.vue'
import axios from 'axios';

export default {
	name: 'DaysView',
	components: {
		Day
	},
	data: function() {
		return {
			days: exdays,
			uid: "",
			loading: 0
		}
	},
	methods: {
		async getDays() {
			try {
				this.loading++;
				let res = await axios.get('/api/days/' + this.uid);
				if (res.data) {
					this.days = [...res.data, ...this.days];
					this.orderDates();
				}
			} catch (e) {
				console.error(e);
			} finally { this.loading--; }
		},
		orderDates() {
			this.days.sort((dayA, dayB) => {
				let dayObjA = new Date(dayA.date);
				let dayObjB = new Date(dayB.date);
				let res = dayObjB.valueOf() - dayObjA.valueOf();
				return res;
			});
		}
	},
	created: function() {
		// first get user ID from URL
		const url = new URLSearchParams(location.search);
		this.uid = url.get("uid");

		// then get data for user
		this.getDays();
	}
}
</script>

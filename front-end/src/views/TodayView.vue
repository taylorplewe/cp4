<template>
	<p v-if="loading" class="loading">Fetching data...</p>
	<div class="today" v-else-if="render">
		<h1>{{date}}</h1>

		<!-- column headers -->
		<div class="itemGrid" style="font-style: italic;">
			<div></div>
			<p>food name</p>
			<p>cals</p>
			<p>prot.</p>
			<p>carbs</p>
			<p>fat</p>
		</div>

		<!-- for adding one -->
		<Item ref="currItem" :editable="false" nameDropdown :items="items"><button @click="addItem">+ add item</button></Item>

		<Item v-for="(item, ind) in todaysItems" :key="ind"
			:editable="false"
			:nameEditable="false"
			:nameProp="item.name"
			:calsProp="item.cals"
			:protProp="item.prot"
			:carbsProp="item.carbs"
			:fatProp="item.fat"><button @click="removeItem(ind)">Remove</button></Item>

		<!-- totals -->
		<div class="itemGrid total" style="font-style: italic; margin-top: 4rem; font-weight: bold; color: #3d6c7f;">
			<p>total:</p>
			<div></div>
			<p>{{totCals}}</p>
			<p>{{totProt}} g</p>
			<p>{{totCarbs}}</p>
			<p>{{totFat}} g</p>
		</div>

		<!-- goals -->
		<div v-if="goalCals != null" class="itemGrid total" style="font-style: italic; margin-top: 0;">
			<p>from goals:</p>
			<div></div>
			<p>{{totCals - goalCals > 0 ? '+' : ''}}{{totCals - goalCals}}</p>
			<p>{{totProt - goalProt > 0 ? '+' : ''}}{{totProt - goalProt}} g</p>
			<p>{{totCarbs - goalCarbs > 0 ? '+' : ''}}{{totCarbs - goalCarbs}}</p>
			<p>{{totFat - goalFat > 0 ? '+' : ''}}{{totFat - goalFat}} g</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue';
import axios from 'axios';

export default {
	name: 'TodayView',
	components: {
		Item
	},
	data: () => {
		return {
			todaysItems: [],
			items: [],
			totCals: 0,
			totProt: 0,
			totCarbs: 0,
			totFat: 0,
			goalCals: null,
			goalProt: null,
			goalCarbs: null,
			goalFat: null,
			render: true,
			date: null,
			uid: "",
			loading: 0
		}
	},
	methods: {
		addItem: function() {
			if (this.$refs.currItem.name == "" ||
				this.$refs.currItem.cals == null ||
				this.$refs.currItem.prot == null ||
				this.$refs.currItem.carbs == null ||
				this.$refs.currItem.fat == null)
				return;
			this.todaysItems.push({
				name: this.$refs.currItem.name,
				cals: this.$refs.currItem.cals,
				prot: this.$refs.currItem.prot,
				carbs: this.$refs.currItem.carbs,
				fat: this.$refs.currItem.fat,
				_id: this.$refs.currItem.id
			});
			this.$refs.currItem.name = "";
			this.$refs.currItem.cals = null;
			this.$refs.currItem.prot = null;
			this.$refs.currItem.carbs = null;
			this.$refs.currItem.fat = null;
			this.calcTotals();

			// add day if needs be
			if (this.todaysItems.length == 1)
				this.addDay();
			else
				this.updateDay();
		},
		removeItem: function(ind) {
			this.todaysItems.splice(ind, 1);
			this.render = false;
			this.$nextTick(() => {
				this.render = true;
			});
			this.calcTotals();

			// delete day if needs be
			if (!this.todaysItems.length) {
				console.log("ben");
				this.deleteDay();
			} else {
				this.updateDay();
			}
		},
		calcTotals: function() {
			this.totCals = 0;
			this.totProt = 0;
			this.totCarbs = 0;
			this.totFat = 0;
			this.todaysItems.forEach(item => {
				this.totCals += item.cals;
				this.totProt += item.prot;
				this.totCarbs += item.carbs;
				this.totFat += item.fat;
			})
		},
		async getTodaysItems() {
			try {
				this.loading++;
				let res = await axios.get('/api/days/today/' + this.uid);
				if (res.data) {
					console.log(res.data);
					this.todaysItems = res.data.items;
					this.calcTotals();
				}
			} catch(e) {
				console.error(e);
			} finally { this.loading--;}
		},
		async getAllItems() {
			try {
				this.loading++;
				let res = await axios.get('/api/items/' + this.uid);
				if (res.data) {
					this.items = res.data;
				}
			} catch(e) {
				console.error(e);
			} finally { this.loading--;}
		},
		async addDay() {
			try {
				let ids = this.todaysItems.map(item => { return item._id });
				console.log(ids);
				let day = {
					date: this.date,
					cals: this.totCals,
					prot: this.totProt,
					carbs: this.totCarbs,
					fat: this.totFat,
					items: ids,
					userID: this.uid
				}
				await axios.post('/api/days/' + this.uid, day);
			} catch(e) {
				console.error(e);
			}
		},
		async updateDay() {
			try {
				let ids = this.todaysItems.map(item => { return item._id });
				let day = {
					cals: this.totCals,
					prot: this.totProt,
					carbs: this.totCarbs,
					fat: this.totFat,
					items: ids,
					userID: this.uid
				}
				await axios.put('/api/days/' + this.date + '/' + this.uid, day);
			} catch(e) {
				console.error(e);
			}
		},
		async deleteDay() {
			try {
				await axios.delete('/api/days/' + this.date + '/' + this.uid);
			} catch(e) {
				console.error(e);
			}
		},
		async getGoals() {
			try {
				this.loading++;
				let res = await axios.get('/api/goals/' + this.uid);
				console.log(res);
				if (!res.data) return;
				this.goalCals = res.data.cals;
				this.goalProt = res.data.prot;
				this.goalCarbs = res.data.carbs;
				this.goalFat = res.data.fat;
			} catch (e) {
				console.error(e);
			} finally { this.loading--;}
		}
	},
	created: function() {
		// first get user ID from URL
		const url = new URLSearchParams(location.search);
		this.uid = url.get("uid");

		// then get data for this user
		this.getAllItems();
		this.getTodaysItems();
		this.getGoals();
		console.log("done");
	},
	mounted: function() {
		this.calcTotals();
		this.date = new Date();
		this.date = this.date.toLocaleDateString("en-US").replace(/\//g, "-");
	}
}
</script>

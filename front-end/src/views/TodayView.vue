<template>
	<div class="today" v-if="render">
		<h1>{{date}}</h1>

		<div class="itemGrid" style="font-style: italic;">
			<div></div>
			<p>food name</p>
			<p>cals</p>
			<p>protein</p>
			<p>carbs</p>
			<p>fat</p>
		</div>

		<!-- for adding one -->
		<Item ref="currItem" :editable="false" nameDropdown :items="items"><button @click="addItem">+ add item</button></Item>

		<Item v-for="(item, ind) in items" :key="ind"
			:editable="false"
			:nameEditable="false"
			:nameProp="item.name"
			:calsProp="item.cals"
			:protProp="item.prot"
			:carbsProp="item.carbs"
			:fatProp="item.fat"><button @click="removeItem(ind)">Remove</button></Item>

		<!-- totals -->
		<div class="itemGrid total" style="font-style: italic; margin-top: 4rem;">
			<p>Total:</p>
			<div></div>
			<p>{{totCals}}</p>
			<p>{{totProt}} g</p>
			<p>{{totCarbs}}</p>
			<p>{{totFat}} g</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'

export default {
	name: 'TodayView',
	components: {
		Item
	},
	data: () => {
		return {
			items: [
				{
					name: "spinach",
					cals: 500,
					prot: 400,
					carbs: 50,
					fat: 40
				},
				{
					name: "broccoli",
					cals: 354,
					prot: 198,
					carbs: 51,
					fat: 20
				},
				{
					name: "eggs",
					cals: 687,
					prot: 467,
					carbs: 54,
					fat: 10
				},
			],
			totCals: 0,
			totProt: 0,
			totCarbs: 0,
			totFat: 0,
			render: true,
			date: null
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
			this.items.push({
				name: this.$refs.currItem.name,
				cals: this.$refs.currItem.cals,
				prot: this.$refs.currItem.prot,
				carbs: this.$refs.currItem.carbs,
				fat: this.$refs.currItem.fat,
			});
			this.$refs.currItem.name = "";
			this.$refs.currItem.cals = null;
			this.$refs.currItem.prot = null;
			this.$refs.currItem.carbs = null;
			this.$refs.currItem.fat = null;
			this.calcTotals();
		},
		removeItem: function(ind) {
			this.items.splice(ind, 1);
			this.render = false;
			this.$nextTick(() => {
				this.render = true;
			})
		},
		calcTotals: function() {
			this.totCals = 0;
			this.totProt = 0;
			this.totCarbs = 0;
			this.totFat = 0;
			this.items.forEach(item => {
				this.totCals += item.cals;
				this.totProt += item.prot;
				this.totCarbs += item.carbs;
				this.totFat += item.fat;
			})
		}
	},
	mounted: function() {
		this.calcTotals();
		this.date = new Date();
		this.date = this.date.toLocaleDateString("en-US");
	}
}
</script>

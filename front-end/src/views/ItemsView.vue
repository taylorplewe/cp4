<template>
	<div class="items" v-if="render">
		<Item v-for="(item, ind) in items" :key="ind"
			:nameProp="item.name"
			:calsProp="item.cals"
			:protProp="item.prot"
			:carbsProp="item.carbs"
			:fatProp="item.fat"
			><button @click="removeItem(ind)">Remove</button></Item>

		<div class="itemGrid">
			<button @click="newItem">+ new item</button>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'

const exVals = [
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
]

export default {
	name: 'ItemsView',
	components: {
		Item
	},
	data: function() {
		return {
			items: exVals,
			render: true
		}
	},
	methods: {
		removeItem: function(ind) {
			this.items.splice(ind, 1);
			this.render = false;
			this.$nextTick(() => {
				this.render = true;
			});
		},
		newItem: function() {
			this.items.push({
				name: "",
				cals: null,
				prot: null,
				carbs: null,
				fat: null
			})
		}
	}
}
</script>

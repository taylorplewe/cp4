<template>
	<p v-if="loading" class="loading">Fetching data...</p>
	<div class="items" v-else-if="render">
		<!-- column headers -->
		<div class="itemGrid" style="font-style: italic;">
			<div></div>
			<p>food name</p>
			<p>cals</p>
			<p>prot.</p>
			<p>carbs</p>
			<p>fat</p>
		</div>

		<Item v-for="(item, ind) in items" :key="ind" :ref="`item-${ind}`"
			:nameProp="item.name"
			:calsProp="item.cals"
			:protProp="item.prot"
			:carbsProp="item.carbs"
			:fatProp="item.fat"
			:idProp="item._id"
			@updateVals="updateItem(ind)"
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
import Item from '@/components/Item.vue';
import axios from 'axios';

export default {
	name: 'ItemsView',
	components: {
		Item
	},
	data: function() {
		return {
			items: [],
			render: true,
			uid: "",
			loading: 0
		}
	},
	methods: {
		removeItem: function(ind) {
			this.deleteItem(ind);
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
				fat: null,
				_id: null
			})
		},
		async getItems() {
			try {
				this.loading++;
				let res = await axios.get('/api/items/' + this.uid);
				this.items = res.data;
			} catch (e) {
				console.error(e);
			} finally{this.loading--;}
		},
		async updateItem(ind) {
			try {
				let item = this.$refs[`item-${ind}`][0];
				
				// if any vals are blank, don't do anything
				if (!item.name.length || item.cals == null || item.prot == null || item.carbs == null || item.fat == null)
					return;

				// if doesn't have id, create new item
				if (!item.id) {
					try {
						let res = await axios.post('/api/items/' + this.uid, {
							name: item.name,
							cals: item.cals,
							prot: item.prot,
							carbs: item.carbs,
							fat: item.fat,
							uid: this.uid
						});
						item.id = res.data._id;
						console.log(res);
						console.log("created new one and got back id " + res.data._id);
					} catch (e) {
						console.error(e);
					}
				} else { // otherwise just update it
					try {
						await axios.put('/api/items/' + item.id + '/' + this.uid, {
							name: item.name,
							cals: item.cals,
							prot: item.prot,
							carbs: item.carbs,
							fat: item.fat
						});
						console.log("updated one");
					} catch (e) {
						console.error(e);
					}
				}
			} catch (e) {
				console.error(e);
			}
		},
		async deleteItem(ind) {
			try {
				let id = this.$refs[`item-${ind}`][0].id;
				if (!id)
					return;

				await axios.delete('/api/items/' + id);
			} catch (e) {
				console.error(e);
			}
		}
	},
	created: function() {
		// first get user ID from URL
		const url = new URLSearchParams(location.search);
		this.uid = url.get("uid");

		// then get food items for user
		this.getItems();
	}
}
</script>

<template>
	<div class="item itemGrid">
		<div><slot></slot></div> <!-- where a label could go -->

		<input v-model="name" @change="emitUpdate" type="text" v-if="editable"/>
		<select v-else-if="nameDropdown" v-model="name" ref="drop" @change="updateVals">
			<option disabled selected value>(pick a food item)</option>
			<option v-for="(item, ind) in items" :key="ind">{{item.name}}</option>
		</select>
		<p v-else>{{name}}</p>

		<input v-model="cals" @change="emitUpdate" type="number" v-if="editable"/>
		<p v-else>{{cals != null ? cals : '--'}}</p>

		<input v-if="editable" @change="emitUpdate" v-model="prot" type="number"/>
		<p v-else>{{prot != null ? `${prot} g` : '--'}}</p>

		<input v-model="carbs" @change="emitUpdate" type="number" v-if="editable"/>
		<p v-else>{{carbs != null ? carbs : '--'}}</p>

		<input v-if="editable" @change="emitUpdate" v-model="fat" type="number"/>
		<p v-else>{{fat != null ? `${fat} g` : '--'}}</p>

	</div>
</template>

<style scoped>
	p {
		font-style: italic;
	}
</style>

<script>
export default {
	name: 'Item',
	props: {
		editable: {
			type: Boolean,
			default: true
		},
		nameDropdown: {
			type: Boolean,
			default: false
		},
		nameProp: {
			type: String,
			default: ""
		},
		calsProp: {
			type: Number,
			default: null
		},
		protProp: {
			type: Number,
			default: null
		},
		carbsProp: {
			type: Number,
			default: null
		},
		fatProp: {
			type: Number,
			default: null
		},
		idProp: {
			type: String,
			default: null
		},
		items: {
			type: Array,
			default: null
		}
	},
	data: function() {
		return {
			name: this.nameProp,
			cals: this.calsProp,
			prot: this.protProp,
			carbs: this.carbsProp,
			fat: this.fatProp,
			id: this.idProp
		}
	},
	methods: {
		updateVals: function() {
			let ind = this.$refs.drop.selectedIndex - 1;
			this.cals = this.items[ind].cals;
			this.prot = this.items[ind].prot;
			this.carbs = this.items[ind].carbs;
			this.fat = this.items[ind].fat;
			this.id = this.items[ind]._id
		},
		emitUpdate: function() {
			this.$emit("updateVals");
		}
	}
}
</script>

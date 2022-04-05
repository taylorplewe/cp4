import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '../views/TodayView.vue'
import DaysView from '../views/DaysView.vue'
import ItemsView from '../views/ItemsView.vue'
import GoalsView from '../views/GoalsView.vue'

const routes = [
	{
		path: '/',
		name: 'today',
		component: TodayView
	},
	{
		path: '/days',
		name: 'days',
		component: DaysView
	},
	{
		path: '/items',
		name: 'items',
		component: ItemsView
	},
	{
		path: '/goals',
		name: 'goals',
		component: GoalsView
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router

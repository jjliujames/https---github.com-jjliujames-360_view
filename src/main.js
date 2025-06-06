import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import ExecutiveView from './components/ExecutiveView.vue'
import MetroView from './components/MetroView.vue'
import MarketView from './components/MarketView.vue'
import RegionView from './components/RegionView.vue'
import RelationshipManagerView from './components/RelationshipManagerView.vue'
import RelationshipView from './components/RelationshipView.vue'
import ClientView from './components/ClientView.vue'
import AccountView from './components/AccountView.vue'

const routes = [
    { path: '/', redirect: '/executive' },
    { path: '/executive', component: ExecutiveView, name: 'Executive' },
    { path: '/metro/:metroId', component: MetroView, name: 'Metro', props: true },
    { path: '/metro/:metroId/market/:marketId', component: MarketView, name: 'Market', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId', component: RegionView, name: 'Region', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId', component: RelationshipManagerView, name: 'RelationshipManager', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/client/:clientId', component: ClientView, name: 'RMClient', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId', component: RelationshipView, name: 'Relationship', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId/client/:clientId', component: ClientView, name: 'Client', props: true },
    { path: '/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId/client/:clientId/account/:accountId', component: AccountView, name: 'Account', props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Always scroll to top on route change
        return { top: 0 }
    }
})

const app = createApp(App)
app.use(router)
app.mount('#app') 
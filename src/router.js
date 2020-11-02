import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home'
import DcHeroes from './pages/DcHeroes'
import Calendar from './pages/Calendar'

const routes = [
    {path: '/', component: Home},
    {path: '/dc-heroes', component: DcHeroes},
    {path: '/Calendar', component: Calendar},

]
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;
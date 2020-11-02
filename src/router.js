import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home'
import DcHeroes from './pages/DcHeroes'
import Calendar from './pages/Calendar'
import Markdown from './pages/Markdown'

const routes = [
    {path: '/', component: Home},
    {path: '/dc-heroes', component: DcHeroes},
    {path: '/Calendar', component: Calendar},
    {path: '/Markdown', component: Markdown}, 

]
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;
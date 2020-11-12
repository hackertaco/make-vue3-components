import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home'
import DcHeroes from './pages/DcHeroes'
import Calendar from './pages/Calendar'
import Markdown from './pages/Markdown'
import Slider from './pages/slider'
import Calculator from './pages/Calculator'

const routes = [
    {path: '/', component: Home},
    {path: '/dc-heroes', component: DcHeroes},
    {path: '/calendar', component: Calendar},
    {path: '/markdown', component: Markdown}, 
    {path: '/slider', component: Slider}, 
    {path: '/calculator', component: Calculator}

]
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;
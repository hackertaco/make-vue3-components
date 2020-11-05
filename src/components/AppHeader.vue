<template>
<nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2">
    <router-link v-for="item in list" :key="item.to" class="mx-2" :to="item.to">{{item.title}}</router-link>
    <button v-if="!isLoggedIn" class="mx-2" @click="$emit('open-login-modal')">Login</button>
    <button v-else class="mx-2" @click="logout">Log out</button>
</nav>
</template>

<script>
import firebase from '../utilities/firebase'
export default {
    props: {
        'isLoggedIn': {
            type: Boolean,
            required: false
        }
    },
    //오류를 사전에 방지할 수 있음.
    data() {
        return {
            list: [{

                    title: 'Home',
                    to: '/'
                },
                {

                    title: 'Dc Heroes',
                    to: '/dc-heroes'
                },
                {
                    title: 'Calendar',
                    to: '/calendar'
                },
                {
                    title: 'Markdown',
                    to: '/markdown'
                },
                {
                    title: 'Slider Carousel',
                    to: '/slider'
                }
            ]
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>

</style>

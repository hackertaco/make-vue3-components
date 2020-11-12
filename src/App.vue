<template>
<AppHeader :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen=true" />
<div class="w-full flex">
    <router-view></router-view>
</div>
<teleport to="body">
    <LoginModal v-if="isLoginOpen" @close-login='isLoginOpen=false' />
</teleport>
</template>

<script>
import AppHeader from './components/AppHeader';
import LoginModal from './components/LoginModal'
import firebase from './utilities/firebase'

export default {
    components: {
        AppHeader,
        LoginModal
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.isLoggedIn = true;
                this.authUser = user
            } else {
                console.log('no user')
                this.isLoggedIn = false;
                this.authUser = {}
            }
        })
    },
    data() {
        return {
            isLoginOpen: false,
            isLoggedIn: false,
            authUser: {}
        }
    }

}
</script>

<style >

</style>

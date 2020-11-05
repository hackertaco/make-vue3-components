<template>
<section class="my-5 text-center">
    <button class="text-center border rounded px-2" @click="loginWithGoogle">
        Login With Google
    </button>
</section>
</template>

<script>
import firebase from '../../utilities/firebase'
export default {
    methods: {
        loginWithGoogle() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$emit("close-login-from-google")
            }).catch(function () {

            });
        }
    }
}
</script>

<style>

</style>

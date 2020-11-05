<template>
<section @click="close()" class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"></section>
<div class="absolute inset-0 ">
    <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
            <div class="p-2 border ">
                <h1 class="text-xl text-center">
                    Login
                </h1>
                <form class="p-2 my-2" @submit.prevent="submit">
                    <div class="my-4">
                        <label for="">Email or Username</label>
                        <input type="text" class="rounded shadow p-2 w-full" v-model="email" placeholder="Enter your Email or Username" ref="newIdRef">
                    </div>
                    <div class="my-4">
                        <label for="">Password</label>
                        <input type="password" class="rounded shadow p-2 w-full" v-model="password" placeholder="Enter your password">
                    </div>
                    <div class="my-4">
                        <button type="submit" class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white">
                            <span v-if="!isLoading">
                                Login
                            </span>
                            <span v-else>⏳</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from '../utilities/firebase';
export default {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
        }
    },
    methods: {
        submit() {
            this.isLoading = true
            //submit the form
            // axios.post('url',this.form)
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                this.email = '';
                this.password = '';
                this.isLoading = false;
                this.close();
            }).catch(e => {
                console.log(e)
            })
        },
        close() {
            this.$emit('close-login')
        }
    },
    mounted() {
        this.$refs.newIdRef.focus()
    }

}
</script>

<style>

</style>

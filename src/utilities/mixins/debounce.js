export default {
    data(){
        return {
            timeout: ''
        }
    },
    methods:{
        debounce(func, wait) {

            clearTimeout(this.timeout)
            this.timeout = setTimeout(func, wait)
        }
    }
}
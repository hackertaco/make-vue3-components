import {reactive, ref} from 'vue'
export default function() {

    const timeout = reactive(ref(''));
    function debounce(func, wait){
        clearTimeout(timeout.value)
        timeout.value = setTimeout(func, wait) 
    }
    
    return {debounce}
}
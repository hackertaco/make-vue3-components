import {onMounted, onUnmounted} from 'vue'
export default function useWindowEvent(eventName,handleKeydown){

     onMounted(() => {
            window.addEventListener(eventName,handleKeydown)
        })
        onUnmounted(() => {
            window.removeEventListener(eventName,handleKeydown)
        })
}
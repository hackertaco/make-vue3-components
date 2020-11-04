<template>
<div class="flex flex-wrap w-full relative">
    <div class="absolute w-full" v-for="(color,index) in sliders" :key=" color">
        <transition name="fade">
            <div :class="color" v-if="currentSlide === index" style="height: 350px"></div>
        </transition>
    </div>
    <div class="w-full" style="height: 340px">
        <div class="absolute bottom-0 flex justify-center w-full">
            <div v-for="(slider,index) in sliders" :key="slider" :class="currentSlide === index? 'bg-gray-700' : 'bg-gray-100' " class="w-4 h-4 mx-2 rounded-full bg-black z-20 cursor-pointer shadow-md" @click="makeActive(index)">
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentSlide: 0,
            interval: '',
            sliders: ['bg-teal-600', 'bg-blue-600', 'bg-yellow-600'],
            isTitleShowing: true,
        }
    },
    methods: {
        makeActive(index) {
            this.currentSlide = index
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1

        }, 2000)
    },
    beforeUnmount() {
        clearInterval(this.interval)
    }

}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>

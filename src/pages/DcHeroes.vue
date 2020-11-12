<template>
<div class="m-auto">
    <h1 class="text-2xl text-center">Dc Heroes {{countHero}}</h1>

    <ul>
        <li class="flex justify-between" v-for="(hero, index) in dcHeroes" :key="hero.name">
            <div>{{hero.name}}</div>
            <button @click="removeHero(index)">x</button>
        </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero">
        <input class="border rounded" v-model.number=" newHero" placeholder="type your hero" ref="newHeroRef" />
        <button class="border rounded bg-gradient-to-t from-red-700 to-pink-500 text-sm text-white" type="submit">Add Hero</button>
    </form>
</div>
</template>

<script>
import {
    computed,
    onMounted,
    ref
} from 'vue'
export default {
    setup() {
        const newHeroRef = ref('')
        const newHero = ref('')
        let dcHeroes = ref([{
                name: 'ironman'
            },
            {
                name: 'catwoman'
            },
            {
                name: 'american'
            },
        ])

        function removeHero(index) {
            dcHeroes.value = dcHeroes.value.filter((hero, i) => i !== index)
        }

        function addHero() {
            if (newHero.value !== "") {
                dcHeroes.value.push({
                    name: newHero
                });
                newHero.value = ''
            }
        }
        onMounted(() => {
            newHeroRef.value.focus()
        })

        const countHero = computed({
            get: () => dcHeroes.value.length
        })
        return {
            dcHeroes,
            newHero,
            removeHero,
            addHero,
            newHeroRef,
            countHero
        }
    },

}
</script>

<style scoped>

</style>

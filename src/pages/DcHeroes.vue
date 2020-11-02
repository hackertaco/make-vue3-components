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
        <input class="border rounded" v-model.number=" newHero" placeholder="type your hero" />
        <button class="border rounded bg-gradient-to-t from-red-700 to-pink-500 text-sm text-white" type="submit">Add Hero</button>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            newHero: "",
            dcHeroes: [{
                    name: 'ironman'
                },
                {
                    name: 'catwoman'
                },
                {
                    name: 'american'
                },
            ]
        }
    },
    methods: {
        addHero() {
            if (this.newHero !== "") {
                this.dcHeroes.push({
                    name: this.newHero
                });
                this.newHero = ''
            }
        },
        removeHero(index) {
            this.dcHeroes = this.dcHeroes.filter((hero, i) => i !== index)
        }
    },
    computed: {
        countHero() {
            return this.dcHeroes.length
        },

    }
}
</script>

<style scoped>

</style>

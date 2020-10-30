<template>
<h1>Dc Heroes {{countHero}}</h1>

<ul>
    <li v-for="(hero, index) in dcHeroes" :key="index">{{hero.name}}
        <button @click="removeHero(index)">x</button>
    </li>
</ul>
<form @submit.prevent="addHero">
    <input v-model.number=" newHero" placeholder="type your hero" />
    <button type="submit">Add Hero</button>
</form>
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

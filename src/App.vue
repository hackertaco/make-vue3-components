<template>
<h1>Dc Heroes</h1>
<ul>
    <li v-for="(hero, index) in dcHeroes" :key="index">{{hero.name}}</li>
</ul>
<form @submit.prevent="dcHeroes.push({name: newHero}); newHero=''">
    <input v-model.number=" newHero" placeholder="type your hero" />
    <button type="submit">Add Hero</button>
</form>
</template>

<script>
export default {

    data() {
        return {
            isActive: false,
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

    }
}
</script>

<style scoped>

</style>

<template>
<div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl">Markdown App</h1>
    <section class="flex w-10/12 m-auto h-screen">
        <article class="w-1/2 border">
            <textarea v-model.lazy="text" class="w-full h-full"></textarea>
        </article>
        <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
</div>
</template>

<script>
import marked from 'marked'
export default {

    data() {
        return {
            text: '',

        }
    },
    computed: {
        markedText() {
            return marked(this.text)
        }
    }
}
</script>

<style>
 
 </style>

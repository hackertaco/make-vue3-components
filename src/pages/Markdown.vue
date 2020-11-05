<template>
<div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl">Markdown App</h1>
    <section class="flex w-10/12 m-auto h-screen">
        <article class="w-1/2 border">
            <textarea class="w-full h-full" :value="text" @input="update" ref="newMarkdownRef"></textarea>
        </article>
        <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
</div>
</template>

<script>
import marked from 'marked'
import debounce from '../utilities/mixins/debounce'

export default {
    mixins: [debounce],
    data() {
        return {
            text: '',

        }
    },
    mounted() {
        this.$refs.newMarkdownRef.focus()
    },
    computed: {
        markedText() {
            return marked(this.text)
        }
    },
    methods: {
        update(e) {
            const task = () =>
                (this.text = e.target.value)
            this.debounce(task, 500)

        },

    }
}
</script>

<style>
 
 </style>

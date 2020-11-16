<template>
  <div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl">Markdown App</h1>
    <section class="flex w-10/12 m-auto h-screen">
      <article class="w-1/2 border">
        <textarea
          class="w-full h-full"
          :value="text"
          @input="update"
          ref="newMarkdownRef"
        ></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import marked from "marked";
// import debounce from '../utilities/mixins/debounce'
import { computed, onMounted, ref } from "vue";
import useDebounce from "../utilities/composition/useDebounce";
export default {
  setup() {
    const { debounce } = useDebounce();
    const text = ref("");
    const newMarkdownRef = ref("");
    onMounted(() => {
      newMarkdownRef.value.focus();
    });
    const markedText = computed({
      get: () => marked(text.value),
    });

    function update(e) {
      const task = () => (text.value = e.target.value);
      debounce(task, 500);
    }

    return {
      text,
      update,
      markedText,
      newMarkdownRef,
    };
  },
};
</script>

<style></style>

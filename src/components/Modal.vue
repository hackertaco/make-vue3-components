<template>
  <section
    @click="close"
    class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded-xl shadow w-1/3">
        <div class="p-2 border">
          <h1 class="text-xl mt-2 mb-2 p-1">
            <slot name="title"></slot>
          </h1>
          <main class="w-full h-full p-1">
            <slot name="body"></slot>
          </main>
          <footer>
            <slot name="button"></slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(_, { emit }) {
    function close() {
      emit("close");
    }
    function closeDropdown() {
      emit("close-dropdown");
    }
    return { close, closeDropdown };
  },
};
</script>

<style></style>

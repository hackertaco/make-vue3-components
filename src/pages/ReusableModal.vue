<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Reusable Modal</h1>
      <Modal v-if="isModalOpen" @close="isModalOpen = false">
        <h1 class="text-red-500">Red Modal</h1>
      </Modal>
      <Modal v-if="isBlueOpen" @close="isBlueOpen = false"> </Modal>
      <button @click="isModalOpen = true">Red Modal</button>
      <button @click="isBlueOpen = true">Blue Modal</button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal";
import { ref } from "vue";
export default {
  components: { Modal },
  setup() {
    const isModalOpen = ref(false);
    const isBlueOpen = ref(false);
    return {
      isModalOpen,
      isBlueOpen,
    };
  },
};
</script>

<style></style>

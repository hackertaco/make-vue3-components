<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Reusable Modal</h1>
      <Modal v-if="isModalOpen" @close="isModalOpen = false">
        <template #title>Modal1</template>
        <template #body>
          <p>this is body modal1</p>
        </template>
      </Modal>
      <Modal v-if="isBlueOpen" @close="isBlueOpen = false">
        <template #title>Modal2</template>
        <template #body>
          <p>this is body modal2</p>
        </template>
      </Modal>

      <button
        class="border rounded px-2 mx-4 bg-blue-500 text-white"
        @click="isModalOpen = true"
      >
        Red Modal
      </button>
      <button
        class="border rounded px-2 mx-4 bg-blue-500 text-white"
        @click="isBlueOpen = true"
      >
        Blue Modal
      </button>
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

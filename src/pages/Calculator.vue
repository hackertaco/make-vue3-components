<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">Calculator</h1>
      <p
        class="text-3xl text-right mt-10 w-32 h-10 overflow-x-scroll"
        style="direction: rtl"
      >
        {{ currNum }}
      </p>
      <div class="h-10">
        <small v-if="selectedOperation"
          >{{ prevNum }} {{ selectedOperation }} {{ currNum }}</small
        >
      </div>
      <div class="grid grid-cols-4 gap-1">
        <button
          @click="pressed(i)"
          class="p-2 border shadow rounded w-10 h-10"
          v-for="i in num"
          :key="i"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const num = ref([
      1,
      2,
      3,
      "+",
      4,
      5,
      6,
      "-",
      7,
      8,
      9,
      "*",
      "C",
      0,
      "=",
      "/",
    ]);
    const operations = ["+", "-", "*", "/"];
    const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const currNum = ref("");
    const prevNum = ref("");
    const selectedOperation = ref("");

    function pressed(button) {
      if (button === "=" || button === "Enter") calculate();
      else if (button === "C") clear();
      else if (operations.includes(button)) applyOperation(button);
      else if (number.includes(button)) appendNumber(button);
    }

    function appendNumber(button) {
      const newButton = button.toString();
      currNum.value = currNum.value + newButton;
    }

    function calculate() {
      if (selectedOperation.value === "*") multiply();
      else if (selectedOperation.value === "/") divide();
      else if (selectedOperation.value === "+") sum();
      else if (selectedOperation.value === "-") substract();
      prevNum.value = "";
      selectedOperation.value = "";
    }

    function applyOperation(button) {
      calculate();
      prevNum.value = currNum.value;
      selectedOperation.value = button;
      currNum.value = "";
    }

    function multiply() {
      currNum.value = prevNum.value * currNum.value;
    }

    function divide() {
      currNum.value = prevNum.value / currNum.value;
    }

    function sum() {
      currNum.value = +prevNum.value + +currNum.value;
    }

    function substract() {
      currNum.value = prevNum.value - currNum.value;
    }

    function clear() {
      currNum.value = "";
    }

    function handleKeydown(e) {
      pressed(e.key);
    }
    useWindowEvent("keydown", handleKeydown);

    return {
      num,
      pressed,
      applyOperation,
      calculate,
      selectedOperation,
      currNum,
      prevNum,
    };
  },
};
</script>

<style>
.lastB {
  margin-left: 2.75rem;
  bottom: 2.25rem;
  position: relative;
}
</style>

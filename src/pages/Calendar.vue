<template>
  <div class="m-auto" style="font-family: 'Cantarell', sans-serif">
    <section class="flex flex-col w-full items-center align-middle">
      <h2
        class="m-auto font-bold text-3xl"
        style="font-family: 'Permanent Marker', cursive"
      >
        {{ currentMonthName }}
      </h2>
      <h2 class="m-auto font-bold">
        {{ currentYear }}
      </h2>
    </section>
    <section class="flex justify-between my-4">
      <button
        class="px-2 hover:animate-bounce"
        style="outline: none"
        @click="prev()"
      >
        👈
      </button>
      <button
        class="px-2 hover:animate-bounce"
        style="outline: none"
        @click="next()"
      >
        👉
      </button>
    </section>
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="day in days" :key="day">
        {{ day }}
      </p>
    </section>
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="num in startDay()" :key="num"></p>
      <!--startDay가 있는 이유: 1일의 요일 인덱스를 줘서 그걸 가지고 1일 위치를 조정하기 위하여, 숫자를 구했으니 그 자리만큼 비워두면 된다.-->
      <p
        :class="
          currentDateClass(num) || showMeeting(num) || underlineToday(num)
        "
        class="w-10 leading-10 cursor-pointer"
        v-for="num in daysInMonth()"
        :key="num"
        @click="showNum(num)"
      >
        {{ num }}
      </p>
    </section>

    <section class="w-full h-48 mt-8" style="font-family: 'Jua', sans-serif">
      <div
        class="border rounded-2xl max-h-full"
        style="padding: 1rem; overflow-y: scroll"
      >
        <div
          class="border-b-2 border-gray-300 w-full m-auto p-2 flex justify-between"
        >
          <div>{{ today }}일</div>
          <button @click="isModalOpen = true">+</button>
        </div>
        <div
          class="p-2"
          v-show="today === index + 1 && todo.length >= 1"
          v-for="(todo, index) in todos"
          :key="index"
        >
          {{ todo }}
        </div>
      </div>
    </section>
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
      <template #title>일정</template>
      <template #body @click="isOpen = false">
        <input
          type="text"
          placeholder="일정을 입력하세요"
          class="border-b border-gray-600"
        />
        <div class="flex items-center h-10 cursor-pointer">
          <div @click="isOpen = !isOpen" class="mr-2">시작시간</div>
          <div @click="isOpen = !isOpen" class="">
            <svg
              v-if="isOpen"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-triangle fill-current text-black mr-2"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-triangle transform rotate-180 fill-current text-black mr-2"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              />
            </svg>
          </div>
          <div
            v-show="isOpen"
            class="bg-white rounded py-2 border shadow-xl h-20 overflow-scroll w-8 mt-16"
          >
            <div
              class="hover:bg-indigo-500 hover:text-white ml-1"
              v-for="hour in 24"
              :key="hour"
            >
              {{ hour - 1 }}
            </div>
          </div>
        </div>
        <div>반복</div>
        <div>색깔</div>
        <div>태그</div>
      </template>
      <template #button><button>추가</button></template>
    </Modal>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import Modal from "../components/Modal";
export default {
  components: { Modal },
  setup() {
    let currentDate = ref(new Date().getUTCDate());
    let currentMonth = ref(new Date().getMonth());
    let currentYear = ref(new Date().getFullYear());
    let today = ref(new Date().getDate());
    const days = ref(["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]);
    const todos = ref([]);
    const isModalOpen = ref(false);
    const isOpen = ref(false);
    function daysInMonth() {
      return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
      //달의 전체 일수를 구한다.
    }

    function startDay() {
      return new Date(currentYear.value, currentMonth.value).getDay();
    }

    function next() {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
        pushObject();
      } else {
        currentMonth.value++;
        pushObject();
      }
    }

    function prev() {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
        pushObject();
      } else {
        currentMonth.value--;
        pushObject();
      }
    }

    function currentDateClass(num) {
      const calendarFullDate = new Date(
        currentYear.value,
        currentMonth.value,
        num
      ).toDateString();
      const currentFullDate = new Date().toDateString();
      //toDateString을 쓰는 이유는, new date를 했을 때 수반되는 시간 때문이다.
      return currentFullDate === calendarFullDate
        ? "text-gray bg-yellow-300 rounded-full"
        : "";
    }

    function showNum(num) {
      today.value = num;

      const meetingDay = new Date(
        currentYear.value,
        currentMonth.value,
        num
      ).getDay();

      if (meetingDay === 2) {
        todos.value[num - 1] = localStorage.getItem("화요일");
      } else if (meetingDay === 0) {
        todos.value[num - 1] = localStorage.getItem("일요일");
      }
      underlineToday(num);
    }

    function showMeeting(num) {
      const meetingDay = new Date(
        currentYear.value,
        currentMonth.value,
        num
      ).getDay();

      if (meetingDay === 2 || meetingDay === 0) {
        //만약 화요일이나 일요일이라면, 로컬스토리지에서 일정을 가져온다.
        // const fixedMeeting = localStorage.getItem("화요일");
        //처음으로 화요일인 date를 찾고, 해당 인덱스에 로컬스토리지 내용을 넣는다.

        return "text-white bg-red-400 rounded-full";
      }
    }
    function underlineToday(num) {
      return today.value === num ? "border-b" : "";
    }

    const currentMonthName = computed({
      get: () =>
        new Date(currentYear.value, currentMonth.value).toLocaleString(
          "en-US",
          {
            month: "long",
          }
        ),
    });
    function pushObject() {
      todos.value = [];
      for (
        let i = 0;
        i < new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
        i++
      ) {
        todos.value.push({});
      }
    }

    onMounted(() => {
      //매주 화요일과 일요일에는 회의 일정을 집어넣는다.
      localStorage.setItem("화요일", "기획회의");
      localStorage.setItem("일요일", "모각코");
      pushObject();
      //매주 화요일에 회의 일정 잡아넣기
    });
    return {
      days,
      currentDate,
      currentMonth,
      currentYear,
      daysInMonth,
      startDay,
      next,
      prev,
      currentDateClass,
      currentMonthName,
      showNum,
      today,
      showMeeting,
      todos,
      underlineToday,
      isModalOpen,
      isOpen,
    };
  },
};
</script>

<style scoped></style>

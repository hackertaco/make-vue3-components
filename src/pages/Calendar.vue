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
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="day in days" :key="day">
        {{ day }}
      </p>
    </section>
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="num in startDay()" :key="num"></p>
      <!--startDay가 있는 이유: 1일의 요일 인덱스를 줘서 그걸 가지고 1일 위치를 조정하기 위하여, 숫자를 구했으니 그 자리만큼 비워두면 된다.-->
      <p
        :class="currentDateClass(num) || showMeeting(num)"
        class="w-10 leading-10 cursor-pointer"
        v-for="num in daysInMonth()"
        :key="num"
        @click="showNum(num)"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between my-4">
      <button class="px-2 border rounded" @click="prev()">Prev</button>
      <button class="px-2 border rounded" @click="next()">Next</button>
    </section>
    <section class="w-full h-full" style="font-family: 'Jua', sans-serif">
      <div class="border rounded-2xl" style="padding: 1rem">
        <div
          class="border-b-2 border-gray-300 w-full m-auto p-2 flex justify-between"
        >
          <div>{{ today }}일</div>
          <button>+</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    let currentDate = ref(new Date().getUTCDate());
    let currentMonth = ref(new Date().getMonth());
    let currentYear = ref(new Date().getFullYear());
    let today = ref(new Date().getDate());
    const days = ref(["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]);

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
      } else {
        currentMonth.value++;
      }
    }

    function prev() {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
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
      this.today = num;
    }

    function showMeeting(num) {
      //일단 요일 인덱스가 2인 date를 구해야한다.
      const meetingDay = new Date(
        currentYear.value,
        currentMonth.value,
        num
      ).getDay();
      return meetingDay === 2 || meetingDay === 0
        ? "text-white bg-red-400 rounded-full"
        : "";
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
    };
  },
};
</script>

<style scoped></style>

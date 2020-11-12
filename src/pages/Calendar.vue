<template>
<div class="m-auto">
    <h1 class="text-2xl my-2">Vue Calendar</h1>
    <section class="mx-2 flex justify-between">
        <h2 class="font-bold">{{currentMonthName}}</h2>
        <h2 class="font-bold mx-2">{{currentYear}}</h2>
    </section>
    <section class="flex my-2 text-center">
        <p class="w-10 h-10 " style="width:14.28%" v-for="day in days" :key="day">{{day}}</p>
    </section>
    <section class="flex flex-wrap text-center">
        <p class="w-1/6 h-10" style="width:14.28%" v-for="num in startDay()" :key="num"></p>
        <!--startDay가 있는 이유: 1일의 요일 인덱스를 줘서 그걸 가지고 1일 위치를 조정하기 위하여, 숫자를 구했으니 그 자리만큼 비워두면 된다.-->
        <p :class="currentDateClass(num)" class="w-1/6 h-10" style="width:14.28%" v-for="num in daysInMonth()" :key="num">{{num}}</p>
    </section>
    <section class="flex justify-between my-4">
        <button class="px-2 border rounded" @click="prev()">Prev</button>
        <button class="px-2 border rounded" @click="next()">Next</button>
    </section>
</div>
</template>

<script>
import {
    computed,
    ref
} from 'vue'
export default {
    setup() {
        let currentDate = ref(new Date().getUTCDate())
        let currentMonth = ref(new Date().getMonth())
        let currentYear = ref(new Date().getFullYear())
        const days = ref(['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'])

        function daysInMonth() {
            return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
            //달의 전체 일수를 구한다.
        }

        function startDay() {
            return new Date(currentYear.value, currentMonth.value).getDay()
        }

        function next() {
            if (currentMonth.value === 11) {
                currentMonth.value = 0;
                currentYear.value++
            } else {
                currentMonth.value++

            }
        }

        function prev() {
            if (currentMonth.value === 0) {
                currentMonth.value = 11;
                currentYear.value--;
            } else {
                currentMonth.value--

            }
        }

        function currentDateClass(num) {

            const calendarFullDate = new Date(currentYear.value, currentMonth.value, num).toDateString()
            const currentFullDate = new Date().toDateString();
            //toDateString을 쓰는 이유는, new date를 했을 때 수반되는 시간 때문이다.
            return currentFullDate === calendarFullDate ? 'text-yellow-600' : ''
        }

        const currentMonthName = computed({
            get: () =>
                new Date(currentYear.value, currentMonth.value).toLocaleString("default", {
                    month: 'long'
                })

        })
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
            currentMonthName
        }
    }

}
</script>

<style scoped>

</style>

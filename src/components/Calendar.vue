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
export default {
    data() {
        return {
            currentDate: new Date().getUTCDate(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            days: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
        }
    },
    methods: {
        daysInMonth() {
            return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            //달의 전체 일수를 구한다.
        },
        startDay() {
            return new Date(this.currentYear, this.currentMonth).getDay()
        },
        next() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++
            } else {
                this.currentMonth++

            }
        },
        prev() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--

            }
        },
        currentDateClass(num) {

            const calendarFullDate = new Date(this.currentYear, this.currentMonth, num).toDateString()
            const currentFullDate = new Date().toDateString();
            //toDateString을 쓰는 이유는, new date를 했을 때 수반되는 시간 때문이다.
            return currentFullDate === calendarFullDate ? 'text-yellow-600' : ''
        }
    },
    computed: {
        currentMonthName() {
            return new Date(this.currentYear, this.currentMonth).toLocaleString("default", {
                month: 'long'
            })
            // 숫자로 표현되는 달을 글자로 바꾸는
        }
    }
}
</script>

<style scoped>

</style>

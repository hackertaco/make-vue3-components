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
        <p class="w-1/6 h-10" style="width:14.28%" v-for="num in daysInMonth(currentYear, currentMonth)" :key="num">{{num}}</p>
    </section>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentMonth: new Date().getMonth() + 1,
            currentMonthName: new Date().toLocaleString("default", {
                month: 'long'
            }),
            currentYear: new Date().getFullYear(),
            days: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
        }
    },
    methods: {
        daysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
        }
    }
}
</script>

<style scoped>

</style>

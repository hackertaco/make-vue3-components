<template>
  <div class="m-auto" style="font-family: 'Cantarell', sans-serif">
    <section class="flex flex-col w-full items-center align-middle">
      <h2 class="m-auto font-bold text-3xl" style="font-family: 'Permanent Marker', cursive">
        {{ currentMonthName }}
      </h2>
      <h2 class="m-auto font-bold">
        {{ currentYear }}
      </h2>
    </section>
    <section class="flex justify-between my-4">
      <button class="px-2 hover:animate-bounce" style="outline: none" @click="prev()">👈</button>
      <button class="px-2 hover:animate-bounce" style="outline: none" @click="next()">👉</button>
    </section>
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="day in days" :key="day">
        {{ day }}
      </p>
    </section>
    <section class="grid-cols-7 grid gap-x-8 gap-y-2 text-center">
      <p class="w-10 leading-10" v-for="num in startDay()" :key="num"></p>
      <!--startDay가 있는 이유: 1일의 요일 인덱스를 줘서 그걸 가지고 1일 위치를 조정하기 위하여, 숫자를 구했으니 그 자리만큼 비워두면 된다.-->
      <div :class="currentDateClass(num) || underlineToday(num)" class="w-10 h-10 leading-10 cursor-pointer relative flex justify-center" v-for="num in daysInMonth(currentYear, currentMonth)" :key="num" @click="showNum(num)">
        <div class="absolute" style="">
          {{ num }}
        </div>
        <div class="flex flex-col ml-10 w-10 justify-start h-10" style="">
          <div class="w-2 h-2 rounded-full" v-for="(calendarColor, index) in fetchColorToCalendar(num)" :key="index" :class="calendarColor"></div>
        </div>
      </div>
    </section>

    <section class="w-full h-48 mt-8" style="font-family: 'Jua', sans-serif">
      <div class="border rounded-2xl max-h-full" style="padding: 1rem; overflow-y: scroll">
        <div class="border-b-2 border-gray-300 w-full m-auto p-2 flex justify-between">
          <div>{{ today }}일</div>
          <button @click="isModalOpen = true">+</button>
        </div>
        <div class="p-2 text-black" v-for="(todo, index) in todos" v-show="today === index + 1 && todo.length >= 1" :key="index">
          <div v-for="t in todo" :key="t" class="flex justify-between align-middle items-center mt-3 border-b pb-3">
            <div class="flex items-center">
              <div :class="t.color" class="w-5 h-5 rounded-full mr-3 leading-5"></div>
              <div class="mr-3 text-2xl h-6 leading-6">
                {{ t.name }}
              </div>
              <div class="w-10 text-xl" v-text="t.time === '미정' ? '' : t.time + '시'"></div>
            </div>
            <div class="flex h-6 leading-6">
              <div v-show="t.tag" class="w-20 mr-3 text-center bg-yellow-400 rounded-xl">
                {{ t.tag }}
              </div>
              <button class="mr-3">수정</button>
              <button @click="removePlan(t.id)">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal
      v-if="isModalOpen"
      @close="
        isModalOpen = false;
        selectedName = '';
        selectedColor = 'bg-gray-400';
        selectedHour = '';
        selectedRepeat = ['없음'];
        selectedTag = '';
      "
    >
      <template #title>일정</template>
      <template #body @click="isOpen = false">
        <input type="text" placeholder="일정을 입력하세요" class="border-b border-gray-600 mb-2 ml-1" v-model="selectedName" />
        <div class="flex items-center h-10 cursor-pointer mb-2">
          <div @click="isOpen = !isOpen" class="mr-2">시작시간</div>
          <div @click="isOpen = !isOpen">
            <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-triangle fill-current text-black mr-2">
              <path xmlns="http://www.w3.org/2000/svg" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-triangle transform rotate-180 fill-current text-black mr-2">
              <path xmlns="http://www.w3.org/2000/svg" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
          <div v-show="isOpen" class="bg-white rounded py-2 border shadow-xl h-20 overflow-scroll w-8 ml-16 mt-24 absolute">
            <div class="hover:bg-indigo-500 hover:text-white ml-1" v-for="hour in 24" :key="hour" @click="selectTime(hour)">
              {{ hour }}
            </div>
          </div>
          <div class="text-black" v-show="selectedHour" @click="isOpen = !isOpen">{{ selectedHour }}</div>
        </div>

        <div class="mb-2">
          <div class="mb-4">반복</div>
          <div class="flex justify-between border-l">
            <div class="w-1/5 text-center border-gray-400 border-r hover:bg-gray-200 mb-2 cursor-pointer" v-for="r in repeat" :key="r" @click="selectRepeat(r, '', '')" :class="selectedRepeat[0] === r ? 'bg-gray-200' : ''">
              {{ r }}
            </div>
          </div>
          <div class="my-2 w-full">
            <div v-show="selectedRepeat[0] === '매일'">
              <span> <input class="my-2 w-1/12 border rounded text-center focus:outline-none hover:outline-black appearance-none" v-model.number="pickedDate" @input="selectRepeat('매일', pickedDate, '')" /> 일마다 반복</span>
            </div>
            <div v-show="selectedRepeat[0] === '매주'" class="w-full">
              <div class="">매 <input class="my-2 w-1/12 border rounded text-center focus:outline-none hover:outline-black appearance-none" v-model.number="pickedWeek" @input="selectRepeat('매주', pickedWeek, pickedDay)" /> 주 요일마다 반복</div>
              <div class="grid grid-cols-7 place-content-center divide-x text-center">
                <div v-for="(d, index) in ['월', '화', '수', '목', '금', '토', '일']" :key="index" class="my-2 w-full cursor-pointer hover:bg-gray-200" @click="addDay(d, index)" :class="pickedDay.includes(d) ? 'bg-gray-200' : ''">
                  {{ d }}
                </div>
              </div>
            </div>
            <div v-show="selectedRepeat[0] === '매월'">
              <div class="">매 <input class="my-2 w-1/12 border rounded text-center focus:outline-none hover:outline-black appearance-none" v-model.number="pickedMonth" @input="selectRepeat('매월', pickedMonth, '')" /> 개월마다 반복</div>
            </div>
            <div v-show="selectedRepeat[0] === '매년'"></div>
          </div>
        </div>

        <div class="mb-2">
          <div class="mb-2 grid grid-flow-col">
            <div class="h-5 leading-5">색깔</div>
            <div v-show="selectedColor" class="w-5 h-5 rounded-full border absolute ml-8" :class="selectedColor"></div>
          </div>
          <div class="flex justify-between rounded-md bg-white py-2 px-2 overflow-x-auto">
            <div class="rounded-full h-5 w-5 border cursor-pointer hover:border-gray-500 hover:border-2" v-for="(c, index) in colors" :class="c" :key="index" @click="selectColor(c)"></div>
          </div>
        </div>

        <div>
          <div class="mb-2">태그</div>
          <div class="flex justify-around py-1 px-1 ml-2">
            <div class="w-20 mr-4 text-center rounded-xl border-gray-200 shadow-xl cursor-pointer hover:bg-red-500" v-for="t in tag" :key="t" @click="selectTag(t)" :class="selectedTag === t ? 'bg-red-400' : 'bg-yellow-400'">
              {{ t }}
            </div>
          </div>
        </div>
      </template>
      <template #button><button class="w-full text-center mt-4 mb-2 p-2 border rounded shadow-xl hover:border-gray-600" @click="addPlan(today)">추가</button></template>
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
    const repeat = ["없음", "매일", "매주", "매월", "매년"];
    const pickedDate = ref("1");
    const pickedWeek = ref("1");
    const pickedDay = ref([
      new Date(currentYear.value, currentMonth.value, today.value).toLocaleString("ko-KR", {
        weekday: "short",
      }),
    ]);
    const pickedMonth = ref("1");
    const colors = ["bg-gray-400", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-teal-400", "bg-blue-400", "bg-indigo-400", "bg-purple-400", "bg-pink-400"];
    const tag = ref(["회의", "생일", "이벤트", "기타"]);
    const selectedName = ref("");
    const selectedHour = ref("미정");
    const selectedRepeat = ref(["없음"]);
    const selectedColor = ref("bg-gray-400");
    const selectedTag = ref("");
    let monthForId = "";
    let dateForId = "";

    function addPlan(today) {
      const month = () => {
        if (currentMonth.value + 1 > 9) {
          monthForId = (currentMonth.value + 1).toString();
        } else if (currentMonth.value + 1 > 0 && currentMonth.value + 1 <= 9) {
          monthForId = "0" + (currentMonth.value + 1).toString();
        }
        return monthForId;
      };
      const date = () => {
        if (today + 1 > 9) {
          dateForId = today.toString();
        } else if (today + 1 > 0 && today + 1 <= 9) {
          dateForId = "0" + today.toString();
        }
        return dateForId;
      };
      const obj = {
        name: selectedName.value,
        time: selectedHour.value,
        repeat: selectedRepeat.value,
        color: selectedColor.value,
        tag: selectedTag.value,
        id: currentYear.value.toString() + month() + date() + "_" + Date.now(),
      };
      if (!obj.name) {
        alert("이름은 필수입니다!");
      } else {
        isModalOpen.value = false;
        localStorage.setItem(obj.id, JSON.stringify(obj));
        todos.value[today - 1].push(obj);
        selectedName.value = "";
        selectedTag.value = "";
        selectRepeat.value = ["없음"];
        selectedHour.value = "미정";
        selectedColor.value = "bg-gray-400";
        getPlan();
        sortPlan(today);
      }
    }

    function fetchColorToCalendar(num) {
      const arr = [];
      if (todos.value[num - 1]) {
        if (todos.value[num - 1].length > 3) {
          todos.value[num - 1].forEach((t) => arr.push(t.color));
          console.log(arr);
          sortPlan(num);

          return arr.slice(0, 3);
        } else {
          todos.value[num - 1].forEach((t) => arr.push(t.color));

          sortPlan(num);
          return arr;
        }
        // return arr;
      }
    }

    function selectTime(hour) {
      selectedHour.value = "미정";
      selectedHour.value = hour;
      isOpen.value = false;
    }
    function selectRepeat(r, num, day) {
      selectedRepeat.value = ["없음"];
      if (r !== "없음") {
        selectedRepeat.value = [r, num, day];
      }
    }

    function addDay(day) {
      if (!pickedDay.value.includes(day)) {
        pickedDay.value = [...pickedDay.value].concat(day);
      } else if ([...pickedDay.value].includes(day)) {
        pickedDay.value = pickedDay.value.filter((d) => d !== day);
      }
      selectRepeat("매주", pickedWeek.value, pickedDay.value);
    }

    function selectColor(c) {
      selectedColor.value = "bg-gray-600";
      selectedColor.value = c;
    }

    function selectTag(t) {
      selectedTag.value = "";
      selectedTag.value = t;
    }
    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
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
      pushObject();
      getPlan();

      if (new Date().getMonth() === currentMonth.value) {
        today.value = new Date().getDate();
      } else {
        today.value = 1;
      }
    }

    function prev() {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
      pushObject();
      getPlan();

      if (new Date().getMonth() === currentMonth.value) {
        today.value = new Date().getDate();
      } else {
        today.value = 1;
      }
    }

    function currentDateClass(num) {
      const calendarFullDate = new Date(currentYear.value, currentMonth.value, num).toDateString();
      const currentFullDate = new Date().toDateString();
      //toDateString을 쓰는 이유는, new date를 했을 때 수반되는 시간 때문이다.
      return currentFullDate === calendarFullDate ? "text-gray bg-yellow-300 rounded-full" : "";
    }

    function showNum(num) {
      today.value = num;
      underlineToday(today.value);
      sortPlan(today.value);
    }

    function sortPlan(num) {
      todos.value[num - 1].sort(function (todo1, todo2) {
        if (typeof todo1.time === "string" && typeof todo2.time === "number") {
          return 1;
        } else if (typeof todo1.time === "number" && typeof todo2.time === "string") {
          return -1;
        } else if (typeof todo1.time === "number" && typeof todo2.time === "number" && todo1.time > todo2.time) {
          return 1;
        } else if (typeof todo1.time === "number" && typeof todo2.time === "number" && todo1.time < todo2.time) {
          return -1;
        }
      });
    }
    function showMeeting(num) {
      const meetingDay = new Date(currentYear.value, currentMonth.value, num).getDay();

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
        new Date(currentYear.value, currentMonth.value).toLocaleString("en-US", {
          month: "long",
        }),
    });
    function pushObject() {
      todos.value = [];
      for (let i = 0; i < new Date(currentYear.value, currentMonth.value + 1, 0).getDate(); i++) {
        todos.value.push([]);
      }
    }

    function getPlan() {
      const arr = [];

      if (localStorage.length !== 0) {
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) !== "loglevel:webpack-dev-server" && localStorage.key(i) !== "csCursors" && localStorage.key(i) !== "csPointers" && localStorage.key(i) !== "1") {
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }

        arr.forEach((a) => {
          const ID = a.id;
          const year = currentYear.value;
          const month = currentMonth.value;
          // const repeat = a.repeat[1];
          // const putA = a;
          //selectedRepeat = ['없음']일 때 !

          if (a.repeat[0] === "없음" && ID.slice(0, 6) === year.toString() + (month + 1).toString()) {
            todos.value[parseInt(ID.slice(6, 8)) - 1].push(a);
          } else if (a.repeat[0] === "매일" && (parseInt(ID.slice(0, 4)) < year || (parseInt(ID.slice(0, 4)) === year && parseInt(ID.slice(4, 6)) <= month + 1))) {
            // 처음 달에 대비해서 달의 일수를 빼는 작업
            let mCount = month + 1 - parseInt(ID.slice(4, 6));
            let yCount = year - parseInt(ID.slice(0, 4));
            let monthCount = mCount + 12 * yCount;
            let dayCount = 0;
            // console.log(monthCount);
            for (let i = 0; i < monthCount; i++) {
              // console.log(new Date(year, month - i, 0).getDate());
              dayCount = dayCount + new Date(year, month - i, 0).getDate();
            }

            let int = parseInt(ID.slice(6, 8)) - 1;
            if (year === parseInt(ID.slice(0, 4)) && month + 1 === parseInt(ID.slice(4, 6))) {
              while (int < daysInMonth(year, month)) {
                todos.value[int].push(a);
                int += parseInt(a.repeat[1]);
              }
              localStorage.removeItem(ID);
              const obj = {
                name: a.name,
                time: a.time,
                repeat: [a.repeat[0], a.repeat[1], [int - daysInMonth(year, month), month + 1]],
                color: a.color,
                tag: a.tag,
                id: ID,
              };
              localStorage.setItem(ID, JSON.stringify(obj));
            } else if (parseInt(ID.slice(0, 4)) < currentYear.value || (parseInt(ID.slice(0, 4)) === currentYear.value && parseInt(ID.slice(4, 6))) < currentMonth.value + 1) {
              let newInt = JSON.parse(localStorage.getItem(ID)).repeat[2];
              if ((newInt[1] === 12 && month + 1 === 1) || (newInt[1] !== 12 && newInt[1] !== 1 && newInt[1] < month + 1) || (newInt[1] === 1 && month + 1 !== 12 && month + 1 === 2)) {
                //다음달
                if (newInt[0] > parseInt(a.repeat[1])) {
                  console.log("전달 > 다음달 ");
                  newInt[0] -= daysInMonth(year, month - 2);
                  newInt[0] += parseInt(a.repeat[1]);
                  while (newInt[0] < daysInMonth(year, month - 1)) {
                    newInt[0] += parseInt(a.repeat[1]);
                  }
                  newInt[0] -= daysInMonth(year, month - 1);
                  while (newInt[0] < daysInMonth(year, month)) {
                    todos.value[newInt[0]].push(a);
                    newInt[0] += parseInt(a.repeat[1]);
                  }
                  newInt[0] -= daysInMonth(year, month);

                  localStorage.removeItem(ID);
                  const obj1 = {
                    name: a.name,
                    time: a.time,
                    repeat: [a.repeat[0], a.repeat[1], [newInt[0], month + 1]],
                    color: a.color,
                    tag: a.tag,
                    id: ID,
                  };
                  localStorage.setItem(ID, JSON.stringify(obj1));
                } else {
                  console.log("다음달 > 다음달 ");

                  while (newInt[0] < daysInMonth(year, month)) {
                    todos.value[newInt[0]].push(a);
                    newInt[0] += parseInt(a.repeat[1]);
                    // console.log(newInt);
                  }
                  if (newInt[0] >= daysInMonth(year, month)) {
                    newInt[0] = newInt[0] - daysInMonth(year, month);
                    localStorage.removeItem(ID);
                    const obj2 = {
                      name: a.name,
                      time: a.time,
                      repeat: [a.repeat[0], a.repeat[1], [newInt[0], month + 1]],
                      color: a.color,
                      tag: a.tag,
                      id: ID,
                    };
                    localStorage.setItem(ID, JSON.stringify(obj2));
                  }
                }
              } else if ((newInt[1] === 1 && month + 1 === 12) || (newInt[1] !== 1 && newInt[1] > month + 1) || (newInt[1] === 12 && month + 1 !== 1)) {
                if (parseInt(a.repeat[1]) > newInt[0]) {
                  //계속 다음 달로 옮기다가 그 전달로 옮기려고 할 때
                  console.log("다음달 > 전달");
                  newInt[0] = newInt[0] + daysInMonth(year, month + 1);
                  while (newInt[0] >= 0) {
                    newInt[0] -= parseInt(a.repeat[1]);
                    console.log(1);
                  }
                  newInt[0] = newInt[0] + daysInMonth(year, month);
                  console.log(2);
                  while (newInt[0] >= 0) {
                    todos.value[newInt[0]].push(a);
                    newInt[0] -= parseInt(a.repeat[1]);
                  }
                  // if (newInt[0] < 0) {
                  newInt[0] = newInt[0] + daysInMonth(year, month - 1);
                  // }
                  console.log(3);
                  localStorage.removeItem(ID);
                  const obj3 = {
                    name: a.name,
                    time: a.time,
                    repeat: [a.repeat[0], a.repeat[1], [newInt[0], month + 1]],
                    color: a.color,
                    tag: a.tag,
                    id: ID,
                  };
                  localStorage.setItem(ID, JSON.stringify(obj3));
                  console.log(newInt[0]);
                } else {
                  //계속 전 달로 옮길 때
                  console.log("전달 > 전달");
                  while (newInt[0] >= 0) {
                    todos.value[newInt[0]].push(a);
                    newInt[0] -= parseInt(a.repeat[1]);
                    // console.log(newInt);
                  }
                  if (newInt[0] < 0) {
                    newInt[0] = newInt[0] + daysInMonth(year, month - 1);
                    localStorage.removeItem(ID);
                    const obj4 = {
                      name: a.name,
                      time: a.time,
                      repeat: [a.repeat[0], a.repeat[1], [newInt[0], month + 1]],
                      color: a.color,
                      tag: a.tag,
                      id: ID,
                    };
                    localStorage.setItem(ID, JSON.stringify(obj4));
                  }
                }
              }
            }
          } else if (a.repeat[0] === "매주") {
            console.log(2);
          } else if (a.repeat[0] === "매월") {
            const monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            const getYear = parseInt(a.repeat[1] / 12);
            monthArr.map((m) => {
              m * (a.repeat[1] % 12);
            });
            // const getMonth = console.log(getMonth);

            for (let monthItem of monthArr) {
              if ((monthItem === month + 1 - parseInt(ID.slice(4, 6)) && parseInt(ID.slice(0, 4)) + getYear === year) || (monthItem === month + 13 - parseInt(ID.slice(4, 6)) && parseInt(ID.slice(0, 4)) + getYear + 1 === year)) {
                todos.value[parseInt(ID.slice(6, 8)) - 1].push(a);
                break;
              }
            }
          } else if (a.repeat[0] === "매년") {
            if (month + 1 === parseInt(ID.slice(4, 6))) {
              todos.value[parseInt(ID.slice(6, 8)) - 1].push(a);
            }
          }
        });

        sortPlan(today.value);
      }
    }

    function removePlan(id) {
      localStorage.removeItem(id);
      todos.value[today.value - 1] = todos.value[today.value - 1].filter((t) => t.id !== id);
      // getPlan();
    }

    onMounted(() => {
      pushObject();
      getPlan();
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
      repeat,
      colors,
      tag,
      selectedName,
      selectTime,
      selectedRepeat,
      selectedColor,
      selectedTag,
      selectedHour,
      selectRepeat,
      selectColor,
      selectTag,
      addPlan,
      removePlan,
      fetchColorToCalendar,
      pickedDate,
      pickedWeek,
      addDay,
      pickedDay,
      pickedMonth,
    };
  },
};
</script>

<style scoped></style>

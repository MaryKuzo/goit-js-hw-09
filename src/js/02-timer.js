// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix';

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

Report.info(
  '👋 Hi',
  'Please, choose a date and click on start',
  'Okay'
);

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure('🥺 Ooops...',
        'Please choose a date in the future',
        'Okay')
    } else {
      Report.success('😎 Congratulation! Click on start!')
      startBtn.disabled = false;
      const onStartBtn = () => {
        timer.start();
        selectedDate = selectedDates[0].getTime();
      }
      startBtn.addEventListener('click', onStartBtn)

    }
  }
})

const timer = {
  timerSelector: document.querySelector('.timer'),
  start() {
    this.intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      const currentDate = new Date();
      const delta = selectedDate - currentDate;

      if (delta <= 0) {
        this.stop();
        Report.info('👏 Congratulation! Timer stopped!');
        return
      }



      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.timerSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
      this.timerSelector.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
      this.timerSelector.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
      this.timerSelector.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);


    },
      TIMER_DELAY)
  },
   stop() {
     clearInterval(this.intervalId);
     startBtn.disabled = false;
     calendar.disabled = false;
     this.intervalId = null;
},

 convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };


},
   addLeadingZero(value){
    return String(value).padStart(2, 0);
  }
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

};








const TIMER_DELAY = 500;
let timerId = null;
const refs = {
  onStartBtn: document.querySelector('button[data-start]'),
  onStopBtn: document.querySelector('button[data-stop]'),
  body : document.querySelector('body')
};
refs.onStopBtn.disabled = true;
refs.onStartBtn.addEventListener('click', onStartBtnChangeColor);
refs.onStopBtn.addEventListener('click', onStopBtnChangeColor);

function onStartBtnChangeColor() {
  refs.onStartBtn.disabled = true;
  refs.onStopBtn.disabled = false;
  timerId = setInterval(() => { refs.body.style.backgroundColor = getRandomHexColor() }, TIMER_DELAY);
}
function onStopBtnChangeColor() {
  refs.onStopBtn.disabled = true;
  refs.onStartBtn.disabled = false;
  clearInterval(timerId)

}







function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form.form');
const options = {
  position: 'left-bottom',
  distance: '15px',
  borderRadius: '35px',
  timeout: 4000,
  clickToClose: true,

};

function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve ({position, delay})
  } else {
    // Reject
    reject ({position, delay})
  }

   }, delay);
  })


}

form.addEventListener('submit', onCreatePromise);

function onCreatePromise(event) {
    event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let delayInput = Number(delay.value);
  let stepInput = Number(step.value);
  let amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1){
    delayInput += stepInput;
    createPromise(i, delayInput)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, options);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, options);
  });
event.currentTarget.reset()
  }


}


// const container = document.querySelector('.container');
// let seatsSelected = document.querySelectorAll('.seat.selected');
// let imgs = document.querySelectorAll('img')
// let select = document.querySelector('select');
// let optionValues = document.querySelectorAll('option');
// let amount = document.getElementById('amount');

// imgs.forEach(function (img) {
//    img.addEventListener('click', () => {
//       if(img.src !== 'http://127.0.0.1:5500/icon/chair%20selected.png' && img.src !== 'http://127.0.0.1:5500/icon/chair%20medium.png'){
//          img.src = 'icon/chair medium.png'

//       }

//       else if(img.src === 'http://127.0.0.1:5500/icon/chair%20medium.png'){
//          img.src = 'icon/chair not selected.png'

//       }
//    });
// })

// optionValues.forEach(function(value) {
//    value.addEventListener('selectionchange', () => {
//       console.log('select');
//    })
// })



const container = document.querySelector('.container');
const containerCopy = container.innerHTML
const amount = document.querySelector('#amount');
const person = document.querySelector('#person');
const personAmount = document.querySelector('#personAmount');
const select = document.getElementById('movies');
const print = document.getElementById('print');
const seats = document.querySelectorAll('img:not(.selected)');

const buttons = document.querySelectorAll('.box-action');
const btnClose = document.querySelector('.btn-close');
const buyButton = document.querySelector('.buy');
const buyContainer = document.querySelector('.buy-container');
const labels = document.querySelectorAll('.form-control label');
const xBtn = document.querySelector('.x-lg');
const alertContainer = document.querySelector('.alert-container');
const goBackBtn = document.querySelector('.go-back');
const goMainBtn = document.querySelector('.go-main');
let selectedSeatsCounter = 0;
let buttonValue;

getFromLocalStorage();
calculateTotal();
btnClick();

seats.forEach(function (seat) {
   seat.addEventListener('click', (e) => {

      if (!e.target.classList.contains('selected') &&
         !e.target.classList.contains('medium') &&
         !e.target.classList.contains('disabled') &&
         !e.target.classList.contains('movie') && 
         !e.target.classList.contains('film__image')) {
         e.target.src = 'icon/chair medium.png'
         e.target.classList.add('medium');
         alertContainer.style.display = 'none'
         selectedSeatsCounter++
         calculateTotal()
      }

      else if (e.target.classList.contains('medium')) {
         e.target.src = 'icon/chair not selected.png'
         e.target.classList.remove('medium')
         selectedSeatsCounter--
         calculateTotal()
      }
      console.log(selectedSeatsCounter);
   })
})


function calculateTotal() {
   const selectedSeats = container.querySelectorAll('.medium')

   const selectedSeatsArr = [];
   const seatsArr = [];

   selectedSeats.forEach(function (seat) {
      selectedSeatsArr.push(seat);
   })

   seats.forEach(function (seat) {
      seatsArr.push(seat)
   })

   let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
      return seatsArr.indexOf(seat)
   })

   let selectedSeatCount = selectedSeats.length;

   person.innerHTML = selectedSeatCount;
   personAmount.innerHTML = selectedSeatCount * buttonValue * 1000;
   // console.log(buttonValue);

   // console.log(selectedSeatCount);

   saveToLocalStorage(selectedSeatIndexs)
}

function getFromLocalStorage() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

   if (selectedSeats != null && selectedSeats.length > 0) {
      seats.forEach(function (seat, index) {
         if (selectedSeats.indexOf(index) > -1) {
            seat.src = 'icon/chair medium.png'
         }
      })
   }

   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

   if (selectedMovieIndex != null) {
      select.selectedIndex = selectedMovieIndex;
   }
}

function saveToLocalStorage(indexs) {
   localStorage.setItem('selectedSeats', JSON.stringify(indexs));
   localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}

function btnClick() {
   buttons.forEach(function (button) {
      button.addEventListener('click', (e) => {

         buttonValue = e.target.value;
         const filmImage = document.querySelector('.film-image');

         container.style.display = 'flex'

         amount.innerHTML = e.target.value * 1000
         calculateTotal()

         container.style.top = scrollY + 30 + 'px'
      })
   })
}


btnClose.addEventListener('click', function () {
   container.style.display = 'none'
   alertContainer.style.display = 'none'
   calculateTotal()
})

// alertContainer.style.display = 'none'

buyButton.addEventListener('click', () => {
   if(selectedSeatsCounter !== 0){
      container.style.display = 'none'
      buyContainer.style.display = 'block'
   } else{
         alertContainer.style.top = scrollY + 280 + 'px'

         alertContainer.style.display = 'block'
   }
   
})

const number = document.querySelector('#number');

function input(){
   console.log('worked');
   
   console.log(number.value.length);
}

labels.forEach((label) =>{
   label.innerHTML = label.innerText
      .split('')
      .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
      .join('')
})

function f(){
   buyContainer.style.display = 'none'
   console.log(containerCopy);
}

goBackBtn.addEventListener('click', () => {
   buyContainer.style.display = 'none'
   container.style.display = 'flex'
})

goMainBtn.addEventListener('click', () => {
   buyContainer.style.display = 'none';
})






















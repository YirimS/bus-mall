'use strict';

// global variables
let allProduct = [];
let clicks = 0;
let clicksAllowed = 25;

// pathway to DOM
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

imageOne.src = 'img/water-can.jpg';

// constructor function
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProduct.push(this);
}
// product instanciation
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');



function selectRandomProductIndex() {
  return Math.floor(Math.random() * allProduct.length);
}

function renderRandomProducts() {
  let productOne = selectRandomProductIndex();
  let productTwo = selectRandomProductIndex();
  let productThree = selectRandomProductIndex();
  // seriously consider using an array.
  // remember:  how do you know if an array inculdes something? maybe google
  // while (productOne === productTwo) {
  //   productTwo = selectRandomProductIndex();
  // }


  imageOne.src = allProduct[productOne].src;
  imageOne.alt = allProduct[productOne].name;
  allProduct[productOne].views++;


  imageTwo.src = allProduct[productTwo].src;
  imageTwo.alt = allProduct[productTwo].name;
  allProduct[productTwo].views++;

  imageThree.src = allProduct[productThree].src;
  imageThree.alt = allProduct[productThree].name;
  allProduct[productThree].views++;

}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('click on an IMAGE please');
  }

  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProduct.length; i++) {
    if (clickedProduct === allProduct[i].name) {
      allProduct[i].clicks++;
    }
  }
  renderRandomProducts();

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProduct.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProduct[i].name} had ${allProduct[i].views} views and was clicked ${allProduct[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event) { //eslint-disable-line
  if (clicks === clicksAllowed) {
    renderResults();
  }
}



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of views',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




renderRandomProducts();


myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);

'use strict';

// global variables
let allProduct = [];
let clicks = 0;
let clicksAllowed = 25;
let renderImages = [];

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

  while (renderImages.length < 6) {
    let uniqueProduct = selectRandomProductIndex();
    if (!renderImages.includes(uniqueProduct)) {
      renderImages.push(uniqueProduct);
    }

  }
console.log (renderImages)
  let productOne = renderImages.shift();
  let productTwo = renderImages.shift();
  let productThree = renderImages.shift();

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
    renderchart();
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

function renderchart() {
  let productName = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProduct.length; i++) {
    productName.push(allProduct[i].name);
    productViews.push(allProduct[i].views);
    productClicks.push(allProduct[i].clicks);
  }



  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'views',
        data: productViews,
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
      },
      {
        label: 'clicks',
        data: productClicks,
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
}



renderRandomProducts();


myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);

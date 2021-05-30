'use strict';

let allProduct = [];
let clicks = 0;
let clicksAllowed = 15;

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

imageOne.src = 'img/water-can.jpg';


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProduct.push(this);
}

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
new Product('sweep','png');
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

function handleProductClick(event){
  if(event.target === myContainer){
    alert('click on an IMAGE please');
  }

  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProduct.length; i++){
    if (clickedProduct === allProduct[i].name){
      allProduct[i].clicks++;
    }
  }
  renderRandomProducts();

  if(clicks === clicksAllowed){
    myContainer.removeEventListener('click', handleProductClick);
  }
}

function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < allProduct.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allProduct[i].name} had ${allProduct[i].views} views and was clicked ${allProduct[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event){ //eslint-disable-line
  if(clicks === clicksAllowed){
    renderResults();
  }
}

renderRandomProducts();


myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);

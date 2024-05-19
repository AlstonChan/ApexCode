document.getElementById('open-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '0';
});
  
document.getElementById('close-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '-300px';
});

//sync main cart and slide cart
function synchronizeItems() {
  const mainCartItems = document.querySelectorAll('.item');

  const slideCartItemsContainer = document.querySelector('.cart-items');

  slideCartItemsContainer.innerHTML = '';

  mainCartItems.forEach(function(item) {
      const clonedItem = item.cloneNode(true);
      const removeButton = clonedItem.querySelector('.remove-button');
      if (removeButton) {
          removeButton.remove();
      }
      const itemName = clonedItem.querySelector('.item-name').textContent;
      const itemPrice = clonedItem.querySelector('.item-price').textContent;
      const slideCartItem = document.createElement('div');
      slideCartItem.classList.add('cart-item');
      slideCartItem.innerHTML = `
          <div class="item-details">
              <h3>${itemName}</h3>
              <p>${itemPrice}</p>
          </div>
          <button class="remove-item">&times;</button>
      `;
      slideCartItemsContainer.appendChild(slideCartItem);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  synchronizeItems();
});

const slideCartRemoveButtons = document.querySelectorAll('.cart-item .remove-item');

function removeSlideCartItem(event) {
  const itemContainer = event.target.closest('.cart-item');
  itemContainer.remove();
}

slideCartRemoveButtons.forEach(button => {
  button.addEventListener('click', removeSlideCartItem);
});

document.getElementById('open-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '0';
});

document.getElementById('close-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '-300px';
});


//remove button
const removeButtons = document.querySelectorAll('.remove-button');

function removeItem(event) {
    const itemContainer = event.target.closest('.item');
    itemContainer.remove();
}

removeButtons.forEach(button => {
    button.addEventListener('click', removeItem);
});

//calculate total price for main cart
document.addEventListener("DOMContentLoaded", function() {

  const itemPrices = document.querySelectorAll('.item-price');

  let totalPrice = 0;

  itemPrices.forEach(function(item) {
      const priceString = item.textContent.trim().substring(3); 
      const price = parseFloat(priceString);
      totalPrice += price;
  });
  const totalPriceElement = document.querySelector('.total-container h2');
  totalPriceElement.textContent = 'Total: RM ' + totalPrice.toFixed(2);
});

document.getElementById('open-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '0';
});
  
document.getElementById('close-cart').addEventListener('click', function() {
  document.querySelector('.cart-container').style.right = '-300px';
});

const removeButtons = document.querySelectorAll('.remove-button');

function removeItem(event) {
    const itemContainer = event.target.closest('.item');
    itemContainer.remove();
}

removeButtons.forEach(button => {
    button.addEventListener('click', removeItem);
});

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

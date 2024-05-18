document.getElementById('open-cart').addEventListener('click', function() {
    document.querySelector('.cart-container').style.right = '0';
  });
  
  document.getElementById('close-cart').addEventListener('click', function() {
    document.querySelector('.cart-container').style.right = '-300px';
  });
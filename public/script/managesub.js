document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
  
    const addToCart = (plan) => {
      cart.push(plan);
      alert(`${plan.charAt(0).toUpperCase() + plan.slice(1)} Membership added to cart!`);
      console.log('Cart:', cart);
    };

    const cancelSubscription = () => {
      const confirmation = confirm('Are you sure you want to cancel your subscription?');
      if (confirmation) {
        alert('Your subscription has been canceled.');
        console.log('Subscription canceled.');
      }
    };
  
    //cancel subscription button
    document.getElementById('cancel-subscription').addEventListener('click', cancelSubscription);
    //add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (event) => {
        const plan = event.target.getAttribute('data-plan');
        addToCart(plan);
      });
    });
  });
  
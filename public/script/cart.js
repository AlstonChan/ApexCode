const fetchStatus = new Proxy(
  { error: null, data: null },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      return Reflect.set(...arguments);
    },
  }
);

const cartContainer = document.getElementById("cartContainer");

(async () => {
  const response = await fetch("public/course.json");
  if (response.ok) {
    /**
     * @type {import("./types").CourseData}
     */
    const data = await response.json();

    fetchStatus.data = data.courses;

    if (cartContainer) {
      // Get the data from local storage and create the item container
      // for each item in the cart. The cart only stores the id of the course

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart) {
        cart.forEach((courseId) => {
          const item = document.createElement("div");
          item.classList.add("item");

          // Get the course details from the fetchStatus object
          const course = fetchStatus.data.find(
            (course) => course.id === Number(courseId)
          );

          if (course) {
            item.innerHTML = `
            <img src="public/assets/images/course-thumbnail/${course.thumbnail}" alt="${course.title}" />
            <div class="item-details">
                <p class="item-name">${course.title}</p>
                <button data-id=${course.id} class="remove-button">Remove</button>
                <p class="item-price">RM 89.99</p>
            </div>
        `;
            cartContainer.appendChild(item);
          }
        });
      }
    }

    //remove button
    const removeButtons = document.querySelectorAll("[data-id]");
    function removeItem(event) {
      const itemContainer = event.target.closest(".item");
      const itemId = event.target.getAttribute("data-id");
      console.log(itemId);
      // remove the item from the cart
      itemContainer.remove();
      // remove the item (id) from the local storage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const newCart = cart.filter((id) => id !== itemId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      // recalculate the total price
      calculateTotal();

      // if the cart is empty, show a message
      if (cartContainer.children.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
      }
    }
    removeButtons.forEach((button) => {
      button.addEventListener("click", removeItem);
    });

    //calculate total price for main cart
    function calculateTotal() {
      const itemPrices = document.querySelectorAll(".item-price");

      let totalPrice = 0;

      itemPrices.forEach(function (item) {
        const priceString = item.textContent.trim().substring(3);
        const price = parseFloat(priceString);
        totalPrice += price;
      });
      const totalPriceElement = document.querySelector(".total-container h2");
      totalPriceElement.textContent = "Total: RM " + totalPrice.toFixed(2);
    }
    calculateTotal();

    // if the cart is empty, show a message
    if (cartContainer.children.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty</p>";
    }
  } else {
    fetchStatus.error = "Course not found";
  }
})();

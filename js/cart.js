// Basic cart functions using browser localStorage.
var CART_KEY = "bookShopCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, price) {
  var cart = getCart();
  var found = cart.find(function (book) {
    return book.name === name;
  });

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  saveCart(cart);
  alert(name + " added to your cart.");
}

function changeQuantity(name, change) {
  var cart = getCart();
  var found = cart.find(function (book) {
    return book.name === name;
  });

  if (found) {
    found.quantity += change;
    if (found.quantity <= 0) {
      cart = cart.filter(function (book) {
        return book.name !== name;
      });
    }
  }
  saveCart(cart);
  renderCart();
}

function removeBook(name) {
  var cart = getCart().filter(function (book) {
    return book.name !== name;
  });
  saveCart(cart);
  renderCart();
}

function renderCart() {
  var body = document.getElementById("cartBody");
  var totalCell = document.getElementById("cartTotal");
  if (!body) return;

  var cart = getCart();
  var total = 0;
  body.innerHTML = "";

  if (cart.length === 0) {
    body.innerHTML = '<tr><td colspan="5">Your cart is empty. Add a book from the catalogue.</td></tr>';
  } else {
    cart.forEach(function (book) {
      var amount = book.price * book.quantity;
      total += amount;
      var row = document.createElement("tr");
      row.innerHTML =
        '<td class="book-name"></td>' +
        '<td>₹' + book.price.toFixed(2) + '</td>' +
        '<td><button class="qty-btn" data-action="minus">-</button>' +
        book.quantity +
        '<button class="qty-btn" data-action="plus">+</button></td>' +
        '<td>₹' + amount.toFixed(2) + '</td>' +
        '<td><button class="remove-btn" data-action="remove">Remove</button></td>';

      row.querySelector(".book-name").textContent = book.name;
      row.querySelector('[data-action="minus"]').onclick = function () {
        changeQuantity(book.name, -1);
      };
      row.querySelector('[data-action="plus"]').onclick = function () {
        changeQuantity(book.name, 1);
      };
      row.querySelector('[data-action="remove"]').onclick = function () {
        removeBook(book.name);
      };
      body.appendChild(row);
    });
  }

  if (totalCell) totalCell.textContent = "₹" + total.toFixed(2);
}

function showDepartmentHeading() {
  var params = new URLSearchParams(window.location.search);
  var department = params.get("dept");
  var heading = document.getElementById("catalogueHeading");
  if (department && heading) {
    heading.textContent = department + " Department - Book Catalogue";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-cart-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      addToCart(button.dataset.name, Number(button.dataset.price));
    });
  });
});

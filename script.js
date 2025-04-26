const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || 'Unknown';

let cartItems = [];
let total = 0;

function addToCart(itemName, price) {
  cartItems.push({ itemName, price });
  updateCart();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  total = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.itemName} - ₹${item.price} <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>`;
    cartList.appendChild(li);
    total += item.price;
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

function checkout() {
  if (cartItems.length === 0) {
    alert("Cart is empty!");
  } else {
    alert("Total Order Value: ₹" + total + "\nTable No: " + tableNumber);
  }
}

function sendToWhatsApp() {
  if (cartItems.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = `🧾 *Order from Table ${tableNumber}*\n\n`;
  cartItems.forEach(item => {
    message += `🍽️ ${item.itemName} - ₹${item.price}\n`;
  });
  message += `\n💰 *Total: ₹${total}*`;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "919575693559";

  const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  window.open(whatsappURL, '_blank', 'width=800,height=600');
}

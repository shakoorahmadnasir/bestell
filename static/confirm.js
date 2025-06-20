document.addEventListener("DOMContentLoaded", () => {
  const orderItemsContainer = document.getElementById("order-items");
  const orderTotalElement = document.getElementById("order-total");

  // Bestellung aus sessionStorage laden
  const orderDetails = JSON.parse(sessionStorage.getItem("cartData")) || [];
  if (orderDetails.length === 0) {
    alert("Keine Bestellung gefunden.");
    window.location.href = "index.html"; // Zurück zur Startseite, falls leer
    return;
  }

  // Gesamtsumme berechnen
  let total = 0;

  // Bestelldetails anzeigen
  orderDetails.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.quantity} × ${item.name}</span>
      <span>${itemTotal.toFixed(2)} €</span>
    `;
    orderItemsContainer.appendChild(listItem);
  });

  // Gesamtsumme anzeigen
  orderTotalElement.textContent = `${total.toFixed(2)} €`;

  // Bestellung annehmen
  document.getElementById("confirm-order").addEventListener("click", () => {
    alert("Bestellung wurde angenommen!");
    sessionStorage.removeItem("cartData"); // Warenkorb leeren
    window.location.href = "thankyou.html"; // Weiterleitung zur Danke-Seite
  });

  // Bestellung ablehnen
  document.getElementById("reject-order").addEventListener("click", () => {
    alert("Bestellung wurde abgelehnt.");
    sessionStorage.removeItem("cartData"); // Warenkorb leeren
    window.location.href = "index.html"; // Zurück zur Startseite
  });
});

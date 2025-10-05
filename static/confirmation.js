document.addEventListener("DOMContentLoaded", () => {
  const orderDetails = JSON.parse(localStorage.getItem("lastOrderDetails"));
  const productList = document.getElementById("product-list");
  const deliveryInfo = document.getElementById("delivery-info");

  if (orderDetails) {
    // build product lines
    let itemsHtml = orderDetails.items
      .map(
        (item) => `
          <li>
            <div><strong>${item.quantity} × ${item.name}</strong></div>
            <div>${(item.price * item.quantity).toFixed(2)} €</div>
            <div>
              <span>Beläge: ${item.toppings && item.toppings.length > 0 ? item.toppings.join(", ") : "-"}</span>
              <span>Kommentar: ${item.comment || "-"}</span>
            </div>
          </li>
        `
      )
      .join("");

    // ✅ add delivery cost as extra line
    if (orderDetails.deliveryOption === "delivery" && orderDetails.deliveryCost) {
      itemsHtml += `
        <li>
          <div><strong>Lieferung (${orderDetails.deliveryLocation})</strong></div>
          <div>${orderDetails.deliveryCost} €</div>
        </li>
      `;
    }

    // render product list with total
    productList.innerHTML = `
      <h2>Produkte</h2>
      <ul>${itemsHtml}</ul>
      <p class="total-price"><strong>Gesamt:</strong> ${orderDetails.total} €</p>
    `;

    // render delivery info
    deliveryInfo.innerHTML = `
      <h2>Lieferinformationen</h2>
      <p><strong>Name:</strong> ${orderDetails.name}</p>
      <p><strong>Telefon:</strong> ${orderDetails.phoneNumber}</p>
      <p><strong>Lieferoption:</strong> ${orderDetails.deliveryOption === "pickup" ? "Abholung" : "Lieferung"}</p>
      ${
        orderDetails.deliveryOption === "pickup"
          ? `<p><strong>Abholzeit:</strong> ${orderDetails.pickupTime}</p>`
          : `<p><strong>Lieferadresse:</strong> ${orderDetails.address}</p>
             <p><strong>Lieferort:</strong> ${orderDetails.deliveryLocation}</p>`
      }
      <p><strong>Zahlungsmethode:</strong> ${orderDetails.paymentMethod}</p>
    `;
  } else {
    productList.innerHTML = "<p>Keine Bestelldetails vorhanden.</p>";
    deliveryInfo.innerHTML = "<p>Keine Lieferdetails vorhanden.</p>";
  }
});

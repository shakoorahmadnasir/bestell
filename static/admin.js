document.addEventListener("DOMContentLoaded", () => {
  const ordersBody = document.getElementById("order-list");

  function fetchOrders() {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((orders) => {
        ordersBody.innerHTML = "";

        orders.forEach((order, index) => {
          const totalOrderPrice = order.items.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);

          const row = document.createElement("tr");
          row.innerHTML = `
                      <td>${index + 1}</td>
                      <td>${order.customer}</td>
                      <td>${order.items
                        .map(
                          (item) =>
                            `${item.quantity} × ${item.name} (${(
                              item.price * item.quantity
                            ).toFixed(2)} €)`
                        )
                        .join("<br>")}</td>
                      <td>${totalOrderPrice.toFixed(2)} €</td>
                      <td>${
                        order.deliveryOption === "delivery"
                          ? order.address
                          : `Abholung um ${order.pickupTime}`
                      }</td>
                      <td>${new Date(order.date).toLocaleString()}</td>
                      <td>${order.paymentMethod}</td>
                      <td>${order.phoneNumber}</td>
                      <td>
                          <button class="delete-order" data-id="${
                            order.id
                          }">Löschen</button>
                      </td>
                  `;
          ordersBody.appendChild(row);
        });

        // Eventlistener für Lösch-Buttons hinzufügen
        document.querySelectorAll(".delete-order").forEach((button) => {
          button.addEventListener("click", (e) => {
            const orderId = e.target.dataset.id;
            deleteOrder(orderId);
          });
        });
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Bestellungen:", error)
      );
  }

  function deleteOrder(orderId) {
    fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchOrders(); // Bestellungen nach Löschung neu laden
        } else {
          alert("Fehler beim Löschen der Bestellung.");
        }
      })
      .catch((error) =>
        console.error("Fehler beim Löschen der Bestellung:", error)
      );
  }

  fetchOrders();
  setInterval(fetchOrders, 10000);
});

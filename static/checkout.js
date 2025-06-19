document.addEventListener("DOMContentLoaded", () => {
  const cartData = JSON.parse(sessionStorage.getItem("cartData")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const deliveryOption = document.getElementById("delivery-option");
  const deliveryLocationField = document.getElementById(
    "delivery-location-group"
  );
  const deliveryLocationSelect = document.getElementById("delivery-location");
  const addressField = document.getElementById("address-group");
  const deliveryTimeField = document.getElementById("delivery-time-group");
  const deliveryTimeSelect = document.getElementById("delivery-time");
  const pickupTimeField = document.getElementById("pickup-time-group");
  const pickupTimeSelect = document.getElementById("pickup-time");
  const checkoutButton = document.querySelector(".checkout-button");
  const paymentButtons = document.querySelectorAll(".payment-button");
  const paymentMethodField = document.getElementById("payment-method");
  const MINIMUM_ORDER_VALUES = { ratingen: 15.0, heiligenhaus: 25.0 };

  let total = 0;
  let deliveryCost = 0;
  let minimumOrderValue = 0;

  // Initialisiere Warenkorb und berechne Gesamtsumme
  function initializeCart() {
    cartItemsContainer.innerHTML = ""; // Vorherigen Inhalt entfernen
    total = 0;

    if (cartData.length === 0) {
      checkoutButton.disabled = true; // Deaktiviere Checkout-Button bei leerem Warenkorb
      cartItemsContainer.innerHTML = "<li>Ihr Warenkorb ist leer.</li>";
      cartTotalElement.textContent = "0,00 €";
      return;
    }

    cartData.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${item.quantity} × ${
        item.name
      }</span><span>${itemTotal.toFixed(2)} €</span>`;
      cartItemsContainer.appendChild(listItem);
    });

    cartTotalElement.textContent = `${total.toFixed(2)} €`;
    checkoutButton.disabled = false; // Aktivieren, wenn Warenkorb nicht leer ist
  }

  initializeCart();

  // Generiere Zeit-Slots
  function generateTimeSlots(closingHour) {
    const now = new Date();
    const nextQuarter = Math.ceil(now.getMinutes() / 15) * 15;
    now.setMinutes(nextQuarter, 0, 0);

    const end = new Date();
    end.setHours(closingHour, 0, 0, 0);

    const slots = [];
    while (now <= end) {
      slots.push(formatTime(now));
      now.setMinutes(now.getMinutes() + 15);
    }
    return slots;
  }

  function formatTime(dateObj) {
    const h = String(dateObj.getHours()).padStart(2, "0");
    const m = String(dateObj.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  }

  function populateTimeSelect(selectElement, closingHour) {
    selectElement.innerHTML = "";
    generateTimeSlots(closingHour).forEach((slot) => {
      const option = document.createElement("option");
      option.value = slot;
      option.textContent = slot;
      selectElement.appendChild(option);
    });
  }

  populateTimeSelect(deliveryTimeSelect, 22);
  populateTimeSelect(pickupTimeSelect, 22);

  // Zahlungsmethode auswählen
  paymentButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedMethod = event.target.dataset.value;
      paymentMethodField.value = selectedMethod;

      paymentButtons.forEach((btn) => btn.classList.remove("selected"));
      event.target.classList.add("selected");
    });
  });

  deliveryLocationSelect.addEventListener("change", (event) => {
    const selectedOption = event.target.selectedOptions[0];
    deliveryCost = parseFloat(selectedOption.dataset.cost || 0);
    minimumOrderValue =
      MINIMUM_ORDER_VALUES[selectedOption.value.toLowerCase()] || 0;

    updateTotal();
    checkMinimumOrderValue();
  });

  function updateTotal() {
    const finalTotal = total + deliveryCost;
    cartTotalElement.textContent = `${finalTotal.toFixed(2)} €`;
  }

  function checkMinimumOrderValue() {
    if (cartData.length === 0) {
      checkoutButton.disabled = true;
      return;
    }

    if (deliveryOption.value === "delivery") {
      if (deliveryLocationSelect.value) {
        // Mindestbestellwert prüfen, wenn ein Lieferort ausgewählt wurde
        if (total + deliveryCost < minimumOrderValue) {
          checkoutButton.disabled = true;
          alert(
            `Mindestbestellwert für ${
              deliveryLocationSelect.value
            }: ${minimumOrderValue.toFixed(
              2
            )} €. Bitte fügen Sie weitere Artikel hinzu.`
          );
        } else {
          checkoutButton.disabled = false;
        }
      } else {
        // Wenn kein Lieferort ausgewählt wurde, Bestellung trotzdem zulassen
        checkoutButton.disabled = false;
      }
    } else {
      // Für Abholung gibt es keine Einschränkungen
      checkoutButton.disabled = false;
    }
  }

  deliveryOption.addEventListener("change", () => {
    if (deliveryOption.value === "pickup") {
      addressField.style.display = "none";
      deliveryLocationField.style.display = "none";
      deliveryTimeField.style.display = "none";
      pickupTimeField.style.display = "block";

      document.getElementById("address").required = false;
      document.getElementById("delivery-location").required = false;
      deliveryTimeSelect.required = false;
      pickupTimeSelect.required = true;

      deliveryCost = 0;
      minimumOrderValue = 0;
      updateTotal();
    } else {
      addressField.style.display = "block";
      deliveryLocationField.style.display = "block";
      deliveryTimeField.style.display = "block";
      pickupTimeField.style.display = "none";

      document.getElementById("address").required = true;
      document.getElementById("delivery-location").required = true;
      deliveryTimeSelect.required = true;
      pickupTimeSelect.required = false;
    }
    checkMinimumOrderValue();
  });

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (!paymentMethodField.value) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.");
      return;
    }

    if (cartData.length === 0) {
      alert("Ihr Warenkorb ist leer. Bitte fügen Sie Artikel hinzu.");
      return;
    }

    if (
      deliveryOption.value === "delivery" &&
      total < minimumOrderValue &&
      deliveryLocationSelect.value
    ) {
      alert(
        `Mindestbestellwert für ${
          deliveryLocationSelect.value
        }: ${minimumOrderValue.toFixed(
          2
        )} €. Bitte fügen Sie weitere Artikel hinzu.`
      );
      return;
    }

    const orderDetails = {
      items: cartData,
      total: (total + deliveryCost).toFixed(2),
      deliveryOption: deliveryOption.value,
      deliveryLocation:
        deliveryOption.value === "delivery"
          ? deliveryLocationSelect.value
          : null,
      address:
        deliveryOption.value === "delivery"
          ? document.getElementById("address").value
          : null,
      deliveryTime:
        deliveryOption.value === "delivery" ? deliveryTimeSelect.value : null,
      pickupTime:
        deliveryOption.value === "pickup" ? pickupTimeSelect.value : null,
      paymentMethod: paymentMethodField.value,
      phone: document.getElementById("phone").value,
      name: document.getElementById("name").value,
    };

    localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails));

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.removeItem("cartData");
          window.location.href = "confirmation.html";
        } else {
          alert("Fehler beim Absenden der Bestellung.");
        }
      })
      .catch((err) => console.error("Fehler beim Senden der Bestellung:", err));
  });

  updateTotal();
  checkMinimumOrderValue();
});

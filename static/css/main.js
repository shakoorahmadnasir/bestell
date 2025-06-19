const categoryToppings = {
  pizza: ["Extra Käse", "Peperoni", "Pilze", "Oliven"],
  burger: ["Extra Käse", "Speck", "Zwiebeln"],
  salate: ["Croutons", "Kürbiskerne", "Balsamico"],
  schnitzel: ["Pilzsauce", "Pfeffersauce", "Knoblauch"],
};

let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];
const categoryData = {
  pasta: [
    {
      name: "Spaghetti aglio e olio",
      description: "Mit Knoblauch und Öl",
      price: 7.0,
    },
    {
      name: "Spaghetti Napoli",
      description: "Mit Tomatensauce",
      price: 7.0,
    },
    {
      name: "Spaghetti Carbonara",
      description: "Mit Form-Truthahnschinken, Ei und Sahnesauce",
      price: 9.0,
    },
    {
      name: "Spaghetti Mozzarella",
      description: "Mit frischen Tomaten, Oliven und Mozzarella",
      price: 9.0,
    },
    {
      name: "Spaghetti Chef",
      description: "Mit Form-Truthahnschinken, Champignons und Sahnesauce",
      price: 9.5,
    },
    {
      name: "Spaghetti Bolognese",
      description: "Mit Rindfleisch-Tomatensauce",
      price: 9.0,
    },
    {
      name: "Spaghetti Frutti di Mare",
      description: "Mit Meeresfrüchten, Knoblauch und Tomatensauce",
      price: 10.5,
    },
    {
      name: "Spaghetti Speciale",
      description:
        "Mit Rindfleischstreifen, Spinat, Basilikum und Tomatensauce",
      price: 10.5,
    },
    {
      name: "Spaghetti ai Gamberi",
      description: "Mit Garnelen, Knoblauch und Tomatensauce",
      price: 11.0,
    },
    {
      name: "Spaghetti Verdi",
      description:
        "Mit Form-Truthahnschinken, Champignons, Broccoli, Knoblauch und Sahnesauce",
      price: 10.5,
    },
    {
      name: "Penne Gorgonzola",
      description: "Mit Gorgonzola, Spinat, Knoblauch und Sahnesauce",
      price: 10.0,
    },
    {
      name: "Penne al Forno",
      description:
        "Mit Form-Truthahnschinken, Champignons, Bolognese-Sahnesauce und mit Käse überbacken",
      price: 11.0,
    },
    {
      name: "Penne La Torre",
      description:
        "Mit Krabben, Form-Truthahnschinken, Champignons und Bolognese-Sahnesauce",
      price: 11.5,
    },
    {
      name: "Penne di Pollo",
      description: "Mit Hähnchen, Broccoli, Champignons und Sahnesauce",
      price: 11.0,
    },
    {
      name: "Mezze Penne Rucola",
      description: "Mit frischen Tomaten, Zwiebeln, Rucola und Parmesan",
      price: 9.5,
    },
    {
      name: "Penne alla Diavola",
      description: "Salami mit Pikant",
      price: 9.5,
    },
    {
      name: "Mezze Penne 4 Formaggi",
      description: "Mit Gorgonzola, Gouda, Mozzarella, Parmesan und Sahnesauce",
      price: 10.0,
    },
    {
      name: "Mezze Penne al Salmone",
      description: "Mit Lachsfiletstücken, Knoblauch, Dill und Sahnesauce",
      price: 12.0,
    },
    {
      name: "Tortellini Chef",
      description: "Mit Form-Truthahnschinken, Champignons und Sahnesauce",
      price: 10.5,
    },
    {
      name: "Tortellini al Forno",
      description:
        "Mit Form-Truthahnschinken, Champignons, Bolognese-Sahnesauce und mit Käse überbacken",
      price: 11.5,
    },
    {
      name: "Penne Primavera",
      description: "Mit frischen Tomaten, Basilikum und Mozzarella",
      price: 9.0,
    },
    {
      name: "Penne Contadina",
      description:
        "Mit Zucchini, Aubergine, Paprika, Basilikum und Tomatensauce",
      price: 9.5,
    },
    {
      name: "Penne di Tonno",
      description:
        "Mit Thunfisch, Zwiebeln, Basilikum, Paprika und Tomatensauce",
      price: 10.5,
    },
    {
      name: "Lasagne",
      description: "Mit Bolognese-Sahnesauce und Käse überbacken",
      price: 10.5,
    },
  ],

  salate: [
    {
      name: "Insalata Mista",
      description: "Eisbergsalat, Gurke, Mais und Tomate",
      price: 6.5,
    },
    {
      name: "Insalata Italia",
      description: "Mista, Form-Truthahnschinken, Käse, Röllchen",
      price: 7.5,
    },
    {
      name: "Insalata Chef",
      description: "Mista mit Ananas, Mais und Paprika",
      price: 8.5,
    },
    {
      name: "Insalata Capricciosa",
      description:
        "Mista mit Form-Truthahnschinken und Käse, Röllchen, Zwiebeln, Artischocken und Oliven",
      price: 9.0,
    },
    {
      name: "Insalata Tonno",
      description: "Mista mit Thunfisch und Zwiebeln",
      price: 7.5,
    },
    {
      name: "Insalata Gamberi",
      description: "Mista mit Krabben",
      price: 8.0,
    },
    {
      name: "Insalata Nizza",
      description: "Mista mit Thunfisch, Zwiebeln, Artischocken, Oliven und Ei",
      price: 9.5,
    },
    {
      name: "Insalata Primavera",
      description:
        "Mista mit Form-Truthahnschinken und Käse, Röllchen, Ananas, Mais und Krabben",
      price: 8.5,
    },
    {
      name: "Insalata La Torre",
      description:
        "Mista mit Form-Truthahnschinken und Käse, Röllchen, Krabben, Thunfisch, Zwiebeln, Artischocken und Oliven",
      price: 9.5,
    },
    {
      name: "Insalata Fitness",
      description:
        "Mista mit Hähnchen, gebratenen Champignons, Paprika und Zwiebeln",
      price: 8.5,
    },
    {
      name: "Insalata di Pollo",
      description: "Hähnchenfleisch",
      price: 9.0,
    },
    {
      name: "Insalata Salmone",
      description: "Gemischter Salat, Lachs und Thunfisch",
      price: 10.0,
    },
  ],

  vorspeisen: [
    {
      name: "Focaccia",
      description: "Mit Knoblauch",
      price: 4.5,
    },
    {
      name: "Focaccia Caprese",
      description: "Mit Mozzarella, frischen Tomaten und Zwiebeln",
      price: 7.5,
    },
    {
      name: "Bruschette con aglio",
      description: "Geröstetes Weißbrot mit Knoblauch",
      price: 4.5,
    },
    {
      name: "Bruschette con pomodori",
      description: "Geröstetes Weißbrot mit Tomaten und Zwiebeln",
      price: 7.0,
    },
    {
      name: "Caprese",
      description: "Mozzarella mit Tomaten und Basilikum",
      price: 9.0,
    },
    {
      name: "Crema di pomodori",
      description: "Hausgemachte Tomatensuppe",
      price: 5.5,
    },
    {
      name: "Champignonpfanne",
      description: "Mit Zwiebeln und geröstetem Knoblauchbrot",
      price: 8.5,
    },
  ],

  schnitzel: [
    {
      name: "100 Schnitzel Wiener Art",
      description: "Putenschnitzel mit Pommes und Salat",
      price: 9.5,
    },
    {
      name: "101 Schnitzel Hawaii",
      description:
        "Putenschnitzel mit Pommes und Salat, mit Form-Truthahnschinken und Ananas",
      price: 10.5,
    },
    {
      name: "102 Schnitzel Balkan Art",
      description: "Putenschnitzel mit Pommes und Salat, mit Paprikasauce",
      price: 10.5,
    },
    {
      name: "103 Schnitzel Jägers Art",
      description: "Putenschnitzel mit Pommes und Salat, mit Pilzsauce",
      price: 10.5,
    },
  ],

  burger: [
    {
      name: "105 Hamburger mit Pommes",
      description:
        "Sesambrötchen, frischer Blattsalat, Zwiebeln, Tomaten, Gurken, gegrillter Rindfleisch-Patty",
      price: 12.0,
    },
    {
      name: "106 Cheeseburger mit Pommes",
      description:
        "Sesambrötchen, frischer Blattsalat, Zwiebeln, Tomaten, Gurken, Cheddar, gegrillter Rindfleisch-Patty",
      price: 15.0,
    },
    {
      name: "107 Burger La Torre mit Pommes",
      description:
        "Sesambrötchen, frischer Blattsalat, Zwiebeln, Tomaten, Gurken, Cheddar, 2x gegrillter Rindfleisch-Patty",
      price: 12.0,
    },
  ],

  pizzabrötchen: [
    {
      name: "110 Pizzabrötchen",
      description: " mit Kräutercreme",
      price: 3.5,
    },
    {
      name: "111 Pizzabrötchen ",
      description: "mit Form-Truthahnschinken und Käse",
      price: 6.5,
    },
    {
      name: "112 Pizzabrötchen ",
      description: "mit Rindersalami und Käse",
      price: 6.5,
    },
    {
      name: "113 Pizzabrötchen ",
      description: "mit Thunfisch und Käse",
      price: 6.5,
    },
  ],

  aufläufe: [
    {
      name: "120 Broccoli Auflauf",
      description:
        "Auflauf mit Broccoli, Zwiebeln, Paprika und Kartoffeln d), i)",
      price: 9.5,
    },
    {
      name: "121 Spinat Auflauf",
      description:
        "Auflauf mit Spinat, Zwiebeln, Paprika und Kartoffeln d), i)",
      price: 9.5,
    },
    {
      name: "122 Gemüse Auflauf",
      description:
        "Auflauf mit Champignons, Spinat, Broccoli, Zwiebeln, Paprika und Kartoffeln d), i)",
      price: 10.0,
    },
    {
      name: "123 Moussaka",
      description:
        "Auberginen, Zucchini, Hackfleisch, Kartoffeln, Paprika d), i)",
      price: 10.0,
    },
  ],

  getränke: [
    {
      name: "200 Frankenheim Alt",
      description: "0,5l",
      price: 3.5,
    },
    {
      name: "201 Paulaner Weizenbier",
      description: "0,5l",
      price: 3.5,
    },
    {
      name: "202 Lambrusco",
      description: "0,7l",
      price: 9.5,
    },
    {
      name: "203 Merlot",
      description: "0,7l",
      price: 9.5,
    },
    {
      name: "204 Chardonnay",
      description: "0,7l",
      price: 9.5,
    },
    {
      name: "205 Coca Cola",
      description: "1,0l",
      price: 3.5,
    },
    {
      name: "206 Fanta",
      description: "1,0l",
      price: 3.5,
    },
    {
      name: "207 Sprite",
      description: "1,0l",
      price: 3.5,
    },
    {
      name: "208 Coca Cola ZERO",
      description: "1,0l",
      price: 3.5,
    },
    {
      name: "209 Wasser",
      description: "1,0l",
      price: 3.5,
    },
    {
      name: "210 König Pilsener",
      description: "0,5l",
      price: 3.5,
    },
  ],

  // Kategorie rendern und Produkte anzeigen
  // Zentrale Datenstruktur für Kategorien

  pizza: [
    {
      id: 1,
      name: "Margherita",
      description: "Tomaten, Käse",
      prices: { klein: 5.5, mittel: 7.5, groß: 9.5 },
    },
    {
      id: 2,
      name: "Salami",
      description: "Mit Rindersalami",
      prices: { klein: 6.5, mittel: 8.5, groß: 10.0 },
    },
    {
      id: 3,
      name: "Tonno",
      description: "Mit Thunfisch und Zwiebeln",
      prices: { klein: 7.0, mittel: 9.0, groß: 11.0 },
    },
    {
      id: 4,
      name: "Funghi",
      description: "Mit Champignons",
      prices: { klein: 5.5, mittel: 7.0, groß: 9.0 },
    },
    {
      id: 5,
      name: "Spinaci",
      description: "Mit frischem Spinat",
      prices: { klein: 6.0, mittel: 8.0, groß: 10.0 },
    },
    {
      id: 6,
      name: "Prosciutto",
      description: "Mit Form-Truthahnschinken",
      prices: { klein: 6.5, mittel: 8.5, groß: 10.5 },
    },
    {
      id: 7,
      name: "Bolo",
      description: "Fleischsauce",
      prices: { klein: 6.5, mittel: 8.5, groß: 10.5 },
    },
    {
      id: 8,
      name: "Hawaii",
      description: "Mit Form-Truthahnschinken und Ananas",
      prices: { klein: 6.5, mittel: 8.5, groß: 10.5 },
    },
    {
      id: 9,
      name: "Vesuvio",
      description: "Mit Salami und Zwiebel",
      prices: { klein: 7.0, mittel: 9.0, groß: 11.0 },
    },
    {
      id: 10,
      name: "Calzone",
      description: "Gefüllt mit Form-Truthahnschinken, Champignons und Käse",
      prices: { klein: 7.0, mittel: 9.0, groß: 11.0 },
    },
    {
      id: 11,
      name: "Italia",
      description: "Mit frischen Tomaten, Mozzarella und Basilikum",
      prices: { klein: 7.5, mittel: 9.5, groß: 11.5 },
    },
    {
      id: 12,
      name: "Arrabiata",
      description: "Mit Rindersalami, Zwiebeln, Rucola und Parmesan (scharf)",
      prices: { klein: 7.5, mittel: 9.5, groß: 11.5 },
    },
    {
      id: 13,
      name: "Capricciosa",
      description: "Mit Form-Truthahnschinken, Zwiebeln und Artischocken",
      prices: { klein: 7.5, mittel: 9.5, groß: 11.5 },
    },
    {
      id: 14,
      name: "Napoli",
      description: "Mit Oliven, Kapern und Sardellen",
      prices: { klein: 7.0, mittel: 9.0, groß: 11.0 },
    },
    {
      id: 15,
      name: "Rigina",
      description: "Mit Form-Truthahnschinken und Champignons",
      prices: { klein: 6.5, mittel: 8.5, groß: 10.5 },
    },
    {
      id: 16,
      name: "Mare & Monti",
      description: "Mit Krabben und Spinat",
      prices: { klein: 7.5, mittel: 9.5, groß: 11.5 },
    },
    {
      id: 17,
      name: "O Sole Mio",
      description: "Mit Rindersalami, Form-Truthahnschinken, Oliven und Ei",
      prices: { klein: 8.0, mittel: 10.0, groß: 12.0 },
    },
    {
      id: 18,
      name: "Diavolo",
      description:
        "Mit Rindersalami, Form-Truthahnschinken, Champignons und Peperoni",
      prices: { klein: 8.0, mittel: 10.0, groß: 12.0 },
    },
    {
      id: 19,
      name: "Salmone & Spinaci",
      description: "Mit Lachs und Spinat",
      prices: { klein: 9.0, mittel: 11.0, groß: 13.0 },
    },
    {
      id: 20,
      name: "Bella Vita",
      description: "Mit Form-Truthahnschinken, Broccoli und Sauce Hollandaise",
      prices: { klein: 8.5, mittel: 10.5, groß: 12.5 },
    },
    {
      id: 21,
      name: "Quattro Formaggi",
      description: "Mit Gorgonzola, Mozzarella, Parmesan und Gouda",
      prices: { klein: 8.5, mittel: 10.5, groß: 12.5 },
    },
    {
      id: 22,
      name: "San Marco",
      description: "Mit Form-Truthahnschinken, Rindersalami und Hirtenkäse",
      prices: { klein: 8.5, mittel: 10.5, groß: 12.5 },
    },
    {
      id: 23,
      name: "Gamberetti",
      description: "Mit Krabben und Knoblauch",
      prices: { klein: 9.0, mittel: 11.0, groß: 13.0 },
    },
    {
      id: 24,
      name: "Frutti di Mare",
      description: "Mit Meeresfrüchten und Knoblauch",
      prices: { klein: 9.5, mittel: 11.5, groß: 13.5 },
    },
    {
      id: 25,
      name: "Speciale",
      description:
        "Mit Rindfleischstreifen, frischen Tomaten, Paprika, Champignons und Zwiebel",
      prices: { klein: 9.0, mittel: 11.0, groß: 13.0 },
    },
    {
      id: 26,
      name: "Am Markt",
      description: "Mit Hähnchenfleisch, Champignons, Hirtenkäse und Paprika",
      prices: { klein: 9.5, mittel: 11.5, groß: 13.5 },
    },
    {
      id: 27,
      name: "Pirata",
      description: "Mit Thunfisch, Spinat, Paprika und Krabben",
      prices: { klein: 9.5, mittel: 11.5, groß: 13.5 },
    },
    {
      id: 28,
      name: "Quattro Stagioni",
      description:
        "Mit Form-Truthahnschinken, Champignons, Thunfisch und Artischocken",
      prices: { klein: 9.5, mittel: 11.5, groß: 13.5 },
    },
    {
      id: 29,
      name: "Vegetarisch",
      description: "Mit Broccoli, Spinat, Paprika, Zwiebeln und Artischocken",
      prices: { klein: 9.0, mittel: 11.0, groß: 13.0 },
    },
    {
      id: 30,
      name: "La Torre",
      description:
        "Mit Rindersalami, Form-Truthahnschinken, Champignons, Spinat und Krabben",
      prices: { klein: 10.5, mittel: 12.5, groß: 14.5 },
    },
  ], // Hier wird die Pizza-Datenstruktur integriert, siehe separate Datei
};

document.addEventListener("DOMContentLoaded", () => {
  const categoryContainer = document.querySelector(".menu-categories");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceContainer = document.getElementById("total-price");

  let cart = JSON.parse(sessionStorage.getItem("cartData")) || [];

  // Render categories
  function renderCategories() {
    const categoriesHTML = `
      <div class="category-item pizza">
        <h3>Pizza</h3>
        <a href="#" class="view-category pizza">Alle ansehen</a>
      </div>
      <div class="category-item pasta">
        <h3>Pasta</h3>
        <a href="#" class="view-category pasta">Alle ansehen</a>
      </div>
      <div class="category-item salate">
        <h3>Salate</h3>
        <a href="#" class="view-category salate">Alle ansehen</a>
      </div>
      <div class="category-item vorspeisen">
        <h3>Vorspeisen</h3>
        <a href="#" class="view-category vorspeisen">Alle ansehen</a>
      </div>
      <div class="category-item schnitzel">
        <h3>Schnitzel</h3>
        <a href="#" class="view-category schnitzel">Alle ansehen</a>
      </div>
      <div class="category-item burger">
        <h3>Burger</h3>
        <a href="#" class="view-category burger">Alle ansehen</a>
      </div>
      <div class="category-item pizzabrötchen">
        <h3>Pizzabrötchen</h3>
        <a href="#" class="view-category pizzabrötchen">Alle ansehen</a>
      </div>
      <div class="category-item aufläufe">
        <h3>Aufläufe</h3>
        <a href="#" class="view-category aufläufe">Alle ansehen</a>
      </div>
      <div class="category-item getränke">
        <h3>Getränke</h3>
        <a href="#" class="view-category getränke">Alle ansehen</a>
      </div>
    `;
    categoryContainer.innerHTML = categoriesHTML;

    document.querySelectorAll(".view-category").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = link.classList[1];
        renderProducts(category);
        history.pushState(
          { view: "products", category },
          `${category} Produkte`
        );
      });
    });
  }

  // Render products
  function renderProducts(categoryName) {
    const category = categoryData[categoryName];

    if (!category) {
      categoryContainer.innerHTML =
        "<p>Keine Produkte in dieser Kategorie gefunden.</p>";
      return;
    }

    const productsHTML = category
      .map(
        (item) => `
          <div class="category-item">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            ${item.prices ? renderSizeButtons(item.name, item.prices) : ""}
            <div class="price-display">
              <span><span class="price">${
                item.prices?.klein.toFixed(2) || item.price.toFixed(2)
              } €</span></span>
            </div>
            <button class="order-button" data-name="${item.name}" data-price="${
          item.price
        }">
              In den Warenkorb
            </button>
          </div>
        `
      )
      .join("");

    categoryContainer.innerHTML = productsHTML;

    const backButton = document.createElement("button");
    backButton.textContent = "Zurück zu den Kategorien";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", () => {
      renderCategories();
      history.pushState({ view: "categories" }, "Kategorien");
    });
    categoryContainer.appendChild(backButton);

    bindOrderButtons();
    bindSizeButtons();
  }

  // Render size buttons
  function renderSizeButtons(productName, prices) {
    return `
      <div class="size-selector">
        ${Object.keys(prices)
          .map(
            (size) => `
              <button class="size-button" data-name="${productName} (${size})" data-price="${
              prices[size]
            }">
                ${size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  // Bind size buttons to update price display and order button data
  function bindSizeButtons() {
    document.querySelectorAll(".size-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const parent = button.closest(".category-item");
        parent
          .querySelectorAll(".size-button")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const priceElement = parent.querySelector(".price");
        const selectedPrice = parseFloat(button.getAttribute("data-price"));
        const orderButton = parent.querySelector(".order-button");
        priceElement.textContent = `${selectedPrice.toFixed(2)} €`;
        orderButton.setAttribute("data-name", button.getAttribute("data-name"));
        orderButton.setAttribute(
          "data-price",
          button.getAttribute("data-price")
        );
      });
    });
  }

  // Bind order buttons to add selected size to cart
  function bindOrderButtons() {
    document.querySelectorAll(".order-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        if (!name || isNaN(price)) {
          console.error("Ungültige Produktdaten:", { name, price });
          return;
        }

        addToCart(name, price);
      });
    });
  }

  // Add item to cart
  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  }

  // Update cart display and calculate total price
  function updateCart() {
    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item">
          <div class="cart-item-header">${item.quantity} × ${item.name}</div>
          <div class="cart-item-details">${(item.price * item.quantity).toFixed(
            2
          )} €</div>
          <button class="delete-item" data-index="${index}">✖</button>
        </div>
      `
      )
      .join("");

    totalPriceContainer.textContent = `${cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)} €`;

    document.querySelectorAll(".delete-item").forEach((button) =>
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"), 10);
        cart.splice(index, 1);
        updateCart();
      })
    );

    sessionStorage.setItem("cartData", JSON.stringify(cart));
  }

  // Handle browser back and forward navigation
  window.addEventListener("popstate", (event) => {
    if (event.state?.view === "categories") {
      renderCategories();
    } else if (event.state?.view === "products") {
      renderProducts(event.state.category);
    }
  });

  // Initialize
  renderCategories();
  updateCart();
  history.replaceState({ view: "categories" }, "Kategorien");
});

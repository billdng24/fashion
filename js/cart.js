var carts = JSON.parse(sessionStorage.getItem("carts")) || [];

function renderProduct() {
  let rows = [];
  let totalPrice = 0;
  carts.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  for (let c of carts) {
    rows += `<li class="items-root">
                    <div class="items-wrap d-flex">
                        <div class="items-items d-flex flex-lg-column">
                            <div class="items-item d-flex ">
                                <a href="">
                                    <img src="img/${c.products.img}" alt="">
                                </a>
                                <div class="items-details d-flex flex-column">
                                    <div class="items-title"><a href="">${
                                      c.products.name
                                    }</a></div>
                                    <input min=1 max=10 type="number" onchange="updateCarts('${
                                      c.products.id
                                    }', event)" value="${
      c.quantity
    }" class="items-select"/>
                                </div>
                            </div>
                        </div>
                        <div class="items-price d-flex align-items-end flex-column">
                            <button class="items-remove-btn">
                                <i class="bi bi-x-lg" onclick="deleteCart('${
                                  c.products.id
                                }')"></i>
                            </button>
                            <div class="item-price">${
                              c.quantity * c.price
                            }</div>
                        </div>
                    </div>
                </li>`;
  }
  $(".items-list").html(rows);
}

function renderItems() {
  let rows = [];
  rows += `<h1>Your Bag</h1>
                <span class="cart-items-count d-flex align-items-center">${carts.length} items</span>`;
  $(".cart-header-content").html(rows);
}

function renderPrice() {
  let rows = [];
  let totalPrice = 0;
  carts.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  rows += `<h3 class="summary-details">Bag Subtotal</h3>
                <div class="price-root">${totalPrice}</div>`;
  $(".summary-subtotal").html(rows);
}

function updateCarts(id, event) {
  let c = carts.find((x) => x.products.id === id);
  c.quantity = parseInt(event.target.value);

  sessionStorage.setItem("carts", JSON.stringify(carts));
  renderProduct();
  renderPrice();
}

function deleteCart(id) {
  let index = carts.findIndex((x) => x.products.id === id);
  carts.splice(index, 1);
  sessionStorage.setItem("carts", JSON.stringify(carts));
  renderPrice();
  renderItems();
  renderProduct();
}

renderPrice();
renderItems();
renderProduct();

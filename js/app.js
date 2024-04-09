var products = JSON.parse(localStorage.getItem('products')) || [];
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

function renderProduct() {
    let rows = [];
    for( let p of products){
        rows += `<div class="col-lg-4 col-6">
                <div class="collection-item">
                    <div class="productListItem-colorway">
                        <a href=""><img src="img/${p.img}" alt=""></a>
                        <div class="productListItem-quickAdd">
                            <button class="productListItem-quickAddButton" onclick="addToCart('${p.id}')">+ Quick Add</button>
                        </div>
                    </div>
                    <div class="productListItem-titleWrap">
                        <div class="productListItem-buttonsImages">
                            <div class="buttonsSwatches-root">
                                <button class="buttonsSwatches-swatch">
                                    <div class="buttonsSwatches-img">
                                        <img src="img/color-1.webp" alt="">
                                    </div>
                                </button>
                                <button class="buttonsSwatches-swatch">
                                    <div class="buttonsSwatches-img">
                                        <img src="img/color-2.webp" alt="">
                                    </div>
                                </button>
                                <button class="buttonsSwatches-swatch">
                                    <div class="buttonsSwatches-img">
                                        <img src="img/color-3.webp" alt="">
                                    </div>
                                </button>
                                <button class="buttonsSwatches-swatch">
                                    <div class="buttonsSwatches-img">
                                        <img src="img/color-4.webp" alt="">
                                    </div>
                                </button>
                                <button class="buttonsSwatches-swatch">
                                    <div class="buttonsSwatches-img">
                                        <img src="img/color-5.webp" alt="">
                                    </div>
                                </button>
                                <button class="buttonsSwatches-more">+ 14 more</button>
                            </div>
                        </div>
                        <div class="productListItem-title">
                            <a href="">
                                <div class="productListItem-linkTitle">${p.name}</div>
                                <div class="productListItem-subTitle">LightSpeed; Lightweight</div>
                                <div class="productListItem-price">
                                    ${p.price - (p.discount * p.price / 100)}
                                    <s>${p.price}</s>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`
    }
    $('.product-render').html(rows);
}

renderProduct()

function addToCart(id) {
    let p = products.find(x => x.id === id);
    let cartItem = carts.find(x => x.products.id === id)

    if(cartItem){
        cartItem.quantity += 1;
    } else {
        carts.push({
            products: p,
            price: p.price - (p.price * p.discount / 100),
            quantity: 1
        })
    }
    sessionStorage.setItem('carts', JSON.stringify(carts))
}

// Navbar
$(document).ready(() => {
    $('.nav-list').click(() => {
        $('.show').css({
            'display': 'none'
        })
        $('.nav-full').css({
            'display': 'block'
        })
    })
    $('.nav-close').click(() => {
        $('.nav-full').css({
            'display': 'none'
        })
        $('.show').css({
            'display': 'block'
        })
        $('#wrap').css({
            'background-color': 'transparent'
        })
    })
})
class Products {
    constructor(id, name, img, price, discount){
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.discount = discount;
    }
}

var products = JSON.parse(localStorage.getItem('products')) || [];

function getData() {
    let id = $('#id').val();
    let name = $('#name').val();
    let imgFile = $('#img').prop('files')[0];
    let img = imgFile ? imgFile.name : '';
    let price = parseInt($('#price').val());
    let discount = parseInt($('#discount').val());
    return new Products(id, name, img, price, discount)
}

function createProduct(product = new Products()) {
    // Validate product
    if(products.find(x => x.id === product.id)){
        alert('Mã sản phẩm đã tồn tại');
        return;
    }
    if(products.find(x => x.name === product.name)){
        alert('Tên sản phẩm đã tồn tại');
        return;
    }
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProduct(data = products){
    let rows = '';
    for(let p of data){
        rows += `<tr>
                    <td>${p.id}</td>
                    <td>
                        <img src="img/${p.img}" alt="" width="50" height="75"/>
                        ${p.name}
                    </td>
                    <td>${p.price}</td>
                    <td>${p.discount}</td>
                    <td class="d-flex">
                        <button class="btn btn-warning" onclick="updateProduct('${p.id}')">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteProduct('${p.id}')">Xóa</button>
                    </td>
                </tr>`
    }
    $('.list-products').html(rows);
}

renderProduct();

// Handle events
$('.btn-add').click(() => {
    let product = getData();
    console.log(product);
    createProduct(product);
    renderProduct(products);
})

$('.btn-save').click(() => {
    let p = getData();
    let productUpdate = products.find(x => x.id === p.id);
    productUpdate.id = p.id;
    productUpdate.name = p.name
    if (p.img !== '') {
        productUpdate.img = p.img;
    }
    productUpdate.price = p.price
    productUpdate.discount = p.discount
    localStorage.setItem('products', JSON.stringify(products));
    renderProduct(products);
})

function updateProduct(id) {
    let product = products.find(x => x.id === id);

    document.getElementById('id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('discount').value = product.discount;
}

function deleteProduct(id) {
    if(confirm('Bạn có muốn xóa không?')){
        let index = products.findIndex(x => x.id === id);
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProduct(products);
    }
}

function sortedProducts(events){
    let sort = events.target.value;
    console.log(sort);
    let result = [];
    if(sort === 'asc'){
        result = [...products].sort((a, b) => a.price - b.price);
    }else if(sort === 'desc'){
        result = [...products].sort((a, b) => b.price - a.price);
    }else {
        result = products;
    }
    localStorage.setItem('products', JSON.stringify(result));
    renderProduct(result);
}
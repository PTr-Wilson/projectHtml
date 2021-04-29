if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')//lấy về tập hợp tất cả các ptu có class là btn-danger
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)//xử lý sự kiện vào phần tử đã chỉ định
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')//lấy về tập hợp tất cả các ptu có class shop-item-button
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)//xử lý sự kiện vào phần tử đã chỉ định
}

function purchaseClicked() {
    alert('Cảm ơn bạn đã mua hàng!')
    var cartItems = document.getElementsByClassName('cart-items')[0]//trả về một tập hợp các phần tử con của một phần tử với tên lớp được chỉ định, dưới dạng đối tượng NodeList danh sách đầu tiên  
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)//xóa các phần tử ra khỏi ds
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target//trả về phần tử đã kích hoạt sự kiện
    if (isNaN(input.value) || input.value <= 0) {//isNaN:ko là 1 số
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText//lấy ra nd bên trong của class shop-item-title
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src//trả về giá trị của thuộc tính src của hình ảnh.
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')//tạo ra một nút phần tử có html là thẻ div.
    cartRow.classList.add('cart-row')//thêm chuyển đổi các lớp CSS trên một phần tử
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //nd giohang html
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" style="width:40px;height:50px">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" min="1" max="1">
    <button class="btn btn-danger" type="button" onclick="xoa()">Xóa</button>
    </div>`
    cartRow.innerHTML = cartRowContents//chèn nd đã thêm vào
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}
function xoa(){
    itemCount--;
    $('#itemCount').text(itemCount);
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('',''))//ép kiểu dl giá tiền sang float
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total+'.000'+'đ'//lấy về nd bên trong của class cart-total-price 
     $('.cart-total-title').css('display', 'inline');
    $('.btn-purchase').css('display', 'inline');
    if( total==0)
    {
         document.getElementsByClassName('cart-total-price')[0].innerText='Không có sản phẩm nào';
         $('.cart-total-title').css('display', 'none');
    $('.btn-purchase').css('display', 'none');
    }
}
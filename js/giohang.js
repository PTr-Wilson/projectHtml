// Item in your cart 

var itemCount = 0;
var priceTotal = 0;



// Thêm sản phẩm vào giỏ hàng
$('.add').click(function () {
    itemCount++;

    $('#itemCount').text(itemCount).css('display', 'block');
    $(this).siblings().clone().appendTo('#cartItems').append('<button class="removeItem">Xóa khỏi giỏ hàng</button>');

    // Tính tổng tiền
    var price = parseInt($(this).siblings().find('.dongia').text());
    priceTotal += price;
    $('#cartTotal').text("Tổng: " + priceTotal + "₫");
});



// Ẩn và hiện giỏ hàng
$('.kichhoatCart').click(function () {
    $('#shoppingCart').toggle();
});


// Empty Cart
$('#emptyCart').click(function () {
    itemCount = 0;
    priceTotal = 0;

    $('#itemCount').css('display', 'none');
    $('#cartItems').text('');
    $('#cartTotal').text("Tổng: " + priceTotal + "₫");
});

// Xóa sản phẩm trong giỏ hàng
$('#shoppingCart').on('click', '.removeItem', function () {
    $(this).parent().remove();
    itemCount--;
    $('#itemCount').text(itemCount);

    // Cập nhật lại tổng tiền sau khi xóa sp
    var price = parseInt($(this).siblings().find('.dongia').text());
    priceTotal -= price;
    $('#cartTotal').text("Tổng: " + priceTotal + "₫");

    if (itemCount == 0) {
        $('#itemCount').css('display', 'none');
    }
});
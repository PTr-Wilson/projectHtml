// tìm kiếm
function myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//them


// sửa

// xóa
function deleteR(xoa)
{
var i=confirm("bạn có chắc muốn xóa ?");
if(i==true){
    var i = xoa.parentNode.parentNode.rowIndex;
    document.getElementById("table").deleteRow(i);
}
}

// menu


// hiện ẩn thêm
$('.add').click(function () {
    $('#bgaddRow').toggle();
});

// hiện ẩn sửa
$('.update').click(function () {
    $('#EditTB').toggle();
});
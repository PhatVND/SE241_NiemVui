
function getPageCount(inputString, oddOrEven = "default") {
    // Định nghĩa các biểu thức chính quy cho hai định dạng
    const rangeFormat = /^\d+\s*-\s*\d+$/; // Phù hợp với "<num1> - <num2>"
    const listFormat = /^\d+(,\s*\d+)*$/;  // Phù hợp với "<num1>,<num2>,...,<numN>"

    // Kiểm tra nếu chuỗi đầu vào là dạng khoảng
    if (rangeFormat.test(inputString)) {
        const [num1, num2] = inputString.split('-').map(num => parseInt(num.trim(), 10));
        if (num2 >= num1) {
            // Tính số trang dựa trên khoảng và lọc theo oddOrEven
            const pages = getPagesToPrint(num1, num2, oddOrEven);
            return pages.length; // Trả về số lượng trang
        }
        return 0; // Khoảng không hợp lệ nếu num2 < num1
    }

    // Kiểm tra nếu chuỗi đầu vào là dạng danh sách
    if (listFormat.test(inputString)) {
        const pages = inputString.split(',').map(num => parseInt(num.trim(), 10));
        // Lọc trang theo oddOrEven
        const filteredPages = pages.filter(page => {
            if (oddOrEven === "default") {
                return true; // Bao gồm tất cả các trang
            }
            if (oddOrEven === "1") {
                return page % 2 === 0; // Trang chẵn
            }
            if (oddOrEven === "2") {
                return page % 2 !== 0; // Trang lẻ
            }
            return false;
        });
        return filteredPages.length; // Trả về số lượng trang lọc
    }

    // Nếu không phải dạng khoảng hoặc danh sách, trả về 0
    return 0;
}

function getPagesToPrint(num1, num2, oddOrEven = "default") {
    const pages = [];

    // Kiểm tra điều kiện mặc định
    if (oddOrEven === "default") {
        for (let i = num1; i <= num2; i++) {
            pages.push(i);
        }
    }
    // Kiểm tra trang chẵn
    else if (oddOrEven === "1") {
        for (let i = num1; i <= num2; i++) {
            if (i % 2 === 0) {
                pages.push(i);
            }
        }
    }
    // Kiểm tra trang lẻ
    else if (oddOrEven === "2") {
        for (let i = num1; i <= num2; i++) {
            if (i % 2 !== 0) {
                pages.push(i);
            }
        }
    }

    return pages;
}


const printSubmit = document.querySelector("#printForm");
const printButton = document.querySelector("#submitButton");
printButton.addEventListener('click', async function (event) {
    event.preventDefault();

    // const formData = new FormData(this);
    let url = new URL(window.location.href);
    let printer = document.getElementById("printer");
    let filename = document.getElementById("filename");  
    let pages = document.getElementById("pages");
    let oddOrEven = document.getElementById("oddOrEven");
    let copies = document.getElementById("copies");
    let duplex = document.getElementById("duplex");
    let paperType = document.getElementById("paperType");
    let collation = document.getElementById("collation");
    let orientation = document.getElementById("orientation-select");
    let paperSize = document.getElementById("paperSize");
    let balance = document.getElementById("balance");
    console.log(filename.value ===" ");
    console.log(pages.value==="");
    console.log(oddOrEven.value);
    console.log(copies.value==="");
    console.log(duplex.value);
    console.log(paperType.value);
    console.log(collation.value);
    console.log(orientation.value);
    let annouceStr = "";
    if(filename.value ===" ") annouceStr+= "tải tệp,";
    if(printer.value==="default") annouceStr+= " chọn máy in,";
    if(pages.value==="") annouceStr+= " nhập trang cần in,";
    if(copies.value==="") annouceStr+= " nhập số bản copy,";
    if(duplex.value==="default") annouceStr+=" chọn kiểu in 1 mặt hoặc 2 mặt,";
    if(paperType.value==="default") annouceStr+= " chọn loại giấy in,";
    if(collation.value==="default") annouceStr+= " chọn kiểu collation,";
    if(orientation.value==="default") annouceStr+= " chọn chiều của trang in,";
    if(paperSize.value==="default") annouceStr+= " chọn kích cỡ văn bản,"
    if(annouceStr!=="") return alert(`Vui lòng ${annouceStr}`);
    if (!getPageCount(pages.value, oddOrEven.value)) return alert("Dau vao pages sai dinh dang");
    console.log(getPageCount(pages.value, oddOrEven.value));
    let totalMoney = 0;
    let pageCount = 0;
    if(duplex.value==="2-sided") pageCount =  Math.ceil(getPageCount(pages.value, oddOrEven.value)/2)
    if(duplex.value==="1-sided") pageCount =  getPageCount(pages.value, oddOrEven.value)
    if (paperType.value === "A5") totalMoney =pageCount * parseInt(copies.value) * 1;
    if (paperType.value === "A4") totalMoney = pageCount * parseInt(copies.value) * 2;
    if (paperType.value === "A3") totalMoney = pageCount * parseInt(copies.value) * 3;
    document.getElementById("totalMoney").setAttribute("value", totalMoney.toString());
    const isConfirm = confirm(`Can ${totalMoney} cho lan in nay, vui long xac nhan`);
    if (isConfirm) {
        if (totalMoney > balance.value) return alert(`Can ${totalMoney} nhung ban chi co ${balance.value} vui long nap them`)
        printSubmit.submit();
        alert(`Da nhan duoc yeu cau in an`)
    }

});

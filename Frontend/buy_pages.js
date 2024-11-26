function purchasePages() {
    const purchasePageCount = document.getElementById("purchasePageCount").value;
    const purchaseResultMessage = document.getElementById("purchaseResultMessage");

    if (purchasePageCount && purchasePageCount > 0) {
        purchaseResultMessage.style.color = "#28a745";
        purchaseResultMessage.textContent = `Giao dịch thành công! Bạn đã mua thêm ${purchasePageCount} trang in.`;
    } else {
        purchaseResultMessage.style.color = "#dc3545";
        purchaseResultMessage.textContent = "Vui lòng nhập số trang hợp lệ!";
    }
}



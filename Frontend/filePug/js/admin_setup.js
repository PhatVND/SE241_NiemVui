function submitForm() {
    const pageCount = document.getElementById("pageCount").value;
    const resultMessage = document.getElementById("resultMessage");

    if (pageCount && pageCount > 0) {
        resultMessage.style.color = "#28a745";
        resultMessage.textContent = `Thiết lập thành công! Số trang in mặc định: ${pageCount}`;
    } else {
        resultMessage.style.color = "#dc3545";
        resultMessage.textContent = "Vui lòng nhập số trang hợp lệ!";
    }
}

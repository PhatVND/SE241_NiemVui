const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.getElementById("file-name");

// Lắng nghe sự kiện khi người dùng chọn file
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Lấy file đầu tiên từ input
  if (file) {
    fileNameDisplay.textContent = file.name; // Gán tên file vào h2
  } else {
    fileNameDisplay.textContent = "Chưa tải tệp."; // Hiển thị khi không có file
  }
});
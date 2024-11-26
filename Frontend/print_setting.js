let isFileUploaded = false; // Trạng thái file đã tải lên hay chưa

// Xử lý nút upload file
document.getElementById("uploadFileButton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  console.log(fileInput.files[0].name)
  if (fileInput.files.length > 0) {
    isFileUploaded = true;
    document.getElementById("fileStatus").innerText = `Đã tải tệp: ${fileInput.files[0].name}`;
  } else {
    isFileUploaded = false;
    document.getElementById("fileStatus").innerText = "Chưa tải tệp.";
  }
});

// Xử lý nút submit form
document.getElementById("printForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!isFileUploaded) {
    alert("Vui lòng tải tệp trước khi in.");
    return;
  }

  const formData = new FormData(this);

  const printer = formData.get("printer") || "Mặc định";
  const copies = formData.get("copies") || 1;
  const duplex = formData.get("duplex") || "Mặc định";
  const paperType = formData.get("paperType") || "Mặc định";
  const collation = formData.get("collation") || "Mặc định";
  const orientation = formData.get("orientation") || "Mặc định";
  const paperSize = formData.get("paperSize") || "Mặc định";

  console.log(`Máy in: ${printer}`);
  console.log(`Số bản in: ${copies}`);
  console.log(`Kiểu in (duplex): ${duplex}`);
  console.log(`Loại giấy: ${paperType}`);
  console.log(`Kiểu Collated: ${collation}`);
  console.log(`Hướng giấy: ${orientation}`);
  console.log(`Kích cỡ giấy: ${paperSize}`);
  alert("Đã gửi yêu cầu in.");
});

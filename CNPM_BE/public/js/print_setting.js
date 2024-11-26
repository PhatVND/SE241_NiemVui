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
const urlInput = document.getElementById("fileInput");
const pdfRenderer = document.getElementById("pdf-renderer");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageNumberSpan = document.querySelector(".page-number");

let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;

// Render the selected page
const renderPage = (pageNum) => {
  pdfDoc.getPage(pageNum).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    const context = pdfRenderer.getContext("2d");

    pdfRenderer.height = viewport.height;
    pdfRenderer.width = viewport.width;

    // Clear the canvas before rendering
    context.clearRect(0, 0, pdfRenderer.width, pdfRenderer.height);

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    page.render(renderContext);
    pageNumberSpan.textContent = `${pageNum} of ${totalPages}`;
  });
};

// Load the PDF file
const loadPDF = (file) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const pdfData = new Uint8Array(e.target.result);
    pdfjsLib.getDocument({ data: pdfData }).promise.then((doc) => {
      pdfDoc = doc;
      totalPages = doc.numPages;
      currentPage = 1;
      renderPage(currentPage);
    });
  };
  reader.readAsArrayBuffer(file);
};

// Handle file input change
urlInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type === "application/pdf") {
    loadPDF(file);
  } else {
    alert("Please upload a valid PDF file.");
  }
});

// Handle Previous Page Button
prevButton.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage -= 1;
  renderPage(currentPage);
});

// Handle Next Page Button
nextButton.addEventListener("click", () => {
  if (currentPage >= totalPages) {
    return;
  }
  currentPage += 1;
  renderPage(currentPage);
});


// get file Uploaded

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
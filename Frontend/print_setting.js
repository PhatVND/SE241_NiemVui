document.getElementById("printForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this); 
  

    const file = formData.get("file") ? formData.get("file").name : "Không có tệp";
    const printer = formData.get("printer") || "Mặc định";
    const copies = formData.get("copies") || 1;
    const duplex = formData.get("duplex") || "Mặc định";
    const paperType = formData.get("paperType") || "Mặc định";
    const collation = formData.get("collation") || "Mặc định";
    const orientation = formData.get("orientation") || "Mặc định";
    const paperSize = formData.get("paperSize") || "Mặc định";
  
    console.log(`Tên tệp: ${file}`);
    console.log(`Máy in: ${printer}`);
    console.log(`Số bản in: ${copies}`);
    console.log(`Kiểu in (duplex): ${duplex}`);
    console.log(`Loại giấy: ${paperType}`);
    console.log(`Kiểu Collated: ${collation}`);
    console.log(`Hướng giấy: ${orientation}`);
    console.log(`Kích cỡ giấy: ${paperSize}`);
  });
  
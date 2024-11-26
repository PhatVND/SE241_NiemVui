let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 2;
const canvas = document.querySelector("#pdf-render");
const ctx = canvas ? canvas.getContext("2d") : null;

// Render the page
const renderPage = (num) => {
  pageIsRendering = true;

  // Get page
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // Output current page
    document.querySelector("#page-num").textContent = num;
  });
};

// Check for pages rendering
const queueRenderPage = (num) => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

// Show Prev Page
document.querySelector("#prev-page")?.addEventListener("click", () => {
  if (pageNum <= 1) return;
  pageNum--;
  queueRenderPage(pageNum);
});

// Show Next Page
document.querySelector("#next-page")?.addEventListener("click", () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  queueRenderPage(pageNum);
});

// Load PDF if url exists
if (typeof pdfUrl !== "undefined" && pdfUrl) {
  pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    document.querySelector("#page-count").textContent = pdfDoc.numPages;

    renderPage(pageNum);
  });
}

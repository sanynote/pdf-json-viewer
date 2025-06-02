import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import pdfWorker from "../worker/pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfViewer() {
  return (
    <div className="flex justify-center p-4">
      <Document
        file="/1.report.pdf"
        loading={<p>PDF 불러오는 중...</p>}
        error={<p>PDF 불러오기 실패</p>}
      >
        <Page
          pageNumber={1}
          width={600}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}

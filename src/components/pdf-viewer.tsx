import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdfWorker from "../worker/pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface BBox {
  l: number;
  t: number;
  r: number;
  b: number;
}

interface TextBlock {
  text: string;
  prov: { page_no: number; bbox: BBox }[];
}

interface Props {
  hoveredText: string | null;
  setHoveredText: (text: string | null) => void;
  selectedIdx: number | null;
}

export default function PdfViewer({
  hoveredText,
  setHoveredText,
  selectedIdx,
}: Props) {
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const pdfWidth = 600;
  const pdfOriginalWidth = 595.276;
  const scale = pdfWidth / pdfOriginalWidth;

  useEffect(() => {
    fetch("/1.report.json")
      .then((res) => res.json())
      .then((data) => setBlocks(data.texts))
      .catch((err) => console.error("JSON 로딩 실패:", err));
  }, []);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIdx]);

  return (
    <div className="flex justify-center p-4">
      <Document file="/1.report.pdf">
        <div className="relative w-[600px]">
          <Page
            pageNumber={1}
            width={pdfWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />

          {blocks.map((block, idx) => {
            const prov = block.prov?.[0];
            if (!prov || prov.page_no !== 1) return null;

            const { l, r, t, b } = prov.bbox;
            const left = l * scale;
            const top = (842 - t) * scale;
            const width = (r - l) * scale;
            const height = (t - b) * scale;

            const isSelected = selectedIdx === idx;
            const isActive =
              isSelected || hoveredText?.trim() === block.text.trim();

            return (
              <div
                key={idx}
                ref={isSelected ? selectedRef : null}
                onMouseEnter={() => setHoveredText(block.text)}
                onMouseLeave={() => setHoveredText(null)}
                className={`absolute z-40 ${
                  isActive
                    ? "border border-gray-400 bg-gray-100/40"
                    : "pointer-events-auto"
                }`}
                style={{
                  left,
                  top,
                  width,
                  height,
                  pointerEvents: "auto",
                }}
                title={block.text}
              />
            );
          })}
        </div>
      </Document>
    </div>
  );
}

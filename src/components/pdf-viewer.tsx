import { useEffect, useRef } from "react";
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
  self_ref: string;
  text: string;
  prov: { page_no: number; bbox: BBox }[];
}

interface Props {
  blocks: TextBlock[];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  selectedIdx: number | null;
}

export default function PdfViewer({
  blocks,
  hoveredId,
  setHoveredId,
  selectedIdx,
}: Props) {
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const pdfWidth = 600;
  const pdfOriginalWidth = 595.276;
  const scale = pdfWidth / pdfOriginalWidth;

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
            className="pointer-events-none"
          />

          {blocks.map((block, idx) => {
            const prov = block.prov?.[0];
            if (!prov) return null;

            const { l, r, t, b } = prov.bbox;
            const left = l * scale;
            const top = (842 - t) * scale;
            const width = (r - l) * scale;
            const height = (t - b) * scale;

            const isHovered = hoveredId === block.self_ref;
            const isSelected = selectedIdx === idx;
            const isVisible = isHovered || isSelected;

            return (
              <div
                key={block.self_ref}
                ref={isSelected ? selectedRef : null}
                onMouseEnter={() => {
                  setHoveredId(block.self_ref);
                  console.log(block.self_ref, "hovered");
                }}
                onMouseLeave={() => setHoveredId(null)}
                className={`absolute z-40 ${
                  isVisible ? "border border-gray-400 bg-gray-100/40" : ""
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

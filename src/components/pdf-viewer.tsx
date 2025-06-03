import { useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { TextBlock } from "../types/types";
import pdfWorker from "../worker/pdf-worker";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

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
  const scale = pdfWidth / 595.276;

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIdx]);

  const getBlockStyle = (bbox: any) => ({
    left: bbox.l * scale,
    top: (842 - bbox.t) * scale,
    width: (bbox.r - bbox.l) * scale,
    height: (bbox.t - bbox.b) * scale,
    pointerEvents: "auto",
  });

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

            const isHovered = hoveredId === block.self_ref;
            const isSelected = selectedIdx === idx;
            const isActive = isHovered || isSelected;

            return (
              <div
                key={block.self_ref}
                ref={isSelected ? selectedRef : null}
                onMouseEnter={() => setHoveredId(block.self_ref)}
                onMouseLeave={() => setHoveredId(null)}
                className={`absolute z-40 ${
                  isActive ? "border border-gray-400 bg-gray-100/40" : ""
                }`}
                style={getBlockStyle(prov.bbox) as React.CSSProperties}
                title={block.text}
              />
            );
          })}
        </div>
      </Document>
    </div>
  );
}

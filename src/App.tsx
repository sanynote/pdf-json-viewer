import { useEffect, useState } from "react";
import PdfViewer from "./components/pdf-viewer";
import JsonArea from "./components/json-area";
import type { TextBlock } from "./types/types";

export default function App() {
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/1.report.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.texts.filter(
          (b: TextBlock) => b.prov?.[0]?.page_no === 1
        );
        setBlocks(filtered);
      });
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r overflow-auto">
        <PdfViewer
          blocks={blocks}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          selectedIdx={selectedIdx}
        />
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">JSON 데이터 리스트</h2>
        <JsonArea
          blocks={blocks}
          hoveredId={hoveredId}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
      </div>
    </div>
  );
}

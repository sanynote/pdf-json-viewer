import { useState } from "react";
import PdfViewer from "./components/pdf-viewer";
import JsonArea from "./components/json-area";

export default function App() {
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r overflow-auto">
        <PdfViewer
          hoveredText={hoveredText}
          setHoveredText={setHoveredText}
          selectedIdx={selectedIdx}
        />
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">JSON 데이터 리스트</h2>
        <JsonArea
          hoveredText={hoveredText}
          setSelectedIdx={setSelectedIdx}
          selectedIdx={selectedIdx}
        />
      </div>
    </div>
  );
}

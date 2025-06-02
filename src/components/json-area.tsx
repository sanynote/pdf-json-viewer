import { useEffect, useRef, useState } from "react";

interface JsonBlock {
  text: string;
  prov: {
    page_no: number;
    bbox: {
      l: number;
      t: number;
      r: number;
      b: number;
    };
  }[];
}

interface Props {
  hoveredText: string | null;
  setSelectedIdx: (index: number) => void;
  selectedIdx: number | null;
}

export default function JsonArea({
  hoveredText,
  setSelectedIdx,
  selectedIdx,
}: Props) {
  const [blocks, setBlocks] = useState<JsonBlock[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("/1.report.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.texts)) {
          setBlocks(data.texts);
        } else {
          console.error("data.texts가 배열이 아님:", data.texts);
        }
      })
      .catch((err) => console.error("JSON 로딩 실패:", err));
  }, []);

  useEffect(() => {
    if (!hoveredText) return;

    const match = blocks.find((b) => b.text.trim() === hoveredText.trim());

    if (!match) return;

    const idx = blocks.findIndex((b) => b.text.trim() === hoveredText.trim());

    if (idx !== -1 && itemRefs.current[idx]) {
      itemRefs.current[idx]!.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [hoveredText, blocks]);

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => {
        const isActive =
          hoveredText?.trim() === block.text.trim() || selectedIdx === idx;
        return (
          <div
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => {
              setSelectedIdx(idx); // 클릭된 인덱스 넘기기
            }}
            className={`border rounded p-2 text-sm cursor-pointer transition-colors ${
              isActive
                ? "bg-yellow-300 font-bold"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {block.text}
          </div>
        );
      })}
    </div>
  );
}

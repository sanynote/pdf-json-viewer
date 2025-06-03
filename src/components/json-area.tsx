import { useEffect, useRef } from "react";
import type { TextBlock } from "../types/types";

interface Props {
  blocks: TextBlock[];
  hoveredId: string | null;
  selectedIdx: number | null;
  setSelectedIdx: (index: number) => void;
}

export default function JsonArea({
  blocks,
  hoveredId,
  selectedIdx,
  setSelectedIdx,
}: Props) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const idx = blocks.findIndex((b) => b.self_ref === hoveredId);
    if (idx !== -1 && itemRefs.current[idx]) {
      itemRefs.current[idx]!.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [hoveredId, blocks]);

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => {
        const isActive = hoveredId === block.self_ref || selectedIdx === idx;

        return (
          <div
            key={block.self_ref}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => setSelectedIdx(idx)}
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

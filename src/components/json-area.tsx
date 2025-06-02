import { useEffect, useState } from "react";

interface JsonBlock {
  text: string;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  page: number;
}

export default function JsonArea() {
  const [blocks, setBlocks] = useState<JsonBlock[]>([]);

  useEffect(() => {
    fetch("/1.report.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.texts)) {
          setBlocks(data.texts);
        } else {
          console.error("data.texts가 배열이 아닙니다:", data.texts);
        }
      })
      .catch((err) => console.error("JSON 로딩 실패:", err));
  }, []);

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => (
        <div
          key={idx}
          className="border rounded p-2 bg-gray-50 hover:bg-yellow-100 cursor-pointer text-sm"
        >
          {block.text}
        </div>
      ))}
    </div>
  );
}

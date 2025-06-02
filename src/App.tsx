// src/App.tsx
import JsonArea from "./components/json-area";
import PdfViewer from "./components/pdf-viewer";

function App() {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 PDF 영역 */}
      <div className="w-1/2 border-r overflow-auto">
        <PdfViewer />
      </div>

      {/* 오른쪽 JSON 영역 */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">JSON 데이터 리스트</h2>
        <JsonArea />
      </div>
    </div>
  );
}

export default App;

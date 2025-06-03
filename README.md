# PDF-JSON 양방향 인터랙션 과제

이 프로젝트는 PDF 문서와 해당 문서를 파싱한 JSON 데이터를 **양방향으로 연결**하여,  
**PDF ↔ JSON 하이라이트 및 스크롤 연동**을 구현한 React 웹 애플리케이션입니다.

## 📌 과제 목적

- PDF의 특정 텍스트 영역에 마우스를 올리면 → JSON 항목 하이라이트 및 스크롤
- JSON 항목을 클릭하면 → PDF의 해당 위치로 이동 및 시각적 강조
- 마우스 오버/클릭 시 **자연스러운 인터랙션** 제공

## 🎯 주요 기능

| 기능             | 설명                                                             |
| ---------------- | ---------------------------------------------------------------- |
| PDF → JSON 연동  | PDF 텍스트 영역에 마우스를 올리면 오른쪽 JSON 자동 스크롤 + 강조 |
| JSON → PDF 연동  | JSON 항목 클릭 시 PDF 해당 위치 강조 및 가운데 스크롤            |
| 하이라이트 처리  | 테두리 + 반투명 배경 강조 UI 구현                                |
| 중복 텍스트 대응 | 텍스트가 중복되어도 정확한 항목만 매칭 (`self_ref` 기반)         |

## 🧱 기술 스택

- React + TypeScript
- Tailwind CSS
- [react-pdf](https://github.com/wojtekmaj/react-pdf)

## 🗂️ 폴더 구조

```bash

src/
├── components/
│ ├── pdf-viewer.tsx
│ └── json-area.tsx
├── types/
│ └── types.ts
├── worker/
│ └── pdf-worker.ts
└── App.tsx

```

## 📌 핵심 구현 방식

### 식별자 기반 매칭

- JSON과 PDF 블록 간의 연동은 `self_ref`라는 고유 ID를 기준으로 수행
- 중복 텍스트로 인한 다중 강조 문제를 방지

### 스타일 조건부 처리

- PDF에 마우스 오버 가능한 영역을 **항상 렌더링**하여 이벤트 감지 가능
- `border + background` 스타일은 조건부 적용으로 처리

## 💡 개선 방향

다중 페이지 PDF 지원

검색 기능 추가

확대/축소 기능

## ✅ 실행 방법

```bash
npm install
npm run dev

```

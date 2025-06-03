export interface TextBlock {
  self_ref: string;
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

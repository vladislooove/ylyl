export interface Content {
  _id: string;
  type: 'text' | 'image' | 'youtube';
  title?: string;
  text?: string;
  source?: string;
}

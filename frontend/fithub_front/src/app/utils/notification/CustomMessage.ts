export class CustomMessage {
  content: string | null;
  type: string | null;
  constructor(content: string | null, type: string | null) {
    this.content = content;
    this.type = type;
  }
}

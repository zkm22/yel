import { Entity, keyPath, index } from "./Entity";

export class PengGen extends Entity {
  @keyPath()
  sentence: string;
  @index()
  keyWord: string;
}

import { Entity, keyPath, index } from "./Entity";

export class KeyWord extends Entity {
  @keyPath()
  word: string;
  @index()
  level: number;
  @index()
  category: string;
}

export const keyWordSeeds: KeyWord[] = [
  {word: '参数', level: 1, category: '缺省'},
  {word: '回调', level: 1, category: '缺省'},
  {word: '递归', level: 1, category: '缺省'},
  {word: '查询', level: 1, category: '缺省'},
  {word: '处理', level: 1, category: '缺省'},
  {word: '调用', level: 1, category: '缺省'},
  {word: '概率', level: 1, category: '缺省'},
  {word: '依赖', level: 1, category: '缺省'},
  {word: '延迟', level: 1, category: '缺省'},
  {word: '判断', level: 1, category: '缺省'},
  {word: '条件', level: 1, category: '缺省'},
  {word: '第三方库', level: 1, category: '缺省'},
  {word: '循环', level: 1, category: '缺省'},
  {word: '方法', level: 1, category: '缺省'},
  {word: '函数', level: 1, category: '缺省'},
  {word: '格式', level: 1, category: '缺省'},
  {word: '精度', level: 1, category: '缺省'},
  {word: '类型', level: 1, category: '缺省'},
  {word: '返回', level: 1, category: '缺省'},
];

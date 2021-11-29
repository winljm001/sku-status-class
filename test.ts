import Sku, { filterSpec } from "./index";
const skuListData = [
  { specIds: ["100", "010"], stock: 12, price: 1, img: "1" },
  { specIds: ["100", "020"], stock: 12, price: 1, img: "1" },
  { specIds: ["200", "020"], stock: 12, price: 1, img: "1" },
];

const specListData = [
  {
    name: "等级",
    items: [
      { name: "一级", id: "100" },
      { name: "二级", id: "200" },
    ],
  },
  {
    name: "品牌",
    items: [
      { name: "农夫山泉", id: "010" },
      { name: "潘苹果", id: "020" },
      { name: "品牌3", id: "030" },
    ],
  },
  {
    name: "等级2",
    items: [
      { name: "A", id: "310" },
      { name: "B", id: "320" },
    ],
  },
];
// 过滤空的规格
const filterRes=filterSpec(skuListData,specListData,true)
console.log(JSON.stringify(filterRes));

const selected = ["100", "010"];
const a = new Sku(skuListData, specListData);
// 获取规格状态
console.log(JSON.stringify(a.getSpecListStatus(selected)));

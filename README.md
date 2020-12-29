# sku-status-class

sku 选择类

## 发布

```sh
# 打包发布
npm run release
```

## 安装

```sh
yarn add sku-status-class
```

## 参照数据结构

```js
// 参照数据结构
const skuListData = [
  { specIds: ["100", "010", "001"], stock: 12, price: 1, img: "1" },
  { specIds: ["100", "020", "001"], stock: 0, price: 13, img: "2" },
  { specIds: ["200", "010", "001"], stock: 12, price: 113, img: "3" },
  { specIds: ["200", "020", "002"], stock: 12, price: 23, img: "4" },
  { specIds: ["100", "020", "002"], stock: 0, price: 14, img: "5" },
  { specIds: ["200", "010", "002"], stock: 12, price: 53, img: "6" },
];

const specListData = [
  {
    name: "大小",
    items: [
      { name: "大", id: "100" },
      { name: "小", id: "200" },
    ],
  },
  {
    name: "颜色",
    items: [
      { name: "白", id: "010" },
      { name: "黑", id: "020" },
    ],
  },
  {
    name: "品质",
    items: [
      { name: "高", id: "001" },
      { name: "中", id: "002" },
      { name: "低", id: "003" },
    ],
  },
];

const selected = ["200", "010", "003"];
```

## 使用方法

```js
import Sku from "sku-status-class";

const a = new Sku(skuListData, specListData);
// 获取规格状态
console.log(a.getSpecListStatus(selected));
// 获取选中的规格
const a = new Sku(skuListData, specListData);
console.log(a.getSkuGoods(selected));
```

## 注意

- release 需要 githubtoken 环境变量,window 可在在根目录添加.env 文件内添加 token

```
GITHUB_TOKEN="你的token"
```

## commit 提交格式（注意冒号后面有空格）

常用的 type 类别

- build
- ci
- chore：构建过程或辅助工具的变动
- docs：文档（documentation）
- feat：新功能（feature）
- fix：修补 bug
- perf：性能优化
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- revert：复原
- style： 格式（不影响代码运行的变动）
- test：增加测试

## License

MIT

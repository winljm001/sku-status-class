export interface SKUInstance {
  /**
   * sku属性，具有规格id组合的数组
   */
  specIds: string[];
  [key: string]: any;
}
export interface SpecInstance {
  /**
   * 规格具有规格选项数组包含name和id
   */
  items: {
    /**规格选项name */
    name: string;
    /**规格选项id */
    id: string;
    /**规格选项状态，返回的时候有不需要传 */
    specStatus?: number;
    [key: string]: any;
  }[];
  [key: string]: any;
}
/**
 * 过滤空规格
 * @param skuList sku可选项
 * @param specList 规格列表
 * @returns 
 */
export const  filterSpec=(skuList: SKUInstance[], specList: SpecInstance[])=>{
  let allSpecIds:string[]=[]
  for (let i = 0; i < skuList.length; i++) {
    const tempSpecIds = skuList[i].specIds;
    allSpecIds=allSpecIds.concat(tempSpecIds.filter(v => !allSpecIds.includes(v)))
  }
  return specList?.filter(v=>{
    return v?.items?.map(item=>item?.id)?.filter(oItem => allSpecIds.includes(oItem))?.length>0
  })
}
/**
 * Sku 选择类
 * this.specMap:选项与sku对应的map
 * this.specList：规格列表
 * this.getSpecListStatus:传选中的规格id,返回带状态的规格列表
 * this.getSkuGoods:传选中的规格id,返回选中的商品规格值
 */
export default class Sku {
  specMap: any;
  skuList: SKUInstance[];
  specList: SpecInstance[];
  constructor(skuList: SKUInstance[], specList: SpecInstance[]) {
    this.specMap = this.getSpecMap(skuList);
    this.skuList = skuList;
    this.specList = specList;
  }
  getSkuGoods(selected: string[]) {
    const resSku = this.skuList.find((v) => {
      return v.specIds.sort().join() === selected.sort().join();
    });
    return resSku ? resSku : null;
  }
  getSpecMap(skuList: SKUInstance[]) {
    const resMap: any = {};
    skuList.forEach((v) => {
      const allKey = arrayCombine(v.specIds);
      allKey.forEach((item) => {
        const resKey = item.sort().join();
        if (resMap[resKey]) {
          resMap[resKey].push(v);
        } else {
          resMap[resKey] = [v];
        }
      });
    });
    return resMap;
  }
  getSpecListStatus(selected: string[]): SpecInstance[] {
    
    return this.specList.map((v) => {
      const temp = JSON.parse(JSON.stringify(selected));
      selected.forEach((selectedItem) => {
        const itemIndex = v.items.find((specItem) => {
          return specItem.id === selectedItem;
        });
        if (itemIndex) {
          const index = temp.indexOf(itemIndex?.id);
          temp.splice(index, 1);
        }
      });
      const selectedKeys = temp.sort().join();
      let selectableSpecIds: string[] = [];
      this.specMap[selectedKeys]?.forEach((v: any) => {
        selectableSpecIds = selectableSpecIds.concat(
          v.specIds.filter((v: any) => !selectableSpecIds.includes(v))
        );
      });
      return {
        ...v,
        items: v.items.map((item) => {
          let specStatus = 0;
          if (selectableSpecIds.indexOf(item.id) === -1) {
            specStatus = 0;
          } else {
            if (selected.indexOf(item.id) === -1) {
              specStatus = 1;
            } else {
              specStatus = 2;
            }
          }

          return {
            ...item,
            // 不可选：0 可选：1 已选中：2
            specStatus,
          };
        }),
      };
    });
  }
}

function arrayCombine(targetArr: any) {
  var resultArr = [];
  for (var n = 0; n <= targetArr.length; n++) {
    var flagArrs = getFlagArrs(targetArr.length, n);
    while (flagArrs.length) {
      var flagArr = flagArrs.shift() || [];
      //   var combArr = Array(targetArr.length);
      var combArr = [];
      for (var i = 0; i < targetArr.length; i++) {
        if (flagArr[i]) {
          combArr.push(targetArr[i]);
        }
      }
      resultArr.push(combArr);
    }
  }
  return resultArr;
}
// 从m中取n的所有组合
function getFlagArrs(m: any, n: any) {
  var flagArrs = [],
    flagArr = [],
    isEnd = false;
  for (var i = 0; i < m; i++) {
    flagArr[i] = i < n ? 1 : 0;
  }
  flagArrs.push(flagArr.concat());
  // 当n不等于0并且m大于n的时候进入
  if (n && m > n) {
    while (!isEnd) {
      var leftCnt = 0;
      for (var i = 0; i < m - 1; i++) {
        if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
          for (var j = 0; j < i; j++) {
            flagArr[j] = j < leftCnt ? 1 : 0;
          }
          flagArr[i] = 0;
          flagArr[i + 1] = 1;
          var aTmp = flagArr.concat();
          flagArrs.push(aTmp);
          if (aTmp.slice(-n).join("").indexOf("0") == -1) {
            isEnd = true;
          }
          break;
        }
        flagArr[i] == 1 && leftCnt++;
      }
    }
  }
  return flagArrs;
}

/**
 * Sku 选择类
 * this.specMap:选项与sku对应的map
 * this.specList：规格列表
 * this.getSpecListStatus:传选中的规格id,返回带状态的规格列表
 * this.getSkuGoods:传选中的规格id,返回选中的商品规格值
 */
export default class Sku {
    specMap: any;
    skuList: any;
    specList: any;
    constructor(skuList: any, specList: any);
    getSkuGoods(selected: string[]): any;
    getSpecMap(skuList: any): any;
    getSpecListStatus(selected: string[]): any;
}

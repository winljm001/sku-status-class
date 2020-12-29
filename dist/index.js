"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sku 选择类
 * this.specMap:选项与sku对应的map
 * this.specList：规格列表
 * this.getSpecListStatus:传选中的规格id,返回带状态的规格列表
 * this.getSkuGoods:传选中的规格id,返回选中的商品规格值
 */
var Sku = /** @class */ (function () {
    function Sku(skuList, specList) {
        this.specMap = this.getSpecMap(skuList);
        this.skuList = skuList;
        this.specList = specList;
    }
    Sku.prototype.getSkuGoods = function (selected) {
        if (selected.length === this.specList.length) {
            var resSku = this.skuList.find(function (v) {
                return v.specIds.sort().join() === selected.sort().join();
            });
            return resSku ? resSku : null;
        }
        else {
            return null;
        }
    };
    Sku.prototype.getSpecMap = function (skuList) {
        var resMap = {};
        skuList.forEach(function (v) {
            // console.log(v);
            var allKey = arrayCombine(v.specIds);
            allKey.forEach(function (item) {
                var resKey = item.sort().join();
                if (resMap[resKey]) {
                    resMap[resKey].push(v);
                }
                else {
                    resMap[resKey] = [v];
                }
            });
        });
        return resMap;
    };
    Sku.prototype.getSpecListStatus = function (selected) {
        var selectedKeys = selected.sort().join();
        var selectableSpecIds = [];
        this.specMap[selectedKeys].forEach(function (v) {
            selectableSpecIds = selectableSpecIds.concat(v.specIds.filter(function (v) { return !selectableSpecIds.includes(v); }));
        });
        return this.specList.map(function (v) {
            return __assign(__assign({}, v), { items: v.items.map(function (item) {
                    return __assign(__assign({}, item), { status: selectableSpecIds.indexOf(item.id) === -1 ? 0 : 1 });
                }) });
        });
    };
    return Sku;
}());
exports.default = Sku;
function arrayCombine(targetArr) {
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
function getFlagArrs(m, n) {
    var flagArrs = [], flagArr = [], isEnd = false;
    for (var i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }
    flagArrs.push(flagArr.concat());
    // 当n不等于0并且m大于n的时候进入
    if (n && m > n) {
        while (!isEnd) {
            var leftCnt = 0;
            for (var i = 0; i < m - 1; i++) {
                if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
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

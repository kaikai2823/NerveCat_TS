/**
 * 工具类
 */
var Func = /** @class */ (function () {
    function Func() {
    }
    /**
     * 根据编号来获取数据结构相对位置
     */
    Func.getPointByIndex = function (index) {
        var point = new Laya.Point();
        point.y = index % 9; // 列
        point.x = Math.floor(index / 9); //行
        return point;
    };
    /**
     * 根据编号来获取XY轴坐标位置
     */
    Func.getPointXYByIndex = function (index) {
        var point = new Laya.Point();
        var space = 0;
        if (Math.floor(index / 9) % 2 == 1) {
            space = 30;
        }
        // 左上角为基点，位置为（65,500）
        point.x = 65 + (index % 9) * 60 + space;
        point.y = 500 + Math.floor(index / 9) * 53;
        return point;
    };
    /**
     * 根据数据结构相对位置获取编号
     */
    Func.getIndexByPoint = function (p) {
        var index = 9 * p.x + p.y;
        return index;
    };
    /**
     * 判断是否为出口点
     * @param _index 待判断节点的编号
     */
    Func.isExit = function (_index) {
        var p = Func.getPointByIndex(_index);
        if (p.y == 0 || p.y == 8 || p.x == 0 || p.x == 8) {
            return true;
        }
        return false;
    };
    return Func;
}());
//# sourceMappingURL=Func.js.map
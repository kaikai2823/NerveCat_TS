/**
 * 神经猫数据结点
 */
var CatNode = /** @class */ (function () {
    function CatNode(_isEnable) {
        // 记录上一个结点编号
        this.preIndex = -1;
        this.isEnable = _isEnable;
    }
    CatNode.prototype.getStatus = function () {
        return this.isEnable;
    };
    return CatNode;
}());
//# sourceMappingURL=CatNode.js.map
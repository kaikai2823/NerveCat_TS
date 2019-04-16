var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @extends Laya.EventDispatcher
 * @listens
 * @desc 管理所有的数据，单例设计模式
 */
var DataManage = /** @class */ (function (_super) {
    __extends(DataManage, _super);
    function DataManage() {
        var _this = _super.call(this) || this;
        // 游戏是否成功
        _this.isSuccess = false;
        // 存储所有格子的状态，可被外部访问与更改
        _this.gridStatus = [];
        if (!DataManage.isDataManageInit) {
            throw (new Error("error!"));
        }
        // 游戏开始初始化所有数据
        _this.initGridData();
        return _this;
        // 数据更新
        // ViewManage.viewManageInstance().event(GameEvent.UPDATE_DATA);
    }
    /**
     * 创建生命周期中唯一一个 数据管理类
     * 只允许创建一次
     */
    DataManage.dataManageInstance = function () {
        //判断是否被创建
        if (!DataManage.$dataManage) {
            DataManage.isDataManageInit = true;
            DataManage.$dataManage = new DataManage();
            DataManage.isDataManageInit = false;
        }
        return DataManage.$dataManage;
    };
    DataManage.prototype.getCatDefaultIndex = function () {
        return this.catDefaultIndex;
    };
    /**
     * 初始化所有数据
     */
    DataManage.prototype.initGridData = function () {
        this.catDefaultIndex = 40;
        this.curAction = true;
        this.createData();
        //随机抽取需要关闭的格子
        var closeNum = Math.floor(Math.random() * 20) + 20;
        for (var i = 0; i < closeNum; i++) {
            var ranIndex = Math.floor(Math.random() * 80);
            while (this.gridStatus[ranIndex++]) {
                this.gridStatus[ranIndex] = false;
                break;
            }
        }
        this.gridStatus[this.catDefaultIndex] = true;
        // 开始事件监听
        this.on(GameEvent.CLOSE_GRID, this, this.dataUpdate);
    };
    /**
     * 创建所有数据
     */
    DataManage.prototype.createData = function () {
        // 清空数组
        this.gridStatus = [];
        var len = Consts.MAPGRIDNUM;
        for (var i = 0; i < len; i++) {
            // 初始化为可点击状态
            this.gridStatus.push(true);
        }
    };
    /**
     * 数据更新，根据点击事件响应
     */
    DataManage.prototype.dataUpdate = function (_onClickIndex) {
        this.gridStatus[_onClickIndex] = false;
        // 视图刷新，神经猫移动，更换皮肤响应在grid类中
        // 根据AI算法计算出下一步路径吗，然后更新神经猫位置
        // 局部类，接收外部 DataManage 的数据
        var catPathCalc = new CatAI();
        // 计算下一步该走的路
        var catNextIndex = catPathCalc.catNextPoint(this.catDefaultIndex);
        if (catNextIndex >= 0 && catNextIndex != null) {
            this.catDefaultIndex = catNextIndex;
        }
        else if (catNextIndex < 0 && catNextIndex != null) {
            // 游戏成功
            this.isSuccess = true;
        }
        else {
            // 随机走路
            console.log("你被围住啦！");
            this.curAction = false;
            this.catDefaultIndex = catPathCalc.catRandomMove(this.catDefaultIndex);
            // 切换action
        }
        ViewManage.viewManageInstance().event(GameEvent.UPDATE_DATA);
    };
    // 标记页面管理器是否被创建
    DataManage.isDataManageInit = false;
    return DataManage;
}(Laya.EventDispatcher));
//# sourceMappingURL=DataManage.js.map
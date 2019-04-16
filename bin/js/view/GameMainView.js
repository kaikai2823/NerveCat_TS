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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var GameMainView = /** @class */ (function (_super) {
        __extends(GameMainView, _super);
        function GameMainView() {
            var _this = _super.call(this) || this;
            // map是否创建
            _this.isMapCreate = false;
            // 定义map数组
            _this.mapGrids = [];
            _this.showMap();
            _this.createNerveCat();
            return _this;
        }
        /**
         * 创建神经猫角色
         */
        GameMainView.prototype.createNerveCat = function () {
            this.nerveCat = new component.NerveCat();
            this.addChild(this.nerveCat);
            // 设置神经猫的位置，测试代码！！！
            var nerveCatPoint = new Laya.Point();
            this.catOldIndex = DataManage.dataManageInstance().getCatDefaultIndex();
            nerveCatPoint = Func.getPointXYByIndex(this.catOldIndex);
            this.nerveCat.x = nerveCatPoint.x;
            this.nerveCat.y = nerveCatPoint.y;
        };
        /**
         * 创建地图
         */
        GameMainView.prototype.createMap = function () {
            var len = Consts.MAPGRIDNUM;
            for (var i = 0; i < len; i++) {
                var grid = new component.Grid(i, DataManage.dataManageInstance().gridStatus[i]);
                this.mapGrids.push(grid);
                // 监听自定义事件？
            }
        };
        /**
         * 显示所有地图
         */
        GameMainView.prototype.showMap = function () {
            if (!this.isMapCreate) {
                this.isMapCreate = true;
                this.createMap();
            }
            var len = Consts.MAPGRIDNUM;
            for (var i = 0; i < len; i++) {
                // 根据编号获取 xy 坐标
                var gridPoint = Func.getPointXYByIndex(this.mapGrids[i].getIndex());
                // 设置地图格子坐标
                this.mapGrids[i].x = gridPoint.x;
                this.mapGrids[i].y = gridPoint.y;
                this.addChild(this.mapGrids[i]);
            }
        };
        // 移动神经猫，页面管理器调用，数据更新事件触发
        GameMainView.prototype.catMove = function () {
            // 设置缓动
            // 当前位置未使用但不可点击
            var nerveCatPoint = new Laya.Point();
            nerveCatPoint = Func.getPointXYByIndex(DataManage.dataManageInstance().getCatDefaultIndex());
            // 更新坐标
            this.catOldIndex = DataManage.dataManageInstance().getCatDefaultIndex();
            this.nerveCat.playAction(DataManage.dataManageInstance().curAction);
            this.nerveCat.x = nerveCatPoint.x;
            this.nerveCat.y = nerveCatPoint.y;
        };
        // 关闭指定位置监听，数据更新事件触发
        GameMainView.prototype.offClickGrid = function () {
            this.mapGrids[DataManage.dataManageInstance().getCatDefaultIndex()].offClick();
        };
        // 开启指定位置监听，数据更新事件触发
        GameMainView.prototype.onceClickGrid = function () {
            this.mapGrids[this.catOldIndex].onceClick();
        };
        return GameMainView;
    }(ui.GameMainViewUI));
    view.GameMainView = GameMainView;
})(view || (view = {}));
//# sourceMappingURL=GameMainView.js.map
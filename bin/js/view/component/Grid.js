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
* @description 地图方格类，用于实现每个小格子的交互逻辑
*/
var component;
(function (component) {
    var Grid = /** @class */ (function (_super) {
        __extends(Grid, _super);
        function Grid(_index, _isGridClick) {
            var _this = _super.call(this) || this;
            // 标记当前地图元素的序号，默认为零
            _this.index = -1;
            // 初始化编号
            _this.index = _index;
            // 根据传入参数初始化状态
            _this.isGridClick = _isGridClick;
            _this.initGrid();
            return _this;
        }
        Grid.prototype.getIndex = function () {
            return this.index;
        };
        /**
         * 初始化地图格子元素
         */
        Grid.prototype.initGrid = function () {
            // 设置地图元素对象的长宽高，以及重心
            this.width = 60;
            this.height = 60;
            this.pivot(30, 30); // 设置居中
            // 接收鼠标事件
            this.mouseEnabled = true;
            // 创建一个地图元素
            this.gridImg = new Laya.Image();
            // 初始化自动设置皮肤
            this.setSkin(this.isGridClick);
            this.addChild(this.gridImg);
            // 设置鼠标监听
            if (this.index != DataManage.dataManageInstance().getCatDefaultIndex()) {
                this.once(Laya.Event.CLICK, this, this.onClickGrid);
            }
        };
        /**
         * 根据状态设置皮肤
         */
        Grid.prototype.setSkin = function (_gridStatus) {
            if (_gridStatus) {
                this.gridImg.loadImage("img/grid_white.png", 0, 0, 60, 60);
            }
            else {
                this.gridImg.loadImage("img/grid_red.png", 0, 0, 60, 60);
            }
        };
        /**
         * 点击格子回调函数
         */
        Grid.prototype.onClickGrid = function () {
            if (this.isGridClick) {
                // 当前可以点击，点击后状态和皮肤改变
                this.isGridClick = false;
                this.setSkin(this.isGridClick);
                // 派发事件交互逻辑，生成自定义事件，并且发送参数
                DataManage.dataManageInstance().event(GameEvent.CLOSE_GRID, [this.index]);
            }
        };
        // 关闭监听
        Grid.prototype.offClick = function () {
            this.offAll(Laya.Event.CLICK);
        };
        // 开启监听
        Grid.prototype.onceClick = function () {
            this.once(Laya.Event.CLICK, this, this.onClickGrid);
        };
        return Grid;
    }(Laya.Sprite));
    component.Grid = Grid;
})(component || (component = {}));
//# sourceMappingURL=Grid.js.map
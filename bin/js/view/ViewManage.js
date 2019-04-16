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
 * @extends Laya.Sprite
 * @listens
 * @desc 管理所有的页面，单例设计模式
 */
var ViewManage = /** @class */ (function (_super) {
    __extends(ViewManage, _super);
    function ViewManage() {
        var _this = _super.call(this) || this;
        // 确保页面管理器不被外部创建
        if (!ViewManage.isViewManageInit) {
            throw (new Error("Create view error!"));
        }
        // 测试代码
        _this.createGameMainView();
        // 监听数据更新事件，响应函数为重新渲染！！！测试代码！！！
        // 到游戏结束不再监听，游戏开始继续监听
        _this.on(GameEvent.UPDATE_DATA, _this, _this.updateGameMainView);
        return _this;
    }
    /**
     * 创建生命周期中唯一一个 页面管理类,只允许创建一次
     * @return ViewManage
     */
    ViewManage.viewManageInstance = function () {
        // 判断是否被创建
        if (!ViewManage.$viewManage) {
            ViewManage.isViewManageInit = true;
            ViewManage.$viewManage = new ViewManage();
            ViewManage.isViewManageInit = false;
        }
        return ViewManage.$viewManage;
    };
    /**
     * 创建开始游戏页面
     */
    ViewManage.prototype.createGameStartView = function () {
        var _this = this;
        this.gameStartView = new view.GameStartView();
        this.addChild(this.gameStartView);
        // 创建的同时设置事件监听
        this.on(GameEvent.GAME_START, this, function () {
            _this.removeChild(_this.gameStartView);
            // 点击开始按钮跳转到主页面
            _this.createGameMainView();
        });
    };
    /**
     * 创建游戏主页面
     */
    ViewManage.prototype.createGameMainView = function () {
        // 数据初始化
        DataManage.dataManageInstance().initGridData();
        if (this.gameMainView) {
            this.gameMainView.removeSelf();
            this.gameMainView = new view.GameMainView();
        }
        else {
            this.gameMainView = new view.GameMainView();
        }
        this.addChild(this.gameMainView);
    };
    ViewManage.prototype.updateGameMainView = function () {
        if (DataManage.dataManageInstance().isSuccess) {
            console.log("游戏成功！执行下一步动作");
            this.createGameSuccess();
        }
        // 开监听
        this.gameMainView.onceClickGrid();
        // 关闭监听
        this.gameMainView.offClickGrid();
        // 没有结束移动神经猫
        this.gameMainView.catMove();
        // 判断游戏是否结束
        if (Func.isExit(DataManage.dataManageInstance().getCatDefaultIndex())) {
            console.log("游戏失败");
            this.createGameFail();
        }
    };
    /**
     * 初始化所有页面
     */
    ViewManage.prototype.viewInit = function () {
    };
    /**
     * 游戏成功弹窗
     */
    ViewManage.prototype.createGameSuccess = function () {
        var _this = this;
        this.gameSuccess = new view.GameSuccess();
        this.addChild(this.gameSuccess);
        this.gameSuccess.btn_next.on(Laya.Event.CLICK, this, function () {
            _this.removeChild(_this.gameSuccess);
            // 重新加载主页面，数据不更新
        });
    };
    /**
     * 游戏失败弹窗
     */
    ViewManage.prototype.createGameFail = function () {
        var _this = this;
        this.gameFail = new view.GameFail();
        this.addChild(this.gameFail);
        this.gameFail.btn_replay.on(Laya.Event.CLICK, this, function () {
            _this.removeChild(_this.gameFail);
            // 重新加载主页面，数据更新
        });
    };
    // 标记页面管理器是否被创建
    ViewManage.isViewManageInit = false;
    return ViewManage;
}(Laya.Sprite));
//# sourceMappingURL=ViewManage.js.map
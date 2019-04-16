/**
 * @version v1.1
 * @author zhangkai
 * @desc CreateDate:2019-04-15
 */
var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        // 设计游戏面板及其初始化
        Laya.init(640, 1136, WebGL);
        // 设置缩放居中和缩放模式
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#feeefe";
        // 加载资源并执行回调函数
        Laya.loader.load(Consts.RESOURCES, Laya.Handler.create(this, this.onLoaded));
    }
    /**
     * @desc 加载资源后的回调函数，游戏主函数
     */
    GameMain.prototype.onLoaded = function () {
        // 将唯一的页面管理器添加到舞台
        Laya.stage.addChild(ViewManage.viewManageInstance());
        // 性能统计面板的调用
        // Laya.Stat.show(0,0);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map
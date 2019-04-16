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
 * @desc 自定义事件类
 */
var GameEvent = /** @class */ (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent() {
        return _super.call(this) || this;
    }
    // 开始游戏事件，作用域 viewmanage
    GameEvent.GAME_START = "game_start";
    // 关闭格子事件，作用域 datamanage，可携带参数格子编号
    GameEvent.CLOSE_GRID = "close_grid";
    // 数据更新事件，需与数据保持同步,作用域 viewmanage
    GameEvent.UPDATE_DATA = "update_data";
    return GameEvent;
}(Laya.EventDispatcher));
//# sourceMappingURL=GameEvent.js.map
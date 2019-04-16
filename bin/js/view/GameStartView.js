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
    var GameStartView = /** @class */ (function (_super) {
        __extends(GameStartView, _super);
        function GameStartView() {
            var _this = _super.call(this) || this;
            // 设置开始按钮监听
            _this.btn_start.on(Laya.Event.CLICK, _this, _this.onClickStart);
            return _this;
        }
        /**
         * 开始按钮回调函数
         */
        GameStartView.prototype.onClickStart = function () {
            ViewManage.viewManageInstance().event(GameEvent.GAME_START);
        };
        return GameStartView;
    }(ui.GameStartViewUI));
    view.GameStartView = GameStartView;
})(view || (view = {}));
//# sourceMappingURL=GameStartView.js.map
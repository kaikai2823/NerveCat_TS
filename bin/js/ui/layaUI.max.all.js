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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameFailUI = /** @class */ (function (_super) {
        __extends(GameFailUI, _super);
        function GameFailUI() {
            return _super.call(this) || this;
        }
        GameFailUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameFailUI.uiView);
        };
        GameFailUI.uiView = { "type": "Dialog", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Image", "props": { "y": 295, "x": 96, "skin": "img/end_tip_fail.png" } }, { "type": "Button", "props": { "y": 687, "x": 220, "var": "btn_replay", "stateNum": 1, "skin": "img/btn_replay.png" } }] };
        return GameFailUI;
    }(Dialog));
    ui.GameFailUI = GameFailUI;
})(ui || (ui = {}));
(function (ui) {
    var GameMainViewUI = /** @class */ (function (_super) {
        __extends(GameMainViewUI, _super);
        function GameMainViewUI() {
            return _super.call(this) || this;
        }
        GameMainViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameMainViewUI.uiView);
        };
        GameMainViewUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "img/bg.jpg" } }] };
        return GameMainViewUI;
    }(View));
    ui.GameMainViewUI = GameMainViewUI;
})(ui || (ui = {}));
(function (ui) {
    var GameStartViewUI = /** @class */ (function (_super) {
        __extends(GameStartViewUI, _super);
        function GameStartViewUI() {
            return _super.call(this) || this;
        }
        GameStartViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameStartViewUI.uiView);
        };
        GameStartViewUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Button", "props": { "y": 735, "x": 213, "var": "btn_start", "stateNum": 1, "skin": "img/btn_start.png" } }, { "type": "Image", "props": { "y": 196, "x": 120, "skin": "img/cat_start_bg.png" } }] };
        return GameStartViewUI;
    }(View));
    ui.GameStartViewUI = GameStartViewUI;
})(ui || (ui = {}));
(function (ui) {
    var GameSuccessUI = /** @class */ (function (_super) {
        __extends(GameSuccessUI, _super);
        function GameSuccessUI() {
            return _super.call(this) || this;
        }
        GameSuccessUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameSuccessUI.uiView);
        };
        GameSuccessUI.uiView = { "type": "Dialog", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Image", "props": { "y": 279, "x": 96, "skin": "img/end_tip_success.png" } }, { "type": "Button", "props": { "y": 774, "x": 220, "var": "btn_next", "stateNum": 1, "skin": "img/btn_next.png" } }] };
        return GameSuccessUI;
    }(Dialog));
    ui.GameSuccessUI = GameSuccessUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
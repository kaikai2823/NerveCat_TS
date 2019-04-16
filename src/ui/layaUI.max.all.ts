
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameFailUI extends Dialog {
		public btn_replay:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":295,"x":96,"skin":"img/end_tip_fail.png"}},{"type":"Button","props":{"y":687,"x":220,"var":"btn_replay","stateNum":1,"skin":"img/btn_replay.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameFailUI.uiView);

        }

    }
}

module ui {
    export class GameMainViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"img/bg.jpg"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameMainViewUI.uiView);

        }

    }
}

module ui {
    export class GameStartViewUI extends View {
		public btn_start:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Button","props":{"y":735,"x":213,"var":"btn_start","stateNum":1,"skin":"img/btn_start.png"}},{"type":"Image","props":{"y":196,"x":120,"skin":"img/cat_start_bg.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameStartViewUI.uiView);

        }

    }
}

module ui {
    export class GameSuccessUI extends Dialog {
		public btn_next:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":279,"x":96,"skin":"img/end_tip_success.png"}},{"type":"Button","props":{"y":774,"x":220,"var":"btn_next","stateNum":1,"skin":"img/btn_next.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameSuccessUI.uiView);

        }

    }
}

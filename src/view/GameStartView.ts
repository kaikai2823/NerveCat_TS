/**Created by the LayaAirIDE*/
module view{
	export class GameStartView extends ui.GameStartViewUI{
		constructor(){
			super();
			// 设置开始按钮监听
			this.btn_start.on(Laya.Event.CLICK,this,this.onClickStart)
		}
		/**
		 * 开始按钮回调函数
		 */
		onClickStart():void{
			ViewManage.viewManageInstance().event(GameEvent.GAME_START);
		}
	}
}
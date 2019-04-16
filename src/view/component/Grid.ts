/**
* @description 地图方格类，用于实现每个小格子的交互逻辑
*/
module component{
	export class Grid extends Laya.Sprite{
		// 标记当前地图元素的序号，默认为零
		private index:number = -1;
		
		public getIndex():number{
			return this.index;
		}
		// 记录元素当前的状态
    	private isGridClick:boolean;  // true为可以点击状态，false为不可点击状态
		// 地图元素的纹理
    	private gridImg:Laya.Image;

		constructor(_index:number,_isGridClick:boolean){
			super();
			// 初始化编号
			this.index = _index;
			// 根据传入参数初始化状态
			this.isGridClick = _isGridClick;
			this.initGrid();
		}
		/**
		 * 初始化地图格子元素
		 */
		initGrid():void{
			// 设置地图元素对象的长宽高，以及重心
			this.width = 60;
			this.height = 60;
			this.pivot(30,30);  // 设置居中
			// 接收鼠标事件
			this.mouseEnabled = true;
			// 创建一个地图元素
			this.gridImg = new Laya.Image();
			// 初始化自动设置皮肤
			this.setSkin(this.isGridClick);
			this.addChild(this.gridImg);
			// 设置鼠标监听
			if(this.index != DataManage.dataManageInstance().getCatDefaultIndex()){
				this.once(Laya.Event.CLICK,this,this.onClickGrid);
			}
			
		}
		/**
		 * 根据状态设置皮肤
		 */
		public setSkin(_gridStatus:boolean):void{
			if(_gridStatus){
				this.gridImg.loadImage("img/grid_white.png",0,0,60,60);
			}else{
				this.gridImg.loadImage("img/grid_red.png",0,0,60,60);
			}
    	}
		/**
		 * 点击格子回调函数
		 */
		private onClickGrid():void{
			if(this.isGridClick){
				// 当前可以点击，点击后状态和皮肤改变
				this.isGridClick = false;
				this.setSkin(this.isGridClick);
				
				// 派发事件交互逻辑，生成自定义事件，并且发送参数
				DataManage.dataManageInstance().event(GameEvent.CLOSE_GRID,[this.index]);
        	}
		}
		// 关闭监听
		public offClick():void{
			this.offAll(Laya.Event.CLICK);
		}
		// 开启监听
		public onceClick():void{
			this.once(Laya.Event.CLICK,this,this.onClickGrid);
		}
	}
}
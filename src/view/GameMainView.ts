/**Created by the LayaAirIDE*/
module view{
	export class GameMainView extends ui.GameMainViewUI{
		// 神经猫对象
		private nerveCat:component.NerveCat;
		private catOldIndex:number;
		// map是否创建
		private isMapCreate:boolean = false;
		// 定义map数组
		private mapGrids:Array<component.Grid> = [];

		constructor(){
			super();
			this.showMap();
			this.createNerveCat();
		}
		/**
		 * 创建神经猫角色
		 */
		private createNerveCat():void{
			this.nerveCat = new component.NerveCat();
			this.addChild(this.nerveCat);
			// 设置神经猫的位置，测试代码！！！
			let nerveCatPoint:Laya.Point = new Laya.Point();
			this.catOldIndex = DataManage.dataManageInstance().getCatDefaultIndex();
			nerveCatPoint = Func.getPointXYByIndex(this.catOldIndex);

			this.nerveCat.x = nerveCatPoint.x;
			this.nerveCat.y = nerveCatPoint.y;
		}
		/**
		 * 创建地图
		 */
		private createMap():void{
			var len = Consts.MAPGRIDNUM;
			for(var i:number = 0;i<len;i++){
				let grid:component.Grid = new component.Grid(i,DataManage.dataManageInstance().gridStatus[i]);
				this.mapGrids.push(grid);
				// 监听自定义事件？
			}
		}
		/**
		 * 显示所有地图
		 */
		private showMap():void{
			if(!this.isMapCreate){
				this.isMapCreate = true;
				this.createMap();
			}
			var len:number = Consts.MAPGRIDNUM;
			for(var i:number = 0;i<len;i++){
				// 根据编号获取 xy 坐标
				var gridPoint:Laya.Point = Func.getPointXYByIndex(this.mapGrids[i].getIndex());
				// 设置地图格子坐标
				this.mapGrids[i].x = gridPoint.x;
				this.mapGrids[i].y = gridPoint.y;
				this.addChild(this.mapGrids[i]);
			}
		}
		// 移动神经猫，页面管理器调用，数据更新事件触发
		public catMove():void{
			// 设置缓动
			// 当前位置未使用但不可点击
			let nerveCatPoint:Laya.Point = new Laya.Point();
			nerveCatPoint = Func.getPointXYByIndex(DataManage.dataManageInstance().getCatDefaultIndex());
			
			// 更新坐标
			this.catOldIndex = DataManage.dataManageInstance().getCatDefaultIndex();
			this.nerveCat.playAction(DataManage.dataManageInstance().curAction);
			this.nerveCat.x = nerveCatPoint.x;
			this.nerveCat.y = nerveCatPoint.y;
		}
		// 关闭指定位置监听，数据更新事件触发
		public offClickGrid():void{
			this.mapGrids[DataManage.dataManageInstance().getCatDefaultIndex()].offClick();
		}
		// 开启指定位置监听，数据更新事件触发
		public onceClickGrid():void{
			this.mapGrids[this.catOldIndex].onceClick();
		}
	}
}
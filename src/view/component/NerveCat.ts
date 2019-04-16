/**
* 神经猫角色类
*/
module component{
	export class NerveCat extends Laya.Sprite{
		private nerveCat:Laya.Animation;
		// 标记是否被缓存
		private isCached:boolean = false;
		constructor(){
			super();
			this.createCat();
		}

		createCat():void{
			if(!this.isCached){
				//加载缓存
				this.cachCat();
			}
			//加载缓存
			this.cachCat();
			//新建一个 animation 动画
			if(!this.nerveCat){
				this.nerveCat = new Laya.Animation();
				this.addChild(this.nerveCat);
				//添加动画播放完成事件，给每一个新创建的nervecat增加一个监听事件
			}
			//播放神经猫动画
			this.playAction(DataManage.dataManageInstance().curAction);
		}
		// 播放动画资源
		public playAction(_action):void{
			// 动画播放控制，
			if(_action){
				this.nerveCat.play(0,true,"normalCat");
			}else{
				this.nerveCat.play(0,true,"loserCat")
			}
			

			// 设置动画居中靠下
			this.nerveCat.pivot(32,80);
		}

		// 制作神经猫动画
		cachCat():void{
			// 标记为已缓存
			this.isCached = true;
			// 加载缓存
			Laya.Animation.createFrames(["img/cat_normal0000.png",
										 "img/cat_normal0001.png",
										 "img/cat_normal0002.png",
										 "img/cat_normal0003.png",
										 "img/cat_normal0004.png",
										 "img/cat_normal0005.png",
										 "img/cat_normal0006.png",
										 "img/cat_normal0007.png",
										 "img/cat_normal0008.png",
										 "img/cat_normal0009.png",
										 "img/cat_normal0010.png",
										 "img/cat_normal0011.png",
										 "img/cat_normal0012.png",
										 "img/cat_normal0013.png",
										 "img/cat_normal0014.png",
										 "img/cat_normal0015.png"],"normalCat");
			Laya.Animation.createFrames(["img/cat_loser0000.png",
										 "img/cat_loser0001.png",
										 "img/cat_loser0002.png",
										 "img/cat_loser0003.png",
										 "img/cat_loser0004.png",
										 "img/cat_loser0005.png",
										 "img/cat_loser0006.png",
										 "img/cat_loser0007.png",
										 "img/cat_loser0008.png",
										 "img/cat_loser0009.png",
										 "img/cat_loser0010.png",
										 "img/cat_loser0011.png",
										 "img/cat_loser0012.png",
										 "img/cat_loser0013.png",
										 "img/cat_loser0014.png"],"loserCat");
		}
	}
}
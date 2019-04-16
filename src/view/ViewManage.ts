/**
 * @extends Laya.Sprite
 * @listens 
 * @desc 管理所有的页面，单例设计模式
 */
class ViewManage extends Laya.Sprite{
    // 标记页面管理器是否被创建
    private static isViewManageInit:boolean = false;
    // 允许在这个类中创建唯一的页面管理器
    private static $viewManage:ViewManage;
    /**
     * 创建生命周期中唯一一个 页面管理类,只允许创建一次
     * @return ViewManage
     */
    public static viewManageInstance():ViewManage{
        // 判断是否被创建
        if(!ViewManage.$viewManage){
            ViewManage.isViewManageInit = true;
            ViewManage.$viewManage = new ViewManage();
            ViewManage.isViewManageInit = false;
        }
        return ViewManage.$viewManage;
    }
    constructor(){
        super();
        // 确保页面管理器不被外部创建
        if(!ViewManage.isViewManageInit){
            throw(new Error("Create view error!"));
        }
  
        // 测试代码
        this.createGameMainView();
        // 监听数据更新事件，响应函数为重新渲染！！！测试代码！！！
        // 到游戏结束不再监听，游戏开始继续监听
        this.on(GameEvent.UPDATE_DATA,this,this.updateGameMainView);
    }

    // 游戏开始页面
    private gameStartView:view.GameStartView;
    // 游戏主页面
    private gameMainView:view.GameMainView;
    // 游戏成功页面
    private gameSuccess:view.GameSuccess;
    // 游戏失败页面
    private gameFail:view.GameFail;

    /**
     * 创建开始游戏页面
     */
    createGameStartView():void{
        this.gameStartView = new view.GameStartView();
        this.addChild(this.gameStartView);
        // 创建的同时设置事件监听
        this.on(GameEvent.GAME_START,this,()=>{
            this.removeChild(this.gameStartView);
            // 点击开始按钮跳转到主页面
            this.createGameMainView();
        });
    }
    /**
     * 创建游戏主页面
     */
     createGameMainView():void{
        // 数据初始化
        DataManage.dataManageInstance().initGridData();
        if(this.gameMainView){
            this.gameMainView.removeSelf();
            this.gameMainView = new view.GameMainView();
        }else{
            this.gameMainView = new view.GameMainView();
        }
        
        this.addChild(this.gameMainView);
     }

     updateGameMainView():void{
        if(DataManage.dataManageInstance().isSuccess){
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
        if(Func.isExit(DataManage.dataManageInstance().getCatDefaultIndex())){
            console.log("游戏失败");
            this.createGameFail();
        }
     }
    /**
     * 初始化所有页面
     */
    public viewInit():void{

    }
    /**
     * 游戏成功弹窗，可以设置一个背景虚化
     */
    createGameSuccess():void{
        this.gameSuccess = new view.GameSuccess();
        this.addChild(this.gameSuccess);

        this.gameSuccess.btn_next.on(Laya.Event.CLICK,this,()=>{
            this.removeChild(this.gameSuccess);
            // 重新加载主页面，数据不更新
        })
    }
    /**
     * 游戏失败弹窗，可以设置一个背景虚化
     */
    createGameFail():void{
        this.gameFail = new view.GameFail();
        this.addChild(this.gameFail);

        this.gameFail.btn_replay.on(Laya.Event.CLICK,this,()=>{
            this.removeChild(this.gameFail);
            // 重新加载主页面，数据更新
        })
    }
}
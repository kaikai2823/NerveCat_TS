/**
 * @extends Laya.EventDispatcher
 * @listens 
 * @desc 管理所有的数据，单例设计模式
 */
class DataManage extends Laya.EventDispatcher{
    // 标记页面管理器是否被创建
    private static isDataManageInit:boolean = false;
    // 允许在这个类中创建唯一的页面管理器
    private static $dataManage:DataManage;
    /**
     * 创建生命周期中唯一一个 数据管理类
     * 只允许创建一次
     */
    public static dataManageInstance():DataManage{
        //判断是否被创建
        if(!DataManage.$dataManage){
            DataManage.isDataManageInit = true;

            DataManage.$dataManage = new DataManage();
            DataManage.isDataManageInit = false;
        }
        return DataManage.$dataManage;
    }

    constructor(){
        super();
        if(!DataManage.isDataManageInit){
            throw(new Error("error!"));
        }
        
        // 游戏开始初始化所有数据
        this.initGridData();
        
        // 数据更新
        // ViewManage.viewManageInstance().event(GameEvent.UPDATE_DATA);
    }

    // 游戏是否成功
    public isSuccess:boolean = false;

    // 存储所有格子的状态，可被外部访问与更改
    public gridStatus:Array<boolean> = [];
    // 神经猫的默认位置 
    private catDefaultIndex:number;
    // 当前动画类型
    public curAction:boolean;

    public getCatDefaultIndex():number{
        return this.catDefaultIndex;
    }

    /**
     * 初始化所有数据
     */
    public initGridData():void{
        this.catDefaultIndex = 40;
        this.curAction = true;
        this.createData();
        //随机抽取需要关闭的格子
        var closeNum:number = Math.floor(Math.random()*20)+20;
        for(var i:number = 0;i<closeNum;i++){
            var ranIndex:number = Math.floor(Math.random()*80);
            while(this.gridStatus[ranIndex++]){
                this.gridStatus[ranIndex] = false;
                break;
            }
        }
        this.gridStatus[this.catDefaultIndex] = true;
        // 开始事件监听
        this.on(GameEvent.CLOSE_GRID,this,this.dataUpdate)
    }
    /**
     * 创建所有数据
     */
    private createData():void{
        // 清空数组
        this.gridStatus = [];
        var len:number = Consts.MAPGRIDNUM;
        for(var i:number = 0;i<len;i++){
            // 初始化为可点击状态
            this.gridStatus.push(true);
        }
    }
    /**
     * 数据更新，根据点击事件响应
     */
    private dataUpdate(_onClickIndex):void{
        this.gridStatus[_onClickIndex] = false;
        // 视图刷新，神经猫移动，更换皮肤响应在grid类中
        // 根据AI算法计算出下一步路径吗，然后更新神经猫位置
        
        // 局部类，接收外部 DataManage 的数据
        let catPathCalc:CatAI = new CatAI();
        // 计算下一步该走的路
        let catNextIndex = catPathCalc.catNextPoint(this.catDefaultIndex);
        
        if(catNextIndex >= 0 && catNextIndex != null){
            this.catDefaultIndex = catNextIndex;
            
        }else if(catNextIndex < 0 && catNextIndex != null){
            // 游戏成功
            this.isSuccess = true;
            
        }else{
            // 随机走路
            console.log("你被围住啦！");
            this.curAction = false;
            this.catDefaultIndex = catPathCalc.catRandomMove(this.catDefaultIndex);
            // 切换action

        }
        ViewManage.viewManageInstance().event(GameEvent.UPDATE_DATA);
    }
    
}
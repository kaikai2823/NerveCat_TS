/**
 * @desc 自定义事件类
 */
class GameEvent extends Laya.EventDispatcher{
    constructor(){
        super();
    }
    // 开始游戏事件，作用域 viewmanage
    public static GAME_START:string = "game_start";
    // 关闭格子事件，作用域 datamanage，可携带参数格子编号
    public static CLOSE_GRID:string = "close_grid";
    // 数据更新事件，需与数据保持同步,作用域 viewmanage
    public static UPDATE_DATA:string = "update_data";
}
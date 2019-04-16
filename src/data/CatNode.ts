/**
 * 神经猫数据结点
 */
class CatNode{
    // 记录上一个结点编号
    public preIndex:number = -1;
    // 当前结点是否被使用
    private isEnable:boolean;
    public getStatus():boolean{
        return this.isEnable;
    }
    constructor(_isEnable:boolean){
        this.isEnable = _isEnable;
    }
    /**
     * 还原所有默认数据
     */
    // public clean():void{
    //     this.isUsed = false;
    //     this.preIndex = -1;
    // }
}
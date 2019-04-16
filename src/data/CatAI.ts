/**
 * 寻路算法的实现
 */
class CatAI{
    // 将所有节点的状态封装在一个数组
    private mapStatus:Array<CatNode>;
    private initMapStatus():void{
        
        // 实例化地图状态数组
        this.mapStatus = [];
        for(var i:number = 0;i<Consts.MAPGRIDNUM;i++){
            // 保证数据一致性，采用参数传递
            this.mapStatus.push(new CatNode(DataManage.dataManageInstance().gridStatus[i]));
        }
    }

    constructor(){
        
    }



    /**
     * 随机走路算法，神经被围住时候执行
     */
    public catRandomMove(_catIndex:number):number{
        let round:Array<number> = this.findEnableStep(_catIndex);
        return round[0];
    }
    /**
     * 寻找可移动范围
     * @param _catIndex 当前中心点的位置
     * return 返回周围可走点，0-6个
     */
    private findEnableStep(_catIndex:number):Array<number>{
        let enPointArr:Array<number> = [];
        // 根据位置返回数据结构行列信息
        let curPoint:Laya.Point = Func.getPointByIndex(_catIndex);
        let row:number = curPoint.x;  // 记录行信息
        let column:number = curPoint.y;  // 记录列信息
        
        // 判断是够超出边界，以及当前的状态是否被使用过
        // 判断第一个点
        let leftColumn:number = column - 1;
        if(leftColumn>=0 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(row,leftColumn))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(row,leftColumn)));
        }
        // 判断第二个点
        let rightColum:number = column + 1;
        if(rightColum <= 8 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(row,rightColum))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(row,rightColum)));
        }
        // 判断第三个点
        let upRow:number = row - 1;
        if(upRow>=0 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(upRow,column))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(upRow,column)));
        }
        // 判断第四个点
        let downRow:number = row + 1;
        if(downRow <= 8 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(downRow,column))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(downRow,column)));
        }
        let rightOrLeft:number;
        // 根据行号判断右上还是左上
        if(row%2 == 0){
            rightOrLeft = leftColumn;
        }else{
            rightOrLeft = rightColum;
        }
        // 判断第五个点
        if(rightOrLeft>=0 && rightOrLeft <= 8 && upRow>=0 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(upRow,rightOrLeft))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(upRow,rightOrLeft)));
        }
        // 判断第六个点
        if(rightOrLeft>=0 && rightOrLeft <= 8 && downRow <= 8 && this.mapStatus[Func.getIndexByPoint(new Laya.Point(downRow,rightOrLeft))].getStatus() == true){
            // 将可走点压入数组
            enPointArr.push(Func.getIndexByPoint(new Laya.Point(downRow,rightOrLeft)));
        }
        // 数组排序
        enPointArr = enPointArr.sort();
        return enPointArr;
    }

    /**
     * 寻找到一条路径，非最短路径
     * 判断是否为通路的方法是能否到达边界点
     * @param _from 起始点编号
     * @return 返回通路的边界点
     */
    private findPath(_from):number{
        // 我们当前需要检测的中心点
        let currentNodeIndexs:Array<number> = [_from];
        // 可以移动但是已经检测过的点
        let usedNodeIndex:Array<number> = [];
        // 当前正在检测的中心点
        let currentNodeindex:number;
        // 当前中心点周围可以走的点
        let round:Array<number> = [];
        // 周围可走点的个数
        let lenRound:number;

        // 检测状态，控制循环
        let rel:boolean = true;

        while(rel){
            // 直到堆栈中元素全部出栈
            if(currentNodeIndexs.length == 0){
                // 神经猫被困住，没有找到出口
                rel = false;
                return null;
            }
            // 存放周围没有被使用过的点
            let newIndexs:Array<number> = [];
            // 控制循环把周围所有可走的中心点都检测一遍
            for(var t:number = 0;t<currentNodeIndexs.length;t++){
                // 出栈
                currentNodeindex = currentNodeIndexs.shift();
                // 下一个可走数组
                round = this.findEnableStep(currentNodeindex);
                
                lenRound = round.length;
                if(lenRound == 0)return -1;
                // 当前点周围可走的点
                for(var i:number = 0;i<lenRound;i++){
                    // 周围的点是否使用过，压入used数组，不需要再检测了
                    if(!this.mapStatus[round[i]].getStatus()){
                        usedNodeIndex.push(round[i]);
                        continue;
                    }
                    // 检测是否已经存在used数组中
                    if(usedNodeIndex.indexOf(round[i])>-1 || currentNodeIndexs.indexOf(round[i])>-1){
                        continue;
                    }
                    // 更改结点状态
                    this.mapStatus[round[i]].preIndex = currentNodeindex;
                    
                    if(Func.isExit(round[i])){
                        // 找到出口点，能走通
                        // 是否为最短路径？？？
                        return round[i];
                    }else{
                        // 压入到新的数组
                        newIndexs.push(round[i]);
                    }
                }
                usedNodeIndex.push(currentNodeindex);
            }
            // 更新当前需要检测的结点数组
            while(newIndexs.length){
                currentNodeIndexs.push(newIndexs.pop());
            }
        }

    }
    /**
     * 通路的下一个坐标
     * @param _pathEndIndex 
     * @return 下一个移动的坐标
     */
    public catNextPoint(_pathFromIndex):number{
        // 初始化地图
        this.initMapStatus();
        
        // 寻找可走路径
        let nextIndex:number = this.findPath(_pathFromIndex);
        
        // 下一个位置为空值，被围住还有地方可走
        if(nextIndex == null){
            return null;
        }
        // 没有可以走的路了
        if(nextIndex == -1){
            return -1;
        }

        let rel:boolean = true;
        let preIndex:number;
        // 回溯，寻找到路径的起始点，神经猫所在位置的下一个位置
        while(rel){
            // 根据结点的 pre 值回溯，找到神经猫下一步需要移动的位置
            preIndex = this.mapStatus[nextIndex].preIndex;
            if(preIndex != _pathFromIndex && preIndex != -1){
                nextIndex = preIndex;
            }else{
                rel = false;
            }
        }
        return nextIndex;
    }
    // 根据最短路径修改神经猫相关参数，数据管理类实现
    // 刷新视图，视图管理类实现
    
}
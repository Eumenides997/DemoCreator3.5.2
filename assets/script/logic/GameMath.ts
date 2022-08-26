import CCNode from '../core/base/CCNode';
import QDictionary from '../core/base/QDictionary';

export default class GameMath {
    public static circularAngle: number = 360;

    /**
     * 多个方块是否都有连接起来
     * @param boxArr
     * @returns
     */
    public static getIsConnectBoxArr(boxArr: Array<CCNode>): boolean {
        let isConnect: boolean = true;
        if (boxArr.length == 1) {
            return isConnect;
        }
        let xArr: QDictionary<Array<CCNode>> = new QDictionary<Array<CCNode>>();
        let yArr: QDictionary<Array<CCNode>> = new QDictionary<Array<CCNode>>();
        boxArr.forEach(p => {
            if (xArr.contentsKey(p.x)) {
                xArr.get(p.x).push(p);
            } else {
                xArr.set(p.x, [p]);
            }
            if (yArr.contentsKey(p.y)) {
                yArr.get(p.y).push(p);
            } else {
                yArr.set(p.y, [p]);
            }
        });
        let width: number = boxArr[0].width;
        for (let i = 0; i < boxArr.length; i++) {
            let box: CCNode = boxArr[i];
            let nodeYArr: Array<CCNode> = xArr.get(box.x);
            let nodeXArr: Array<CCNode> = yArr.get(box.y);
            if (nodeXArr.length < 2 && nodeYArr.length < 2) {
                isConnect = false;
                break;
            } else {
                isConnect = false;
                for (let i = 0; i < nodeYArr.length; i++) {
                    let node: CCNode = nodeYArr[i];
                    if (Math.abs(box.y - node.y) <= width && (box.x != node.x || box.y != node.y)) {
                        isConnect = true;
                        break;
                    }
                }
                if (!isConnect) {
                    for (let i = 0; i < nodeXArr.length; i++) {
                        let node: CCNode = nodeXArr[i];
                        if (Math.abs(box.x - node.x) <= width && (box.x != node.x || box.y != node.y)) {
                            isConnect = true;
                            break;
                        }
                    }
                }
            }
        }
        return isConnect;
    }

    public static getNoRepeatArr(arr: Array<any>): Array<any> {
        return [...new Set(arr)];
    }
}

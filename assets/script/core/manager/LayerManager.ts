import { Node } from 'cc';
import App from '../App';
import Singleton from '../base/Singleton';

export default class LayerManager extends Singleton {
    private _layerArr: Array<Node> = [];
    public get layerArr(): Array<Node> {
        return this._layerArr;
    }

    private maxLayer: number = Layer.max;

    public init() {
        App.stageManager.viewNode.node.removeAllChildren();
        for (let i = 0; i <= this.maxLayer; i++) {
            let layer = new Node();
            this._layerArr.push(layer);
            App.stageManager.viewNode.node.addChild(layer);
        }
    }
}

export enum Layer {
    stage = 0,
    cocosUI = 1,
    fairyUI = 2,
    ctrl = 3,
    tip = 4,
    max = 5,
}

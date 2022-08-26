import { Camera, Node, screen, Size, view } from 'cc';
import CCNode from '../base/CCNode';
import Singleton from '../base/Singleton';

export default class StageManager extends Singleton {
    private _viewNode: CCNode = null;
    public get viewNode(): CCNode {
        return this._viewNode;
    }

    private _camara: Camera = null;
    public get camara(): Camera {
        return this._camara;
    }

    private _width: number = 0;
    public get width(): number {
        return this._width;
    }

    private _height: number = 0;
    public get height(): number {
        return this._height;
    }

    public init(node: Node) {
        let viewNode: CCNode = new CCNode();
        node.addChild(viewNode.node);
        this._viewNode = viewNode;
        this._camara = node.getChildByName('Camera') as unknown as Camera;
        this.setStageRect();
    }

    private setStageRect() {
        let size: Size = screen.windowSize;
        size.width /= view.getScaleX();
        size.height /= view.getScaleY();
        this._width = size.width;
        this._height = size.height;
    }
}

import { BoxCollider2D, Color, ERigidBody2DType, instantiate, Node, Vec2 } from 'cc';
import { PrefabEnum } from '../../auto/enum/PrefabEnum';
import App from '../../core/App';
import CCNode from '../../core/base/CCNode';
import EventDefine from '../../define/EventDefine';
import GameMath from '../../logic/GameMath';
import { DemoBlockComponent } from './DemoBlockComponent';

export default class DemoBlock {
    private ccNode: CCNode = null;
    public get node(): Node {
        return this.ccNode.node;
    }
    public get x(): number {
        return this.ccNode.x;
    }
    public get y(): number {
        return this.ccNode.y;
    }
    private color: Color = Color.BLACK;
    private _spriteSplashArr: Array<DemoBlockSpriteSplash> = [];
    public get spriteSplashArr(): Array<DemoBlockSpriteSplash> {
        return this._spriteSplashArr;
    }
    private isChanged: boolean = false;
    private blockDensity: number = 1;
    private blockGravityScale: number = 9.8;
    private isFixedRotation: boolean = false;
    private component: DemoBlockComponent = null;
    private _isContact: boolean = false;
    public get isContact(): boolean {
        return this._isContact;
    }
    private blockId: string = null;
    private contactCount: number = 0;

    constructor(blockId: string) {
        this.blockId = blockId;
        this.init();
    }

    public init() {
        this.initUI();
        this.setComponent();
        this.setEvents();
    }

    public removeSpriteSplash(indexArr: Array<number>): boolean {
        this.isChanged = true;
        for (let i = 0; i < indexArr.length; i++) {
            let index: number = indexArr[i];
            this._spriteSplashArr[index].ccNode.removeFromParent();
            this._spriteSplashArr[index].ccNode.destroy();
            this._spriteSplashArr[index].isShow = false;
        }
        let isHaveSpriteSplash: boolean = false;
        for (let i = 0; i < this._spriteSplashArr.length; i++) {
            if (this._spriteSplashArr[i].isShow) {
                isHaveSpriteSplash = true;
                break;
            }
        }
        return isHaveSpriteSplash;
    }

    public refreshBlock(): boolean {
        if (!this.isChanged) {
            return;
        }
        let boxArr: Array<CCNode> = [];
        for (let i = 0; i < this._spriteSplashArr.length; i++) {
            let spriteSplashArr: DemoBlockSpriteSplash = this._spriteSplashArr[i];
            if (!spriteSplashArr.isShow) {
                this._spriteSplashArr[i].boxCollider.destroy();
                this._spriteSplashArr.splice(i, 1);
                i--;
            } else {
                boxArr.push(spriteSplashArr.ccNode);
            }
        }
        let isErrorShape: boolean = false;
        if (!GameMath.getIsConnectBoxArr(boxArr)) {
            App.log.print('出现奇怪形状!');
            isErrorShape = true;
        }
        this.isChanged = false;
        return isErrorShape;
    }

    public setBlockDiffX(diffX: number) {
        this.ccNode.x = this.ccNode.x + diffX;
    }

    public setBlockPos(x: number, y: number) {
        this.ccNode.x = x;
        this.ccNode.y = y;
    }

    public setBlockDiffAngle(diffAngle: number) {
        this.ccNode.angle = this.ccNode.angle + diffAngle;
    }

    public setBlockRigidBody2DType(type: ERigidBody2DType) {
        this.ccNode.rigidBody2DType = type;
    }

    private initUI() {
        let randomNum: number = Math.floor(Math.random() * 7 + 1);
        let prefabData = App.prefabManager.prefabArr.get(PrefabEnum['DemoBlock' + randomNum]);
        if (!prefabData) {
            this.initUI();
            return;
        }
        let ccNode = new CCNode(instantiate(prefabData.prefab));
        this.ccNode = ccNode;
        this.ccNode.spriteColor = this.color;
        for (let i = 0; i < this.ccNode.childNum; i++) {
            let demoBlockSpriteSplash = new DemoBlockSpriteSplash();
            demoBlockSpriteSplash.ccNode = new CCNode(this.ccNode.children[i]);
            demoBlockSpriteSplash.ccNode.spriteColor = Color.BLACK;
            this._spriteSplashArr.push(demoBlockSpriteSplash);
        }
        let spriteSplashWidth: number = this._spriteSplashArr[0].ccNode.width;
        this._spriteSplashArr.forEach(p => {
            p.boxCollider = this.ccNode.node.addComponent(BoxCollider2D);
            p.boxCollider.size.width = spriteSplashWidth;
            p.boxCollider.size.height = spriteSplashWidth;
            p.boxCollider.offset = new Vec2(p.ccNode.x, p.ccNode.y);
            p.boxCollider.density = this.blockDensity;
        });
        this.ccNode.rigidBody2D.gravityScale = this.blockGravityScale;
        this.ccNode.rigidBody2D.fixedRotation = this.isFixedRotation;
        this.isChanged = true;
        this.refreshBlock();
    }

    public removeSelf() {
        this.ccNode.removeFromParent();
        this.ccNode.destroy();
    }

    private setEvents() {}

    private setBeginContact() {
        if (this.ccNode.rigidBody2D.type == ERigidBody2DType.Static) {
            App.eventsManager.dispatchEvent(EventDefine.demoGameOver);
            return;
        }
        this._isContact = true;
        this.contactCount++;
        App.log.print(`方块${this.blockId}发生${this.contactCount}次碰撞`);
    }

    private setComponent() {
        this.component = this.node.addComponent(DemoBlockComponent.name) as DemoBlockComponent;
        this.component.setData(this.setBeginContact, this);
    }
}

export class DemoBlockSpriteSplash {
    public ccNode: CCNode = null;
    public isShow: boolean = true;
    public boxCollider: BoxCollider2D = null;
}

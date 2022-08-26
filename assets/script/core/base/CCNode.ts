import { BoxCollider2D, Color, ERigidBody2DType, Label, math, Node, PolygonCollider2D, RigidBody2D, Sprite, UITransform, v3, Vec2, Vec3 } from 'cc';
import App from '../App';

export default class CCNode {
    private _node: Node = null;
    public get node(): Node {
        return this._node;
    }

    public get position(): Readonly<math.Vec3> {
        return this.node.position;
    }

    public set x(x: number) {
        if (!this.isHaveNode) {
            return;
        }
        this.node.setPosition(x, this.y, this.z);
    }
    public get x(): number {
        return this.position.x;
    }

    public set y(y: number) {
        if (!this.isHaveNode) {
            return;
        }
        this.node.setPosition(this.x, y, this.z);
    }
    public get y(): number {
        return this.position.y;
    }

    public set parent(parent: Node) {
        if (!this.isHaveNode) {
            return;
        }
        this.node.parent = parent;
    }
    public get parent(): Node {
        return this.parent;
    }

    public set angle(angle: number) {
        if (!this.isHaveNode) {
            return;
        }
        this.node.angle = angle;
    }
    public get angle(): number {
        return this.node.angle;
    }

    public set z(z: number) {
        if (!this.isHaveNode) {
            return;
        }
        this.node.setPosition(this.x, this.y, z);
    }
    public get z(): number {
        return this.position.z;
    }

    private _uiTransform: UITransform = null;
    public get uiTransform(): UITransform {
        if (!this._uiTransform) {
            this._uiTransform = this.node.getComponent(UITransform);
            if (!this._uiTransform) {
                this._uiTransform = this.node.addComponent(UITransform);
            }
        }
        return this._uiTransform;
    }

    public set width(width: number) {
        this.uiTransform.setContentSize(width, this.uiTransform.height);
    }
    public get width(): number {
        return this.uiTransform.width;
    }

    public set height(height: number) {
        this.uiTransform.setContentSize(this.uiTransform.width, height);
    }
    public get height(): number {
        return this.uiTransform.height;
    }

    public convertToNodeSpaceAR(worldPoint: Vec3): Vec3 {
        let out = new Vec3();
        this.uiTransform.convertToNodeSpaceAR(worldPoint, out);
        return out;
    }

    private _label: Label = null;
    public get label(): Label {
        if (!this._label) {
            this._label = this.node.getComponent(Label);
            if (!this._label) {
                this._label = this.node.addComponent(Label);
            }
        }
        return this._label;
    }

    public set string(string: string) {
        this.label.string = string;
    }
    public get string(): string {
        return this.label.string;
    }

    public set labelColor(color: Color) {
        this.label.color = color;
    }
    public get labelColor(): Color {
        return this.label.color;
    }

    private _sprite: Sprite = null;
    public get sprite(): Sprite {
        if (!this._sprite) {
            this._sprite = this.node.getComponent(Sprite);
            if (!this._sprite) {
                this._sprite = this.node.addComponent(Sprite);
            }
        }
        return this._sprite;
    }

    public set spriteColor(color: Color) {
        this.sprite.color = color;
    }
    public get spriteColor(): Color {
        return this.sprite.color;
    }

    private _rigidBody2D: RigidBody2D = null;
    public get rigidBody2D(): RigidBody2D {
        if (!this._rigidBody2D) {
            this._rigidBody2D = this.node.getComponent(RigidBody2D);
            if (!this._rigidBody2D) {
                this._rigidBody2D = this.node.addComponent(RigidBody2D);
            }
        }
        return this._rigidBody2D;
    }

    public set gravityScale(gravityScale: number) {
        this.rigidBody2D.gravityScale = gravityScale;
    }
    public get gravityScale(): number {
        return this.rigidBody2D.gravityScale;
    }

    public set rigidBody2DType(type: ERigidBody2DType) {
        if (this.rigidBody2DType == type) {
            return;
        }
        this.rigidBody2D.type = type;
    }
    public get rigidBody2DType(): ERigidBody2DType {
        return this.rigidBody2D.type;
    }

    private _boxCollider2D: BoxCollider2D = null;
    public get boxCollider2D(): BoxCollider2D {
        if (!this._boxCollider2D) {
            this._boxCollider2D = this.node.getComponent(BoxCollider2D);
            if (!this._boxCollider2D) {
                this._boxCollider2D = this.node.addComponent(BoxCollider2D);
            }
        }
        return this._boxCollider2D;
    }

    public set restitution(restitution: number) {
        this.boxCollider2D.restitution = restitution;
    }
    public get restitution(): number {
        return this.boxCollider2D.restitution;
    }

    public set boxCollider2DWidth(width: number) {
        this.boxCollider2D.size.width = width;
        this.boxCollider2D.apply();
    }
    public get boxCollider2DWidth(): number {
        return this.boxCollider2D.size.width;
    }

    public set boxCollider2DHeight(height: number) {
        this.boxCollider2D.size.height = height;
        this.boxCollider2D.apply();
    }
    public get boxCollider2DHeight(): number {
        return this.boxCollider2D.size.height;
    }

    private _polygonCollider2D: PolygonCollider2D = null;
    public get polygonCollider2D(): PolygonCollider2D {
        if (!this._polygonCollider2D) {
            this._polygonCollider2D = this.node.getComponent(PolygonCollider2D);
            if (!this._polygonCollider2D) {
                this._polygonCollider2D = this.node.addComponent(PolygonCollider2D);
            }
        }
        return this._polygonCollider2D;
    }

    public set polygonCollider2DPoints(points: Array<Vec2>) {
        try {
            this.polygonCollider2D.points = points;
            this.polygonCollider2D.apply();
        } catch (err) {
            App.log.redPrint(err);
        }
    }
    public get polygonCollider2DPoints(): Array<Vec2> {
        return this.polygonCollider2D.points;
    }

    public get childNum(): number {
        return this.node.children.length;
    }

    public get children(): Array<Node> {
        return this.node.children;
    }

    public removeFromParent() {
        this.node.removeFromParent();
    }

    public destroy() {
        this.node.destroy();
    }

    public addChild(child: Node) {
        this.node.addChild(child);
    }

    public get isHaveNode(): boolean {
        let isHaveNode: boolean = true;
        if (!this.node) {
            isHaveNode = false;
            App.log.redPrint('不存在node');
        }
        return isHaveNode;
    }

    constructor(node: Node = null) {
        if (!node) {
            node = new Node();
        }
        this._node = node;
    }
}

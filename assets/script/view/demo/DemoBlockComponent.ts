import { BoxCollider2D, Component, Contact2DType, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DemoBlockComponent')
export class DemoBlockComponent extends Component {
    private _boxColliderArr: Array<BoxCollider2D> = [];
    public get boxColliderArr(): Array<BoxCollider2D> {
        return this._boxColliderArr;
    }
    private beginContact: Function = null;
    private target: any = null;

    start() {
        this._boxColliderArr = this.getComponents(BoxCollider2D);
        this.setEvents();
    }

    public setData(beginContact: Function, target: any) {
        this.beginContact = beginContact;
        this.target = target;
    }

    private setEvents() {
        this.boxColliderArr.forEach(p => {
            p.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        });
    }

    private onBeginContact() {
        if (!this.beginContact || !this.target) {
            return;
        }
        this.beginContact.apply(this.target);
    }

    onDestroy() {}

    update() {}
}

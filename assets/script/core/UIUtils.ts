import { EventTouch, Node, Tween, TweenEasing, v3, Vec2, Vec3, __private } from 'cc';
import App from './App';

export default class UIUtils {
    public static tweentTo(
        node: Node,
        time: number,
        props: __private._cocos_tween_tween__ConstructorType<Node>,
        isRemoveSelf: boolean = false,
        completeCallBack: Function = null,
        completeCallObj: any = null,
        tweenEasing: TweenEasing = null
    ) {
        let tween = new Tween(node);
        tween.to(time / 1000, props, {
            easing: tweenEasing,
            onComplete: () => {
                if (completeCallBack && completeCallObj) {
                    completeCallBack.call(completeCallObj);
                }
                if (isRemoveSelf) {
                    node.removeFromParent();
                }
            },
        });
        tween.start();
    }

    public static tweentForm(
        node: Node,
        time: number,
        props: __private._cocos_tween_tween__ConstructorType<Node>,
        isRemoveSelf: boolean = false,
        completeCallBack: Function = null,
        completeCallObj: any = null,
        tweenEasing: TweenEasing = null
    ) {
        let nodePosition = v3(node.position.x, node.position.y, node.position.z);
        if (props.position) {
            node.setPosition(props.position);
        }
        this.tweentTo(node, time, { position: nodePosition }, isRemoveSelf, completeCallBack, completeCallObj, tweenEasing);
    }

    public static toWorldPosition(node: Node): Vec3 {
        let pos: Vec3 = new Vec3();
        try {
            if (node.position) {
                pos = new Vec3(node.worldPosition);
            }
        } catch (err) {
            App.log.redPrint(err);
        }
        return pos;
    }

    public static clickLocation(e: EventTouch): Vec2 {
        let pos = e.getUILocation();
        return new Vec2(pos.x, pos.y);
    }

    public static clickPosToAppViewNodePos(x, y): Vec3 {
        let pos = App.stageManager.viewNode.convertToNodeSpaceAR(new Vec3(x, y));
        return pos;
    }
}

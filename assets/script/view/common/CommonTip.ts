import { Color, Node, v3, __private } from 'cc';
import App from '../../core/App';
import CCNode from '../../core/base/CCNode';
import { Layer } from '../../core/manager/LayerManager';
import UIUtils from '../../core/UIUtils';

export default class CommonTip {
    public static showLabelTip(text: string, maxExitTime: number = 3000, moveTime: number = 800, stayTime: number = 200) {
        let ccNode = new CCNode();
        App.layerManager.layerArr[Layer.tip].addChild(ccNode.node);
        ccNode.string = text;
        ccNode.labelColor = Color.RED;
        let props: __private._cocos_tween_tween__ConstructorType<Node> = null;
        props = { position: v3(ccNode.x, App.stageManager.height / 2) };
        let completeCallBack: Function = () => {
            setTimeout(() => {
                UIUtils.tweentTo(ccNode.node, moveTime, props, true, null, null, 'quadIn');
            }, stayTime);
        };
        UIUtils.tweentForm(ccNode.node, moveTime, props, false, completeCallBack, this, 'quadOut');
        setTimeout(() => {
            ccNode.removeFromParent();
            ccNode.destroy();
        }, maxExitTime);
    }
}

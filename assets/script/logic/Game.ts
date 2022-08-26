import { Color, instantiate } from 'cc';
import { PrefabEnum } from '../auto/enum/PrefabEnum';
import App from '../core/App';
import CCNode from '../core/base/CCNode';
import Singleton from '../core/base/Singleton';
import { Layer } from '../core/manager/LayerManager';

export default class Game extends Singleton {
    public init() {
        App.uiManager.init();
        App.uiRegister.init();
    }

    public start() {
        this.init();
        this.setEvents();
        this.setStageBg();
        this.setGame();
    }

    private setStageBg() {
        let prefabData = App.prefabManager.prefabArr.get(PrefabEnum.SpriteSplash);
        let ccNode = new CCNode(instantiate(prefabData.prefab));
        ccNode.width = App.stageManager.width;
        ccNode.height = App.stageManager.height;
        ccNode.spriteColor = Color.GRAY;
        App.layerManager.layerArr[Layer.stage].addChild(ccNode.node);
    }

    private setGame() {
        App.test.test();
    }

    private setEvents() {}
}

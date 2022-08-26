import { Component, _decorator } from 'cc';
import { GRoot } from 'fairygui-cc';
import EventDefine from '../define/EventDefine';
import App from './App';
import QDictionary from './base/QDictionary';
const { ccclass, property } = _decorator;

@ccclass('AppEntry')
export class AppEntry extends Component {
    private initLoadedTypeArr: QDictionary<InitLoadType> = new QDictionary<InitLoadType>();
    private initNeedLoadTypeArr: Array<InitLoadType> = [InitLoadType.JsonManager, InitLoadType.PrefabManager, InitLoadType.FairyUIManager];

    start() {
        this.initManager();
        this.setEvents();
        this.initJson();
    }

    onLoad() {
        GRoot.create();
    }

    private setEvents() {
        App.eventsManager.on(EventDefine.appInitLoadCallBack, this.onLoadCallBack, this);
    }

    private onLoadCallBack(loadType: InitLoadType) {
        let isAllLoaded: boolean = true;
        this.initLoadedTypeArr.set(loadType, loadType);
        if (loadType == InitLoadType.JsonManager) {
            this.initAssetsManager();
        }
        this.initNeedLoadTypeArr.forEach(p => {
            if (!this.initLoadedTypeArr.contentsKey(p)) {
                isAllLoaded = false;
            }
        });
        if (isAllLoaded) {
            App.game.start();
        }
    }

    private initManager() {
        App.eventsManager.init();
        App.stageManager.init(this.node);
        App.layerManager.init();
    }

    private initJson() {
        App.jsonManager.init();
    }

    private initAssetsManager() {
        App.prefabManager.init();
        App.fguiManager.init();
    }

    update(deltaTime: number) {
        App.eventsManager.dispatchEvent(EventDefine.appUpdate, [deltaTime]);
    }
}

export enum InitLoadType {
    JsonManager = 'JsonManager',
    PrefabManager = 'PrefabManager',
    FairyUIManager = 'FairyUIManager',
}

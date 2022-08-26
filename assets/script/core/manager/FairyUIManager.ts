import { GRoot, UIPackage } from 'fairygui-cc';
import FairyUICfg from '../../auto/cfg/FairyUICfg';
import EventDefine from '../../define/EventDefine';
import App from '../App';
import { InitLoadType } from '../AppEntry';
import CCNode from '../base/CCNode';
import QDictionary from '../base/QDictionary';
import Singleton from '../base/Singleton';
import { Layer } from './LayerManager';

export default class FairyUIManager extends Singleton {
    private GRootNode: CCNode = null;
    private _fairyUIArr: QDictionary<FairyUICfg> = null;
    public get fairyUIArr(): QDictionary<FairyUICfg> {
        return this._fairyUIArr;
    }
    private initfairyUICount: number = 0;

    public init() {
        this.GRootNode = new CCNode(GRoot.inst.displayListContainer);
        this.GRootNode.node.parent = App.layerManager.layerArr[Layer.fairyUI];
        this.GRootNode.x = (App.defaultWidth / 2) * -1;
        this.GRootNode.y = App.defaultHeight / 2;
        this._fairyUIArr = new QDictionary<FairyUICfg>();
        this.initfairyUICount = 0;
        let fairyUICfgNeedLoadArr: Array<FairyUICfg> = [];
        for (let key in App.jsonManager.fairyUIJson.values) {
            let fairyUICfg: FairyUICfg = App.jsonManager.fairyUIJson.values[key];
            if (fairyUICfg.isLoaded) {
                fairyUICfgNeedLoadArr.push(fairyUICfg);
                this.initfairyUICount++;
            }
        }
        if (this.initfairyUICount <= 0) {
            this.initfairyUILoaded();
        }
        for (let i = 0; i < fairyUICfgNeedLoadArr.length; i++) {
            this.loadPackge(fairyUICfgNeedLoadArr[i], this.initfairyUILoaded, this);
        }
    }

    public removePackge(fairyGUICfg: FairyUICfg) {
        // if ()
        UIPackage.removePackage(fairyGUICfg.url);
        this._fairyUIArr.remove(fairyGUICfg.pakegeName);
    }

    private loadPackge(fairyGUICfg: FairyUICfg, callBack: Function = null, callBackObj: any = null) {
        UIPackage.loadPackage(fairyGUICfg.url, err => {
            if (err) {
                App.log.redPrint(err);
                return;
            }
            this._fairyUIArr.set(fairyGUICfg.pakegeName, fairyGUICfg);
            if (callBack && callBackObj) {
                callBack.apply(callBackObj);
            }
        });
    }

    private initfairyUILoaded() {
        this.initfairyUICount--;
        if (this.initfairyUICount <= 0) {
            App.eventsManager.dispatchEvent(EventDefine.appInitLoadCallBack, [InitLoadType.FairyUIManager]);
        }
    }

    public createObject(fairyGUICfg: FairyUICfg, callBack: Function = null, callBackObj: any = null) {
        if (this._fairyUIArr.contentsKey(fairyGUICfg.pakegeName)) {
            callBack.apply(callBackObj);
        } else {
            this.loadPackge(fairyGUICfg, callBack, callBackObj);
        }
    }
}

import { Prefab, resources } from 'cc';
import PrefabCfg from '../../auto/cfg/PrefabCfg';
import EventDefine from '../../define/EventDefine';
import App from '../App';
import { InitLoadType } from '../AppEntry';
import QDictionary from '../base/QDictionary';
import Singleton from '../base/Singleton';

export default class PrefabManager extends Singleton {
    private _prefabArr: QDictionary<PrefabData> = null;
    public get prefabArr(): QDictionary<PrefabData> {
        return this._prefabArr;
    }
    private initPrefabCount: number = 0;

    public init() {
        this._prefabArr = new QDictionary<PrefabData>();
        this.initPrefabCount = App.jsonManager.prefabJson.length;
        for (let key in App.jsonManager.prefabJson.values) {
            this.loadPrefab(App.jsonManager.prefabJson.values[key], this.initPrefabLoaded, this);
        }
    }

    public loadPrefab(prefabCfg: PrefabCfg, callBack: Function = null, callBackObj: any = null) {
        resources.load(prefabCfg.url, Prefab, (err, prefab) => {
            if (err) {
                App.log.redPrint(err);
            }
            let prefabData = new PrefabData(prefabCfg.url, prefabCfg.name, prefab);
            if (this._prefabArr.contentsKey(prefabCfg.name)) {
                App.log.redPrint(`存在prefab:${prefabCfg.url}-${prefabCfg.name}`);
            }
            this._prefabArr.set(prefabCfg.name, prefabData);
            if (callBack && callBackObj) {
                callBack.apply(callBackObj);
            }
        });
    }

    private initPrefabLoaded() {
        this.initPrefabCount--;
        if (this.initPrefabCount == 0) {
            App.eventsManager.dispatchEvent(EventDefine.appInitLoadCallBack, [InitLoadType.PrefabManager]);
        }
    }
}

export class PrefabData {
    public url: string = '';
    public name: string = '';
    public prefab: Prefab = null;
    constructor(url: string, name: string, prefab: Prefab) {
        this.url = url;
        this.name = name;
        this.prefab = prefab;
    }
}

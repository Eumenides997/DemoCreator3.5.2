import { JsonAsset, resources } from 'cc';
import FairyUICfg from '../../auto/cfg/FairyUICfg';
import PrefabCfg from '../../auto/cfg/PrefabCfg';
import { JsonEnum } from '../../auto/enum/JsonEnum';
import EventDefine from '../../define/EventDefine';
import App from '../App';
import { InitLoadType } from '../AppEntry';
import QDictionary from '../base/QDictionary';
import Singleton from '../base/Singleton';

export default class JsonManager extends Singleton {
    private jsonArr: QDictionary<JsonAsset> = null;

    private _prefabJson: QDictionary<PrefabCfg> = null;
    public get prefabJson(): QDictionary<PrefabCfg> {
        if (!this._prefabJson) {
            this._prefabJson = new QDictionary<PrefabCfg>();
            let json = this.jsonArr.get(JsonEnum.prefab).json;
            for (let key in json) {
                let prefabCfg = new PrefabCfg();
                prefabCfg.url = json[key].url;
                prefabCfg.name = json[key].name;
                this._prefabJson.set(json[key].name, prefabCfg);
            }
        }
        return this._prefabJson;
    }

    private _fairyUIJson: QDictionary<FairyUICfg> = null;
    public get fairyUIJson(): QDictionary<FairyUICfg> {
        if (!this._fairyUIJson) {
            this._fairyUIJson = new QDictionary<FairyUICfg>();
            let json = this.jsonArr.get(JsonEnum.fairyUI).json;
            for (let key in json) {
                let fairyUICfg = new FairyUICfg();
                fairyUICfg.url = json[key].url;
                fairyUICfg.pakegeName = json[key].pakegeName;
                fairyUICfg.isLoaded = json[key].isLoaded;
                fairyUICfg.isRemove = json[key].isRemove;
                this._fairyUIJson.set(json[key].pakegeName, fairyUICfg);
            }
        }
        return this._fairyUIJson;
    }

    private initJsonCount: number = 0;

    public init() {
        this.jsonArr = new QDictionary<JsonAsset>();
        this.loadJson(JsonEnum.prefab);
        this.loadJson(JsonEnum.fairyUI);
        this.initJsonCount = 2;
    }

    private loadJson(url: string) {
        resources.load(url, JsonAsset, (err, json) => {
            if (err) {
                App.log.redPrint(err);
            }
            this.jsonArr.set(url, json);
            this.initJsonLoaded();
        });
    }

    private initJsonLoaded() {
        this.initJsonCount--;
        if (this.initJsonCount == 0) {
            App.eventsManager.dispatchEvent(EventDefine.appInitLoadCallBack, [InitLoadType.JsonManager]);
        }
    }
}

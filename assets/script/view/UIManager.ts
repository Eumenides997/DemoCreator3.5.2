import FairyUICfg from '../auto/cfg/FairyUICfg';
import FariyBaseView from '../core/base/FairyBaseView';
import QDictionary from '../core/base/QDictionary';
import Singleton from '../core/base/Singleton';

export default class UIManager extends Singleton {
    private _uiArr: QDictionary<FariyBaseView<any>> = null;
    private _uiOpenedArr: QDictionary<FariyBaseView<any>> = null;
    private _pakegeOpenedArr: QDictionary<FairyUICfg> = null;

    public init() {
        this._uiArr = new QDictionary<FariyBaseView<any>>();
        this._uiOpenedArr = new QDictionary<FariyBaseView<any>>();
        this._pakegeOpenedArr = new QDictionary<FairyUICfg>();
    }

    public registerUI(view: FariyBaseView<any>) {
        this._uiArr.set(view.resName, view);
    }

    public showUIQueue(view: any) {
        //队列先进先出，前一个UI关闭后再打开下一个UI
    }

    public showUI(view: any) {
        if (!this.isView(view)) {
            return;
        }
        if (this._uiOpenedArr.contentsKey(view.resName)) {
            return;
        }
        let fariyBaseView: FariyBaseView<any> = this._uiArr.get(view.resName);
        fariyBaseView.show();
        this._uiOpenedArr.set(fariyBaseView.resName, view);
        this._pakegeOpenedArr.set(fariyBaseView.fairyGUICfg.url, fariyBaseView.fairyGUICfg);
    }

    public closeUI(view: any) {
        if (!this.isView(view)) {
            return;
        }
        if (!this._uiOpenedArr.contentsKey(view.resName)) {
            return;
        }
        let fariyBaseView: FariyBaseView<any> = this._uiArr.get(view.resName);
        fariyBaseView.destroy();
        this._uiOpenedArr.remove(fariyBaseView.resName);
    }

    private isView(view: any): boolean {
        let isView: boolean = true;
        if (!view || !view.resName || !this._uiArr.contentsKey(view.resName)) {
            isView = false;
        }
        return isView;
    }
}

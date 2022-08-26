import { GComponent, GRoot } from 'fairygui-cc';
import FairyUICfg from '../../auto/cfg/FairyUICfg';
import App from '../App';
import BaseView from './BaseView';

export default class FariyBaseView<T extends GComponent> extends BaseView {
    private _fairyGUICfg: FairyUICfg = null;
    public get fairyGUICfg(): FairyUICfg {
        return this._fairyGUICfg;
    }
    private _resName: string = null;
    public get resName(): string {
        return this._resName;
    }
    private _cls: any = null;
    private _view: T = null;
    public get view(): T {
        return this._view;
    }
    private isFullScreen: boolean = true;

    constructor(pakegeName: string, resName: string, cls: any, isFullScreen: boolean = true) {
        super();
        this._fairyGUICfg = App.jsonManager.fairyUIJson.get(pakegeName);
        this._resName = resName;
        this._cls = cls;
        this.isFullScreen = isFullScreen;
    }

    public show() {
        App.fguiManager.createObject(
            this._fairyGUICfg,
            () => {
                this._view = this._cls.createInstance() as T;
                GRoot.inst.addChild(this._view);
                this._view.pivotX = 0.5;
                this._view.pivotY = 0.5;
                if (this.isFullScreen) {
                    this._view.makeFullScreen();
                }
                this.onOpened();
                this.setEvents();
            },
            this
        );
    }

    protected onOpened() {
        App.log.print(`${this.resName} onOpened didn't rewrite`);
    }

    protected setEvents() {
        App.log.print(`${this.resName} setEvents didn't rewrite`);
    }

    protected onDestory() {
        App.log.print(`${this.resName} onDestory didn't rewrite`);
    }

    public destroy() {
        if (!this._view) {
            return;
        }
        this._view.removeFromParent();
        if (this._fairyGUICfg.isRemove) {
            App.fguiManager.removePackge(this._fairyGUICfg);
        }
        this.removeAllEvents();
        this.onDestory();
    }

    public closeView() {
        App.uiManager.closeUI(this._resName);
    }
}

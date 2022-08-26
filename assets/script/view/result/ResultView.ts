import UI_ResultView from "../../../resources/fairyUI/Common/UI_ResultView";
import { FairyUIEnum } from "../../auto/enum/FairyUIEnum";
import App from "../../core/App";
import FariyBaseView from "../../core/base/FairyBaseView";
import HomeView from "../home/HomeView";

export default class ResultView extends FariyBaseView<UI_ResultView> {
    public static readonly resName: string = FairyUIEnum.Common.ResultView;
    constructor() {
        super(FairyUIEnum.pakege.Common, ResultView.resName, UI_ResultView);
    }

    protected setEvents() {
        this.view.btnLock.onClick(this.onBtnLock, this);
    }

    protected onDestory() {
        this.view.btnLock.offClick(this.onBtnLock, this);
    }

    private onBtnLock() {
        App.uiManager.showUI(HomeView);
        this.closeView();
        App.demoView.destory();
    }
}
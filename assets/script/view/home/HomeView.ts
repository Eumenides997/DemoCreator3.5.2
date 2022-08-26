import UI_HomeView from '../../../resources/fairyUI/Common/UI_HomeView';
import { FairyUIEnum } from '../../auto/enum/FairyUIEnum';
import App from '../../core/App';
import FariyBaseView from '../../core/base/FairyBaseView';
import BattleView from '../demo/BattleView';

export default class HomeView extends FariyBaseView<UI_HomeView> {
    public static readonly resName: string = FairyUIEnum.Common.HomeView;
    constructor() {
        super(FairyUIEnum.pakege.Common, HomeView.resName, UI_HomeView);
    }

    protected onOpened() {
        this.view.txtTip.text = '左上';
        this.view.txtTip2.text = '右上';
        this.view.txtTip3.text = '左下';
        this.view.txtTip4.text = '右下';
    }

    protected setEvents() {
        this.view.btnLock.onClick(this.onBtnLock, this);
    }

    protected onDestory() {
        this.view.btnLock.offClick(this.onBtnLock, this);
    }

    private onBtnLock() {
        App.uiManager.showUI(BattleView);
        this.closeView();
    }
}

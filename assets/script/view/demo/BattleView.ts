import UI_BattleView from '../../../resources/fairyUI/Common/UI_BattleView';
import { FairyUIEnum } from '../../auto/enum/FairyUIEnum';
import App from '../../core/App';
import FariyBaseView from '../../core/base/FairyBaseView';

export default class BattleView extends FariyBaseView<UI_BattleView> {
    public static readonly resName: string = FairyUIEnum.Common.BattleView;
    constructor() {
        super(FairyUIEnum.pakege.Common, BattleView.resName, UI_BattleView);
    }

    protected onOpened() {
        App.demoView.init();
        App.demoView.setTxtScoreNode(this.view.txtScore);
    }
}

import CommonBinder from '../../resources/fairyUI/Common/CommonBinder';
import App from '../core/App';
import Singleton from '../core/base/Singleton';
import BattleView from './demo/BattleView';
import HomeView from './home/HomeView';
import ResultView from './result/ResultView';

export default class UIRegister extends Singleton {
    public init() {
        this.bindAll();
        this.regAll();
    }

    private bindAll() {
        CommonBinder.bindAll();
    }

    private regAll() {
        App.uiManager.registerUI(new HomeView());
        App.uiManager.registerUI(new ResultView());
        App.uiManager.registerUI(new BattleView());
    }
}

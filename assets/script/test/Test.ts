import App from '../core/App';
import Singleton from '../core/base/Singleton';
import HomeView from '../view/home/HomeView';
import abstractClass2 from './abstractClass2';

export default class Test extends Singleton {
    public test() {
        App.uiManager.showUI(HomeView);
        let ab = new abstractClass2();
        ab.testFun(2123, "asdkj");
    }
}

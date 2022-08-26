import Game from '../logic/Game';
import DemoView from '../view/demo/DemoView';
import Log from './base/Log';
import EventsManager from './manager/EventsManager';
import FairyUIManager from './manager/FairyUIManager';
import JsonManager from './manager/JsonManager';
import LayerManager from './manager/LayerManager';
import PrefabManager from './manager/PrefabManager';
import StageManager from './manager/StageManager';
import * as fgui from 'fairygui-cc';
import UIManager from '../view/UIManager';
import Test from '../test/Test';
import UIRegister from '../view/UIRegister';

export default class App {
    public static defaultWidth: number = 828;
    public static defaultHeight: number = 1792;
    public static get fgui() {
        return fgui;
    }
    public static get stageManager(): StageManager {
        return StageManager.getInstance<StageManager>();
    }
    public static get layerManager(): LayerManager {
        return LayerManager.getInstance<LayerManager>();
    }
    public static get jsonManager(): JsonManager {
        return JsonManager.getInstance<JsonManager>();
    }
    public static get prefabManager(): PrefabManager {
        return PrefabManager.getInstance<PrefabManager>();
    }
    public static get eventsManager(): EventsManager {
        return EventsManager.getInstance<EventsManager>();
    }
    public static get fguiManager(): FairyUIManager {
        return FairyUIManager.getInstance<FairyUIManager>();
    }
    public static get uiManager(): UIManager {
        return UIManager.getInstance<UIManager>();
    }
    public static get uiRegister(): UIRegister {
        return UIRegister.getInstance<UIRegister>();
    }
    public static get game(): Game {
        return Game.getInstance<Game>();
    }
    public static get log(): Log {
        return Log.getInstance<Log>();
    }
    public static get test(): Test {
        return Test.getInstance<Test>();
    }
    public static get demoView(): DemoView {
        return DemoView.getInstance<DemoView>();
    }
}
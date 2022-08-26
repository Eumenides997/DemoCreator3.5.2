import * as fgui from "fairygui-cc";


import UI_ResultView from "./UI_ResultView";
import UI_btnLock from "./UI_btnLock";
import UI_HomeView from "./UI_HomeView";
import UI_AAAA from "./UI_AAAA";
import UI_BattleView from "./UI_BattleView";

export default class CommonBinder{
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_ResultView.URL, UI_ResultView);
		fgui.UIObjectFactory.setExtension(UI_btnLock.URL, UI_btnLock);
		fgui.UIObjectFactory.setExtension(UI_HomeView.URL, UI_HomeView);
		fgui.UIObjectFactory.setExtension(UI_AAAA.URL, UI_AAAA);
		fgui.UIObjectFactory.setExtension(UI_BattleView.URL, UI_BattleView);
	}
}
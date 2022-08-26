import * as fgui from "fairygui-cc";


import UI_btnLock from "./UI_btnLock";

export default class UI_ResultView extends fgui.GComponent {

	public txtTip:fgui.GTextField;
	public btnLock:UI_btnLock;

	public static URL:string = "ui://673r7v45cav40";

	public static createInstance():UI_ResultView {
		return <UI_ResultView>(fgui.UIPackage.createObject("Common","ResultView"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.txtTip = <fgui.GTextField>(this.getChild("txtTip"));
		this.btnLock = <UI_btnLock>(this.getChild("btnLock"));
	}
}
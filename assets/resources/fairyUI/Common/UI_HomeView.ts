import * as fgui from "fairygui-cc";


import UI_btnLock from "./UI_btnLock";

export default class UI_HomeView extends fgui.GComponent {

	public txtTip:fgui.GTextField;
	public txtTip2:fgui.GTextField;
	public txtTip3:fgui.GTextField;
	public txtTip4:fgui.GTextField;
	public btnLock:UI_btnLock;

	public static URL:string = "ui://673r7v45xoiv5";

	public static createInstance():UI_HomeView {
		return <UI_HomeView>(fgui.UIPackage.createObject("Common","HomeView"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.txtTip = <fgui.GTextField>(this.getChild("txtTip"));
		this.txtTip2 = <fgui.GTextField>(this.getChild("txtTip2"));
		this.txtTip3 = <fgui.GTextField>(this.getChild("txtTip3"));
		this.txtTip4 = <fgui.GTextField>(this.getChild("txtTip4"));
		this.btnLock = <UI_btnLock>(this.getChild("btnLock"));
	}
}
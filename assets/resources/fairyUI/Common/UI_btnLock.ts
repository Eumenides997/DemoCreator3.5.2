import * as fgui from "fairygui-cc";




export default class UI_btnLock extends fgui.GButton {

	public isLock:fgui.Controller;
	public n0:fgui.GLoader;

	public static URL:string = "ui://673r7v45rjx74";

	public static createInstance():UI_btnLock {
		return <UI_btnLock>(fgui.UIPackage.createObject("Common","btnLock"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.isLock = this.getController("isLock");
		this.n0 = <fgui.GLoader>(this.getChild("n0"));
	}
}
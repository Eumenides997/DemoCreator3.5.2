import * as fgui from "fairygui-cc";




export default class UI_BattleView extends fgui.GComponent {

	public txtTip:fgui.GTextField;
	public txtTip2:fgui.GTextField;
	public txtTip3:fgui.GTextField;
	public txtTip4:fgui.GTextField;
	public txtScore:fgui.GTextField;

	public static URL:string = "ui://673r7v45xoiv7";

	public static createInstance():UI_BattleView {
		return <UI_BattleView>(fgui.UIPackage.createObject("Common","BattleView"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.txtTip = <fgui.GTextField>(this.getChild("txtTip"));
		this.txtTip2 = <fgui.GTextField>(this.getChild("txtTip2"));
		this.txtTip3 = <fgui.GTextField>(this.getChild("txtTip3"));
		this.txtTip4 = <fgui.GTextField>(this.getChild("txtTip4"));
		this.txtScore = <fgui.GTextField>(this.getChild("txtScore"));
	}
}
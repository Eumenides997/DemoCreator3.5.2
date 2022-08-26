import * as fgui from "fairygui-cc";




export default class UI_AAAA extends fgui.GComponent {

	public txtTip:fgui.GTextField;
	public txtTip2:fgui.GTextField;
	public txtTip3:fgui.GTextField;
	public txtTip4:fgui.GTextField;

	public static URL:string = "ui://673r7v45xoiv6";

	public static createInstance():UI_AAAA {
		return <UI_AAAA>(fgui.UIPackage.createObject("Common","AAAA"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.txtTip = <fgui.GTextField>(this.getChild("txtTip"));
		this.txtTip2 = <fgui.GTextField>(this.getChild("txtTip2"));
		this.txtTip3 = <fgui.GTextField>(this.getChild("txtTip3"));
		this.txtTip4 = <fgui.GTextField>(this.getChild("txtTip4"));
	}
}
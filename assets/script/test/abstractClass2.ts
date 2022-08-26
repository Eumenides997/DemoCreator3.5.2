import App from "../core/App";
import abstractClass from "./abstractClass";

export default class abstractClass2 extends abstractClass {
    public testFun(data1: number | string, data2?) {
        App.log.print(data1 + "" + data2);
    }

    // public testFun(data) {
        
    // }
}
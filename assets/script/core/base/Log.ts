import Singleton from './Singleton';

export default class Log extends Singleton {
    private dataArr: Array<LogData> = [];
    public print(data: any) {
        this.log(0, data);
    }

    public redPrint(data: any) {
        this.log(1, data);
    }

    private log(type: number = 0, data: any) {
        switch (type) {
            case 0:
                console.log(data);
                break;
            case 1:
                console.warn(data);
                break;
        }
        let logData = new LogData(data);
        this.dataArr.push(logData);
    }
}

export class LogData {
    public data: any = null;
    public date: Date = new Date();
    constructor(data: any) {
        this.data = data;
    }
}

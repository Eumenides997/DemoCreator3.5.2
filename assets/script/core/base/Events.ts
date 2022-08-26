import { BaseNode } from 'cc';
import QDictionary from './QDictionary';

export class Events extends BaseNode {
    public eventArr: QDictionary<EventData> = null;

    public init() {
        this.eventArr = new QDictionary<EventData>();
    }
    
    public setEvent(id: string, callBack: Function, target: any) {
        if (this.hasEventListener(id, callBack, target)) {
            return;
        }
        this.on(id, callBack, target);
        let eventData = new EventData(id, callBack, target);
        this.eventArr.set(id, eventData);
    }

    public removeEvent(id: string, callBack: Function, target: any) {
        this.off(id, callBack, target);
    }

    public removeAll() {
        this.eventArr.values.forEach(p => {
            this.off(p.id);
        });
    }
}

export class EventData {
    id: string = '';
    callBack: Function = null;
    target: any = null;
    constructor(id: string, callBack: Function, target: any) {
        this.id = id;
        this.callBack = callBack;
        this.target = target;
    }
}

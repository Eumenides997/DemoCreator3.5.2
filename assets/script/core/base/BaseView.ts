import App from '../App';
import { EventData } from './Events';
import Singleton from './Singleton';

export default class BaseView extends Singleton {
    private eventDataArr: Array<EventData> = [];

    protected on(id: string, callBack: Function, target: any) {
        App.eventsManager.on(id, callBack, target);
        this.eventDataArr.push(new EventData(id, callBack, target));
    }

    protected removeAllEvents() {
        this.eventDataArr.forEach(p => {
            App.eventsManager.on(p.id, p.callBack, p.target);
        });
    }
}

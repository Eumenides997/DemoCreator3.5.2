import { Events } from '../base/Events';
import Singleton from '../base/Singleton';

export default class EventsManager extends Singleton {
    private events: Events = null;

    public init() {
        this.events = new Events();
        this.events.init();
    }

    public dispatchEvent(id: string, args: Array<any> = null) {
        if (!this.events) {
            return;
        }
        this.events.emit(id, args);
    }

    public on(id: string, callBack: Function, target: any) {
        this.events.setEvent(id, callBack, target);
    }

    public off(id: string, callBack: Function, target: any) {
        this.events.removeEvent(id, callBack, target);
    }

    public offAll() {
        this.events.removeAll();
    }
}

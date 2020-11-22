import Store from '../store/Store';

export default abstract class Listener {
    protected io: any;

    protected socket: any;

    protected store: Store;

    protected debug: boolean = true;

    protected constructor(io: any, socket: any, store: Store) {
        this.io = io;
        this.socket = socket;
        this.store = store;
    }

    protected receive(eventName: string, payload: any = null) {
        if (this.debug) {
            console.log('received', eventName, payload);
        }
    }

    protected send(eventName: string, payload: any) {
        this.socket.emit(eventName, payload);
        console.log('emitted to sender', eventName, payload);
    }

    protected sendToAll(eventName: string, payload: any) {
        this.io.emit(eventName, payload);

        if (this.debug) {
            console.log('emitted to all', eventName, payload);
        }
    }

    abstract registerListener(): void;
}

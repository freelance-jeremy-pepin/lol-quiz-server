export default abstract class Listener {
    protected io: any = null;

    protected socket: any = null;

    protected debug: boolean = true;

    protected constructor(io: any, socket: any) {
        this.io = io;
        this.socket = socket;
    }

    protected receive(eventName: string, ...opts: any) {
        if (this.debug) {
            console.log('received', eventName, ...opts);
        }
    }

    protected send(eventName: string, ...opts: any) {
        this.socket.emit(eventName, ...opts);
        console.log('emitted to sender', eventName);
    }

    protected sendToAll(eventName: string, ...opts: any) {
        this.io.emit(eventName, ...opts);

        if (this.debug) {
            console.log('emitted to all', eventName, ...opts);
        }
    }

    abstract registerListener(): void;
}

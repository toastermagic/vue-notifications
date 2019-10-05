export class AdzuNotification {
    id: string;
    arrivalTime: Date;
    message: string = "";
    read: boolean = false;

    constructor() {
        const time: Date = new Date();
        this.arrivalTime = time;
        this.id = time.valueOf().toString();
    }
}

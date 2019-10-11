export class AdzuNotification {
    id: string;
    arrivalTime: Date;
    message: string = "";
    read: boolean = false;

    constructor(message?: string, date?: Date) {
      if (message) {
        this.message = message;
      }
      if (date) {
        this.arrivalTime = date;
        this.id = date.valueOf().toString();
      } else {
        const time: Date = new Date();
        this.arrivalTime = time;
        this.id = time.valueOf().toString();
      }
    }
}

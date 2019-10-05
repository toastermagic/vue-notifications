export class AdzuNotification {
    id: string;
    arrivalTime: Date;
    message: string = "";
    read: boolean = false;

    constructor(message?: string) {
      if (message) {
        this.message = message;
      }
      const time: Date = new Date();
      this.arrivalTime = time;
      this.id = time.valueOf().toString();
    }
}

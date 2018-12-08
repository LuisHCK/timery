export default class Task {
  constructor(
    title = undefined,
    startDateTime = undefined,
    finishDateTime = undefined,
    done = false
  ) {
    this.title = title;
    this.startDateTime = startDateTime ? new Date(startDateTime) : undefined;
    this.finishDateTime = finishDateTime ? new Date(finishDateTime) : undefined;
    this.done = done;
  }

  get duration() {
    if (this.done) {
      const diff = this.finishDateTime.getTime() - this.startDateTime.getTime();
      const minutes = diff / 60000;
      const hours = minutes / 60;
      return Math.round(hours * 10) / 10;
    } else {
      return undefined;
    }
  }

  finish() {
    if (!this.done) {
      this.done = true;
      // set current datetime as finish date
      this.finishDateTime = new Date();
      return true;
    } else {
      throw "Can't finish done task";
    }
  }

  start() {
    if (this.done) {
      throw "Task already started. Try with restart()";
    }
    this.startDateTime = new Date();
  }

  restart() {
    if (this.startDateTime) {
      this.startDateTime = new Date();
      this.finishDateTime = undefined;
      this.done = false;
      return true;
    } else {
      throw "Start the task before restart it";
    }
  }
}

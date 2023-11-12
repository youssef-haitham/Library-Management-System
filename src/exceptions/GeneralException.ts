export class GeneralException extends Error {
    constructor(message:string) {
      super("General Exception: " + message);
    }
}
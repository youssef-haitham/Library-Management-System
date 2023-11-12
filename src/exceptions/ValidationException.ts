export class ValidationException extends Error {
    constructor(message: string) {
      super("Validation Error: " + message);
    }
}
export class ValidationException extends Error {
    constructor(message: string) {
      super("Validation Exception: " + message);
    }
}
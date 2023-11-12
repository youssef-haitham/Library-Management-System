export class ObjectAlreadyExistsException extends Error {
    constructor() {
      super("Object Already Exists");
    }
}
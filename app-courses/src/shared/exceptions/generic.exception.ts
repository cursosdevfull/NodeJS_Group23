export class GenericException extends Error {
  status: number;
  stack: string | undefined;

  constructor(status: number, message: string, stack: string | undefined) {
    super(message);
    this.status = status;
    this.stack = stack;
  }
}

export class EmptyBaseAddressError extends Error {

  constructor(serviceName: string) {
    super(`The base address for the ${serviceName} is empty`);
    this.name = "EmptyBaseAddressError";
  }

}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class InvalidPatientError extends Error {
  /* eslint-disable-next-line  */
  constructor(...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPatientError);
    }

    this.name = "InvalidPatientError";
  }
}

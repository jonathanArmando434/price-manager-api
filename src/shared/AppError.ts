export class AppError {
  readonly message: string;

  constructor(m: string) {
    this.message = m;
  }
}

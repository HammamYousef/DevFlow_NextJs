export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;
  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formatMessage(fieldErrors);
    super(400, message, fieldErrors);
    this.name = "ValidationError";
    this.errors = fieldErrors;
  }

  static formatMessage(fieldErrors: Record<string, string[]>): string {
    return Object.entries(fieldErrors)
      .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
      .join("; ");
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string = "Resource not found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Access forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized access") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

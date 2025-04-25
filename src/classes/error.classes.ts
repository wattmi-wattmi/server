export class Api_Error extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: unknown[]
  ) {
    super(message);
  }
}

// Specific error types
export class Not_Found_Error extends Api_Error {
  constructor(entity: string) {
    super(404, `${entity} not found`);
  }
}

export class Unauthorized_Error extends Api_Error {
  constructor() {
    super(401, 'Unauthorized');
  }
}
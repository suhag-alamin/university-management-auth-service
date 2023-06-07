class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.statusCode = statusCode
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError

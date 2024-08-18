export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server fails, try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

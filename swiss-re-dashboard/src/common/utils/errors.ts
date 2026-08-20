export interface AppError {
  code: string
  message: string
  status?: number
  timestamp: string
  details?: Record<string, unknown>
}

export function parseApiError(error: unknown): AppError {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const err = error as { message: string; code?: string; status?: number }
    return {
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message,
      status: err.status || 500,
      timestamp: new Date().toISOString(),
    }
  }

  return {
    code: 'UNEXPECTED_ERROR',
    message: String(error || 'An unexpected error occurred'),
    status: 500,
    timestamp: new Date().toISOString(),
  }
}

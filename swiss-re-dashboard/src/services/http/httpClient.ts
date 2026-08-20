import { parseApiError, type AppError } from '../../common/utils/errors'

export interface RequestOptions extends RequestInit {
  byteRange?: {
    start: number
    end: number
  }
  params?: Record<string, string | number | boolean | undefined>
}

export interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
  contentRange?: string | null
}

export class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
  }

  public async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { byteRange, params, headers = {}, ...customConfig } = options

    const url = new URL(
      endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`,
      window.location.origin
    )

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val))
        }
      })
    }

    const requestHeaders = new Headers(headers)

    // Support HTTP Byte-Range requests for chunked 100MB-1GB document viewing
    if (byteRange) {
      requestHeaders.set('Range', `bytes=${byteRange.start}-${byteRange.end}`)
    }

    if (!requestHeaders.has('Content-Type') && !(customConfig.body instanceof FormData)) {
      requestHeaders.set('Content-Type', 'application/json')
    }

    try {
      const response = await fetch(url.toString(), {
        ...customConfig,
        headers: requestHeaders,
      })

      if (!response.ok && response.status !== 206) {
        let errorPayload: unknown
        try {
          errorPayload = await response.json()
        } catch {
          errorPayload = { message: response.statusText }
        }
        throw parseApiError({
          status: response.status,
          message: (errorPayload as { message?: string })?.message || response.statusText,
        })
      }

      let data: T
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = (await response.json()) as T
      } else if (response.status === 206 || contentType?.includes('octet-stream')) {
        data = (await response.arrayBuffer()) as unknown as T
      } else {
        data = (await response.text()) as unknown as T
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
        contentRange: response.headers.get('Content-Range'),
      }
    } catch (error) {
      if ((error as AppError).code) {
        throw error
      }
      throw parseApiError(error)
    }
  }

  public get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  public put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  public delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const httpClient = new HttpClient('/api')

export interface WorkerMessage<T = unknown> {
  id: string
  action: string
  payload: T
}

export interface WorkerResponse<T = unknown> {
  id: string
  action: string
  payload?: T
  error?: string
}

export class WorkerClient {
  private worker: Worker
  private pendingRequests: Map<
    string,
    {
      resolve: (value: unknown) => void
      reject: (reason?: unknown) => void
    }
  > = new Map()

  constructor(workerInstance: Worker) {
    this.worker = workerInstance
    this.worker.onmessage = this.handleMessage.bind(this)
    this.worker.onerror = this.handleError.bind(this)
  }

  private handleMessage(event: MessageEvent<WorkerResponse>) {
    const { id, payload, error } = event.data
    const resolver = this.pendingRequests.get(id)

    if (resolver) {
      if (error) {
        resolver.reject(new Error(error))
      } else {
        resolver.resolve(payload)
      }
      this.pendingRequests.delete(id)
    }
  }

  private handleError(error: ErrorEvent) {
    console.error('Worker runtime error:', error)
  }

  public postTask<TResponse = unknown, TPayload = unknown>(
    action: string,
    payload: TPayload,
    transferList?: Transferable[]
  ): Promise<TResponse> {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const message: WorkerMessage<TPayload> = { id, action, payload }

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, {
        resolve: resolve as (val: unknown) => void,
        reject,
      })

      if (transferList && transferList.length > 0) {
        this.worker.postMessage(message, transferList)
      } else {
        this.worker.postMessage(message)
      }
    })
  }

  public terminate() {
    this.worker.terminate()
    this.pendingRequests.clear()
  }
}

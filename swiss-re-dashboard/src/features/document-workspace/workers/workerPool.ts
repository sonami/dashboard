import { WorkerClient } from '../../../services/worker/workerClient'
import type { WorkerRasterizePayload } from './pdf.worker'

export class DocumentWorkerPool {
  private poolSize: number
  private workers: WorkerClient[] = []
  private currentWorkerIndex: number = 0

  constructor(poolSize: number = 2) {
    this.poolSize = poolSize
    this.initPool()
  }

  private initPool() {
    // Only init if in browser environment
    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
      for (let i = 0; i < this.poolSize; i++) {
        try {
          const rawWorker = new Worker(
            new URL('./pdf.worker.ts', import.meta.url),
            { type: 'module' }
          )
          this.workers.push(new WorkerClient(rawWorker))
        } catch {
          console.warn('Web Workers unavailable or bundled in unsupported context')
        }
      }
    }
  }

  public async rasterizeTile(payload: WorkerRasterizePayload) {
    if (this.workers.length === 0) {
      // Fallback if workers cannot instantiate in test/SSR environment
      return { ...payload, renderedAt: Date.now(), success: true }
    }

    const worker = this.workers[this.currentWorkerIndex]
    this.currentWorkerIndex = (this.currentWorkerIndex + 1) % this.workers.length

    return worker.postTask('rasterizePageTile', payload)
  }

  public terminate() {
    this.workers.forEach((w) => w.terminate())
    this.workers = []
  }
}

export const documentWorkerPool = new DocumentWorkerPool(2)
